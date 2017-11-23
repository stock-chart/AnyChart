goog.provide('anychart.stockModule.eventMarkers.Group');
goog.require('anychart.core.IShapeManagerUser');
goog.require('anychart.core.StateSettings');
goog.require('anychart.core.VisualBase');
goog.require('anychart.core.shapeManagers.PerPoint');
goog.require('anychart.enums');
goog.require('anychart.stockModule.eventMarkers.Table');



/**
 * Event markers group class.
 * @param {anychart.stockModule.Plot} plot
 * @constructor
 * @extends {anychart.core.VisualBase}
 * @implements {anychart.core.IShapeManagerUser}
 */
anychart.stockModule.eventMarkers.Group = function(plot) {
  anychart.stockModule.eventMarkers.Group.base(this, 'constructor');

  /**
   * Stock plot reference.
   * @type {anychart.stockModule.Plot}
   * @private
   */
  this.plot_ = plot;

  /**
   * Data table.
   * @type {anychart.stockModule.eventMarkers.Table}
   * @private
   */
  this.dataTable_ = new anychart.stockModule.eventMarkers.Table();

  /**
   * Shape manager instance.
   * @type {anychart.core.shapeManagers.PerPoint}
   * @private
   */
  this.shapeManager_ = new anychart.core.shapeManagers.PerPoint(this, [anychart.core.shapeManagers.pathFillStrokeConfig], false);

  var descriptorOverride = [anychart.core.settings.descriptors.EVENT_MARKER_TYPE];

  var normalDescriptorsMeta = {};
  anychart.core.settings.createDescriptorsMeta(normalDescriptorsMeta, [
    ['type',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['width',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['height',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['fill',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['stroke',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['format',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['connector',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW]
  ]);
  anychart.core.settings.createTextPropertiesDescriptorsMeta(
      normalDescriptorsMeta,
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW,
      anychart.Signal.NEEDS_REDRAW);
  this.normal_ = new anychart.core.StateSettings(this, normalDescriptorsMeta, anychart.PointState.NORMAL, descriptorOverride);
  this.normal_.setOption(anychart.core.StateSettings.CONNECTOR_AFTER_INIT_CALLBACK, anychart.core.StateSettings.DEFAULT_CONNECTOR_AFTER_INIT_CALLBACK);

  var descriptorsMeta = {};
  anychart.core.settings.createDescriptorsMeta(descriptorsMeta, [
    ['type', 0, 0],
    ['width', 0, 0],
    ['height', 0, 0],
    ['fill', 0, 0],
    ['stroke', 0, 0],
    ['format', 0, 0],
    ['connector', 0, 0]
  ]);
  this.hovered_ = new anychart.core.StateSettings(this, descriptorsMeta, anychart.PointState.HOVER, descriptorOverride);
  this.selected_ = new anychart.core.StateSettings(this, descriptorsMeta, anychart.PointState.SELECT, descriptorOverride);

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, [
    ['direction',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['position',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['seriesId',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW],
    ['fieldName',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW]
  ]);

  /**
   * Chain caches.
   * @type {Array.<Array>}
   * @private
   */
  this.partialChains_ = [];
};
goog.inherits(anychart.stockModule.eventMarkers.Group, anychart.core.VisualBase);
anychart.core.settings.populateAliases(anychart.core.series.Base, [
  'type',
  'width',
  'height',
  'fill',
  'stroke',
  'format',
  'connector'
], 'normal');


//region --- Descriptors
//------------------------------------------------------------------------------
//
//  Descriptors
//
//------------------------------------------------------------------------------
/**
 * Properties.
 * @type {!Object.<anychart.core.settings.PropertyDescriptor>}
 */
anychart.stockModule.eventMarkers.Group.DESCRIPTORS = (function() {
  var map = {};
  anychart.core.settings.createDescriptors(map, [
    anychart.core.settings.descriptors.DIRECTION,
    anychart.core.settings.descriptors.POSITION,
    anychart.core.settings.descriptors.SERIES_ID,
    anychart.core.settings.descriptors.FIELD_NAME
  ]);
  return map;
})();
anychart.core.settings.populate(anychart.stockModule.eventMarkers.Group, anychart.stockModule.eventMarkers.Group.DESCRIPTORS);


//endregion
//region --- Infrastructure
//------------------------------------------------------------------------------
//
//  Infrastructure
//
//------------------------------------------------------------------------------
/**
 * @type {number}
 */
anychart.stockModule.eventMarkers.Group.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.VisualBase.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.APPEARANCE |
    anychart.ConsistencyState.EVENT_MARKERS_DATA;


/**
 * @type {number}
 */
anychart.stockModule.eventMarkers.Group.prototype.SUPPORTED_SIGNALS =
    anychart.core.VisualBase.prototype.SUPPORTED_SIGNALS |
    anychart.Signal.NEEDS_REDRAW;


/**
 * Connector invalidation signal.
 * @param {anychart.SignalEvent} e
 * @private
 */
anychart.stockModule.eventMarkers.Group.prototype.connectorInvalidated_ = function(e) {
  this.invalidate(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.EVENT_MARKERS_DATA, anychart.Signal.NEEDS_REDRAW);
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.Group.prototype.getParentState = function(state) {
  var controller = /** @type {anychart.stockModule.eventMarkers.PlotController} */(this.plot_.eventMarkers());
  var result;
  if (!state) {
    result = controller.normal();
  } else if (state == 1) {
    result = controller.hovered();
  } else {
    result = controller.selected();
  }
  return /** @type {anychart.core.StateSettings} */(result);
};


//endregion
//region --- Methods
//------------------------------------------------------------------------------
//
//  Methods
//
//------------------------------------------------------------------------------
/**
 * @typedef {{
 *   data: Array.<(number|Date|{date:(number|Date)})>,
 *   dateTimePattern: (string|null|undefined),
 *   timeOffset: (number|null|undefined),
 *   baseDate: (number|Date|null|undefined),
 *   locale: (string|anychart.format.Locale|null|undefined)
 * }|Array.<(number|Date|{date:(number|Date)})>}
 */
anychart.stockModule.eventMarkers.Group.DataFormat;


/**
 * Gets and sets data for the series.
 * @param {anychart.stockModule.eventMarkers.Group.DataFormat=} opt_value
 * @return {anychart.stockModule.eventMarkers.Group|Array.<Object>}
 */
anychart.stockModule.eventMarkers.Group.prototype.data = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var dateTimePattern, timeOffset, baseDate, locale, data;
    if (goog.isObject(opt_value) && !goog.isArray(opt_value)) {
      dateTimePattern = opt_value['dateTimePattern'];
      timeOffset = opt_value['timeOffset'];
      baseDate = opt_value['baseDate'];
      locale = opt_value['locale'];
      data = opt_value['data'];
    } else {
      data = opt_value;
    }
    if (!goog.isArray(data))
      data = [];
    this.dataTable_.setData(data, dateTimePattern, timeOffset, baseDate, locale);
    this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA, anychart.Signal.NEEDS_REDRAW);
    return this;
  }
  return this.dataTable_.getData();
};


/**
 * Normal state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.Group}
 */
anychart.stockModule.eventMarkers.Group.prototype.normal = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.normal_.setup(opt_value);
    return this;
  }
  return this.normal_;
};


/**
 * Hovered state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.Group}
 */
anychart.stockModule.eventMarkers.Group.prototype.hovered = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.hovered_.setup(opt_value);
    return this;
  }
  return this.hovered_;
};


/**
 * Selected state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.Group}
 */
anychart.stockModule.eventMarkers.Group.prototype.selected = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.selected_.setup(opt_value);
    return this;
  }
  return this.selected_;
};


/**
 * Draws the group.
 * @return {anychart.stockModule.eventMarkers.Group}
 */
anychart.stockModule.eventMarkers.Group.prototype.draw = function() {
  if (!this.checkDrawingNeeded())
    return this;

  this.suspendSignalsDispatching();

  // resolving bounds
  if (this.hasInvalidationState(anychart.ConsistencyState.BOUNDS)) {
    this.pixelBoundsCache = /** @type {anychart.math.Rect} */(this.parentBounds());
    this.boundsWithoutAxes = this.axesLinesSpace_ ?
        this.axesLinesSpace_.tightenBounds(this.pixelBoundsCache) :
        this.pixelBoundsCache;
    this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA);
    this.markConsistent(anychart.ConsistencyState.BOUNDS);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.APPEARANCE)) {
    this.partialChains_.length = 0;
    this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA);
    this.markConsistent(anychart.ConsistencyState.APPEARANCE);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.EVENT_MARKERS_DATA)) {
    this.iterator_ = null;
    this.shapeManager_.clearShapes();
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    this.shapeManager_.setContainer(/** @type {acgraph.vector.Layer} */(this.container()));
    this.markConsistent(anychart.ConsistencyState.CONTAINER);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.EVENT_MARKERS_DATA)) {
    var offsets = {};
    var controller = /** @type {anychart.stockModule.eventMarkers.PlotController} */(this.plot_.eventMarkers());
    var iterator = this.getIterator();
    iterator.reset();
    while (iterator.advance()) {
      if (iterator.isFirstInGroup()) {
        offsets = controller.getEventMarkerOffsets(iterator.getIndex());
      }
      this.drawEventMarker_(offsets);
    }
    this.markConsistent(anychart.ConsistencyState.EVENT_MARKERS_DATA | anychart.ConsistencyState.Z_INDEX);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {

    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  this.resumeSignalsDispatching(false);

  return this;
};


/**
 * @param {Object.<number>} offsets
 * @param {string=} opt_onlyInPosition
 * @private
 */
anychart.stockModule.eventMarkers.Group.prototype.drawEventMarker_ = function(offsets, opt_onlyInPosition) {
  var xScale = /** @type {anychart.stockModule.scales.Scatter} */(this.plot_.getChart().xScale());
  var zIndex = /** @type {number} */(this.zIndex());
  var iterator = this.getIterator();
  var state = Number(iterator.meta('state')) || anychart.PointState.NORMAL;
  var type = /** @type {anychart.enums.EventMarkerType} */(this.resolveOption('type', state, iterator, anychart.enums.normalizeEventMarkerType, false));
  var drawer = this.SINGLE_MARKER_DRAWERS[type];
  if (drawer) {
    var position = /** @type {anychart.enums.EventMarkerPosition} */(this.resolveOption('position', 0, iterator, anychart.enums.normalizeEventMarkerPosition, false, undefined, true));
    var y = NaN;
    var direction = /** @type {anychart.enums.EventMarkerDirection} */(this.resolveOption('direction', state, iterator, anychart.enums.normalizeEventMarkerDirection, false, undefined, true));
    var seriesId = '';
    var fieldName = '';
    if (position != anychart.enums.EventMarkerPosition.AXIS) {
      seriesId = /** @type {string} */(this.resolveOption('seriesId', 0, iterator, anychart.core.settings.stringNormalizer, false, undefined, true));
      var series = this.plot_.getSeries(seriesId) || this.plot_.getSeriesAt(0);
      var point;
      if (series && (point = series.getSelectableData().getAtIndex(iterator.getIndex())) && !point.meta('missing')) {
        fieldName = /** @type {string} */(this.resolveOption('fieldName', 0, iterator, anychart.core.settings.stringNormalizer, false, undefined, true));
        var yValue = Number(point.get(fieldName));
        if (position == anychart.enums.EventMarkerPosition.SERIES_POSITIVE && yValue < 0 ||
            position == anychart.enums.EventMarkerPosition.SERIES_NEGATIVE && yValue > 0) {
          yValue = 0;
          y = Number(point.meta('zero'));
          if (isNaN(y)) {
            y = series.applyRatioToBounds(series.yScale().transform(0), false);
          }
        } else {
          y = Number(point.meta(fieldName));
          if (isNaN(y) && !isNaN(yValue)) {
            y = series.applyRatioToBounds(series.yScale().transform(yValue), false);
          }
        }
        if (direction == anychart.enums.EventMarkerDirection.AUTO) {
          direction = (yValue < 0 || !yValue && position == anychart.enums.EventMarkerPosition.SERIES_NEGATIVE) ?
              anychart.enums.EventMarkerDirection.DOWN :
              anychart.enums.EventMarkerDirection.UP;
        }
      }
    }
    if (isNaN(y)) {
      y = this.pixelBoundsCache.top + this.pixelBoundsCache.height;
      position = anychart.enums.EventMarkerPosition.AXIS;
      direction = anychart.enums.EventMarkerDirection.UP;
    }
    var directionIsUp = direction != anychart.enums.EventMarkerDirection.DOWN;
    var hash = this.getPositionHash_(position, seriesId, fieldName, directionIsUp);
    if (!opt_onlyInPosition || hash == opt_onlyInPosition) {
      var x = Math.round(xScale.transformInternal(iterator.getX(), iterator.getIndex(), 0.5) * this.pixelBoundsCache.width + this.pixelBoundsCache.left);
      var offset = offsets[hash] || 0;
      var connectorLen = 0;
      if (!offset) {
        connectorLen = anychart.utils.normalizeSize(/** @type {number|string} */(this.resolveOption('length', state, iterator, anychart.core.settings.numberOrPercentNormalizer, true)), this.pixelBoundsCache.width);
        offset += connectorLen;
      }
      y += directionIsUp ? -offset : offset;
      var tag = {
        'group': this,
        'groupIndex': iterator.getGroupIndex(),
        'subIndex': iterator.getSubIndex()
      };
      var connectorStroke = /** @type {acgraph.vector.Stroke} */(this.resolveOption('stroke', state, iterator, anychart.core.settings.strokeSimpleNormalizer, true));
      if (connectorLen && connectorStroke) {
        var connectorPath = this.plot_.eventMarkers().drawConnector(x, y, y - (directionIsUp ? -connectorLen : connectorLen), connectorStroke);
        connectorPath.tag = tag;
      }
      var path = /** @type {acgraph.vector.Path} */(this.shapeManager_.getShapesGroup(state, null, zIndex)['path']);
      path.tag = tag;
      var width = anychart.utils.normalizeSize(/** @type {number|string} */(this.resolveOption('width', state, iterator, anychart.core.settings.numberOrPercentNormalizer, false)), this.pixelBoundsCache.width);
      var height = anychart.utils.normalizeSize(/** @type {number|string} */(this.resolveOption('height', state, iterator, anychart.core.settings.numberOrPercentNormalizer, false)), this.pixelBoundsCache.height);
      drawer(path, x, y, width, height, directionIsUp);
      offsets[hash] = offset + height;
    }
  }
};


/**
 *
 * @param {anychart.enums.EventMarkerPosition} position
 * @param {string} seriesId
 * @param {string} fieldName
 * @param {boolean} directionIsUp
 * @return {string}
 * @private
 */
anychart.stockModule.eventMarkers.Group.prototype.getPositionHash_ = function(position, seriesId, fieldName, directionIsUp) {
  return position + (position == anychart.enums.EventMarkerPosition.AXIS ? '' : (seriesId + fieldName) + (directionIsUp ? 'U' : 'D'));
};


//endregion
//region --- IShapeManagerUser
//------------------------------------------------------------------------------
//
//  IShapeManagerUser
//
//------------------------------------------------------------------------------
/**
 * @return {boolean}
 */
anychart.stockModule.eventMarkers.Group.prototype.isDiscreteBased = function() {
  return true;
};


/**
 * @return {boolean}
 */
anychart.stockModule.eventMarkers.Group.prototype.supportsPointSettings = function() {
  return false;
};


/**
 * Returns color resolution context.
 * This context is used to resolve a fill or stroke set as a function for current point.
 * @param {(acgraph.vector.Fill|acgraph.vector.Stroke)=} opt_baseColor - .
 * @param {boolean=} opt_ignorePointSettings - Whether should take detached iterator.
 * @param {boolean=} opt_ignoreColorScale - Whether should use color scale.
 * @return {Object}
 */
anychart.stockModule.eventMarkers.Group.prototype.getColorResolutionContext = function(opt_baseColor, opt_ignorePointSettings, opt_ignoreColorScale) {
  var source = opt_baseColor || this.getOption('fill') || '#ccc';
  var iterator = this.getIterator();
  return {
    'index': iterator.getIndex(),
    'sourceColor': source,
    'iterator': iterator,
    'group': this,
    'chart': this.plot_.getChart(),
    'plot': this.plot_
  };
};


/**
 * @return {acgraph.vector.HatchFill}
 */
anychart.stockModule.eventMarkers.Group.prototype.getAutoHatchFill = function() {
  return null;
};


/**
 * @return {!anychart.data.IIterator}
 */
anychart.stockModule.eventMarkers.Group.prototype.getIterator = function() {
  if (!this.iterator_) {
    this.iterator_ = this.dataTable_.getIterator.apply(this.dataTable_, this.plot_.getChart().getEventMarkersIteratorParams());
  }
  return this.iterator_;
};


/**
 * Returns hatch fill resolution context.
 * This context is used to resolve a hatch fill set as a function for current point.
 * @param {boolean=} opt_ignorePointSettings - Whether should take detached iterator.
 * @return {Object}
 */
anychart.stockModule.eventMarkers.Group.prototype.getHatchFillResolutionContext = function(opt_ignorePointSettings) {
  return null;
};


/**
 * Returns partial resolution chain for passed state and priority.
 * @param {anychart.PointState|number} state
 * @param {*} normalPointOverride
 * @param {*} statePointOverride
 * @param {boolean} connector
 * @return {Array.<*>}
 */
anychart.stockModule.eventMarkers.Group.prototype.getResolutionChain = function(state, normalPointOverride, statePointOverride, connector) {
  state = Math.min(state, anychart.PointState.SELECT);
  var index = state * 2 + connector;
  var res = this.partialChains_[index];
  if (res) {
    // These magic numbers rely on the fact, that getPartialChain method of PlotController returns exactly 3 items
    if (state) {
      res[0] = statePointOverride;
      res[6] = normalPointOverride;
    } else {
      res[0] = normalPointOverride;
    }
  } else {
    var controller = /** @type {anychart.stockModule.eventMarkers.PlotController} */(this.plot_.eventMarkers());
    var normalLowChain = controller.getPartialChain(anychart.PointState.NORMAL, true, connector);
    var normalHighChain = controller.getPartialChain(anychart.PointState.NORMAL, false, connector);
    var normalInstance = connector ? this.normal_.connector() : this.normal_;
    if (state) {
      var stateLowChain = controller.getPartialChain(state, true, connector);
      var stateHighChain = controller.getPartialChain(state, false, connector);
      var stateSettings = state == anychart.PointState.HOVER ? this.hovered_ : this.selected_;
      stateSettings = connector ? stateSettings.connector() : stateSettings;
      res = goog.array.concat(
          [statePointOverride], // 0 index - state point override
          stateSettings.ownSettings, // 1
          stateHighChain, // 2, 3, 4, 5
          [normalPointOverride], // 6 - normal point override
          normalInstance.ownSettings,
          connector ? null : this.ownSettings,
          normalHighChain,
          stateSettings.themeSettings,
          stateLowChain,
          normalInstance.themeSettings,
          connector ? null : this.themeSettings,
          normalLowChain);
    } else {
      res = goog.array.concat(
          [normalPointOverride], // 0 index - state point override
          normalInstance.ownSettings,
          connector ? null : this.ownSettings,
          normalHighChain,
          normalInstance.themeSettings,
          connector ? null : this.themeSettings,
          normalLowChain);
    }
    this.partialChains_[index] = res;
  }
  return res;
};


/**
 * Returns proper settings due to the state if point settings are supported by the IShapeManagerUser.
 * Doesn't support opt_seriesName and opt_ignorePointSettings.
 * @param {string} name
 * @param {number} state
 * @param {anychart.data.IRowInfo} point
 * @param {Function} normalizer
 * @param {boolean} scrollerSelected - used as a connector option selector.
 * @param {string=} opt_seriesName - series option name if differs from point names.
 * @param {boolean=} opt_ignorePointSettings
 * @return {*}
 */
anychart.stockModule.eventMarkers.Group.prototype.resolveOption = function(name, state, point, normalizer, scrollerSelected, opt_seriesName, opt_ignorePointSettings) {
  var chain = this.getResolutionChain(state,
      opt_ignorePointSettings ? null : point.get('normal') || null,
      opt_ignorePointSettings ? null : (state ? (state == 1) ? point.get('hovered') : point.get('selected') : null) || null, scrollerSelected);
  for (var i = 0; i < chain.length; i++) {
    var obj = chain[i];
    if (goog.isObject(obj)) {
      var val = obj[name];
      if (goog.isDef(val)) {
        return normalizer(val);
      }
    }
  }
  return undefined;
};


//endregion
//region --- Shape drawers
//------------------------------------------------------------------------------
//
//  Shape drawers
//
//------------------------------------------------------------------------------
/**
 * Drawers for a single event marker.
 * @const {Object.<anychart.enums.EventMarkerType, function(acgraph.vector.Path,number,number,number,number,boolean)>}
 */
anychart.stockModule.eventMarkers.Group.prototype.SINGLE_MARKER_DRAWERS = (function() {
  var map = {};
  /**
   * CIRCLE shape drawer.
   * @param {acgraph.vector.Path} path
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {boolean} directionIsUp
   */
  map[anychart.enums.EventMarkerType.CIRCLE] = function(path, x, y, width, height, directionIsUp) {
    var ry = height / 2;
    path.circularArc(x, y + (directionIsUp ? -ry : ry), width / 2, ry, 0, 360);
  };
  /**
   * RECT shape drawer.
   * @param {acgraph.vector.Path} path
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {boolean} directionIsUp
   */
  map[anychart.enums.EventMarkerType.RECT] = function(path, x, y, width, height, directionIsUp) {
    if (directionIsUp)
      height = -height;
    drawPin(path, x, y, width, height, 0);
  };
  /**
   * PIN shape drawer.
   * @param {acgraph.vector.Path} path
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {boolean} directionIsUp
   */
  map[anychart.enums.EventMarkerType.PIN] = function(path, x, y, width, height, directionIsUp) {
    if (directionIsUp)
      height = -height;
    var dh = height / 4;
    drawPin(path, x, y, width, height, dh);
  };
  /**
   * FLAG shape drawer.
   * @param {acgraph.vector.Path} path
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {boolean} directionIsUp
   */
  map[anychart.enums.EventMarkerType.FLAG] = function(path, x, y, width, height, directionIsUp) {
    if (directionIsUp)
      height = -height;
    drawPin(path, x + width / 2, y, width, height, 0);
  };
  return map;

  function drawPin(path, x, y, width, height, dh) {
    var rx = width / 2;
    path.moveTo(x, y)
        .lineTo(
            x - rx, y + dh,
            x - rx, y + height,
            x + rx, y + height,
            x + rx, y + dh)
        .close();
  }
})();


/**
 * Returns text anchor due to shape properties.
 * @param {anychart.enums.EventMarkerType} type
 * @param {boolean} directionIsUp
 * @return {anychart.enums.Anchor}
 * @private
 */
anychart.stockModule.eventMarkers.Group.prototype.getTextAnchor_ = function(type, directionIsUp) {
  var anchor;
  if (type == anychart.enums.EventMarkerType.FLAG) {
    anchor = anychart.enums.Anchor.LEFT_CENTER;
  } else if (directionIsUp) {
    anchor = anychart.enums.Anchor.CENTER_BOTTOM;
  } else {
    anchor = anychart.enums.Anchor.CENTER_TOP;
  }
  return anchor;
};


/**
 * Returns text position provider due to shape properties.
 * @param {anychart.enums.EventMarkerType} type
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {boolean} directionIsUp
 * @return {Object}
 * @private
 */
anychart.stockModule.eventMarkers.Group.prototype.getTextPositionProvider_ = function(type, x, y, height, directionIsUp) {
  if (directionIsUp)
    height = -height;
  if (type == anychart.enums.EventMarkerType.FLAG) {
    y += height / 2;
  } else if (type == anychart.enums.EventMarkerType.PIN) {
    y += height / 4;
  }
  return {'value': {'x': x, 'y': y}};
};


//endregion
//region --- Ser/Deser/Disp
//------------------------------------------------------------------------------
//
//  Ser/Deser/Disp
//
//------------------------------------------------------------------------------
/** @inheritDoc */
anychart.stockModule.eventMarkers.Group.prototype.serialize = function() {
  var json = anychart.stockModule.eventMarkers.Group.base(this, 'serialize');

  anychart.core.settings.serialize(this, anychart.stockModule.eventMarkers.Group.DESCRIPTORS, json);
  json['normal'] = this.normal_.serialize();
  json['hovered'] = this.hovered_.serialize();
  json['selected'] = this.selected_.serialize();

  return json;
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.Group.prototype.setupSpecial = function(isDefault, var_args) {
  var arg0 = arguments[1];
  if (goog.isArray(arg0)) {
    this.data(arg0);
    return true;
  }
  return false;
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.Group.prototype.setupByJSON = function(config, opt_default) {
  anychart.stockModule.eventMarkers.Group.base(this, 'setupByJSON', config, opt_default);
  if (goog.isDef(config['data']))
    this.data(/** @type {anychart.stockModule.eventMarkers.Group.DataFormat} */(config));
  this.normal_.setupInternal(!!opt_default, config);
  this.normal_.setupInternal(!!opt_default, config['normal']);
  this.hovered_.setupInternal(!!opt_default, config['hovered']);
  this.selected_.setupInternal(!!opt_default, config['selected']);
  anychart.core.settings.deserialize(this, anychart.stockModule.eventMarkers.Group.DESCRIPTORS, config);
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.Group.prototype.disposeInternal = function() {
  goog.disposeAll(this.shapeManager_, this.normal_, this.hovered_, this.selected_);
  this.normal_ = this.hovered_ = this.selected_ = this.shapeManager_ = this.plot_ = null;
  anychart.stockModule.eventMarkers.Group.base(this, 'disposeInternal');
};


//endregion
//exports
(function() {
  var proto = anychart.stockModule.eventMarkers.Group.prototype;
  proto['data'] = proto.data;
})();
