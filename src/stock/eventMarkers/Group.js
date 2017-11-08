goog.provide('anychart.stockModule.eventMarkers.Group');
goog.require('anychart.core.IShapeManagerUser');
goog.require('anychart.core.StateSettings');
goog.require('anychart.core.VisualBase');
goog.require('anychart.core.shapeManagers.PerPoint');
goog.require('anychart.enums');



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
   * Shape manager instance.
   * @type {anychart.core.shapeManagers.PerPoint}
   * @private
   */
  this.shapeManager_ = new anychart.core.shapeManagers.PerPoint(this, [anychart.core.shapeManagers.pathFillStrokeConfig], true);

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
      anychart.ConsistencyState.APPEARANCE,
      anychart.Signal.NEEDS_REDRAW],
    ['stroke',
      anychart.ConsistencyState.APPEARANCE,
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
      anychart.ConsistencyState.APPEARANCE,
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
    ['fieldName',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW]
  ]);
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
    anychart.core.settings.descriptors.FIELD_NAME
  ]);
  return map;
});
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
    anychart.ConsistencyState.EVENT_MARKERS_DATA |
    anychart.ConsistencyState.EVENT_MARKERS_CLIP;


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
  var c = anychart.ConsistencyState.APPEARANCE;
  if (e.hasSignal(anychart.Signal.BOUNDS_CHANGED))
    c |= anychart.ConsistencyState.EVENT_MARKERS_DATA;
  this.invalidate(c, anychart.Signal.NEEDS_REDRAW);
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
 * Gets and sets data for the series.
 * @param {(anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string)=} opt_value
 * @param {Object.<({column: (number|string), type: anychart.enums.AggregationType, weights: (number|string)}|number|string)>=} opt_mappingSettings
 *   An object where keys are field names and values are objects with fields:
 *      - 'column': number - Column index, that the field should get values from;
 *      - 'type': anychart.enums.AggregationType - How to group values for the field. Defaults to 'close'.
 *      - 'weights': number - Column to get weights from for 'weightedAverage' grouping type. Note: If type set to
 *          'weightedAverage', but opt_weightsColumn is not passed - uses 'average' grouping instead.
 *   or numbers - just the column index to get values from. In this case the grouping type will be set to 'close'.
 * @param {Object=} opt_csvSettings CSV parser settings if the string is passed.
 * @return {anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string|anychart.stockModule.eventMarkers.Group}
 */
anychart.stockModule.eventMarkers.Group.prototype.data = function(opt_value, opt_mappingSettings, opt_csvSettings) {
  // if (goog.isDef(opt_value)) {
  //   var chart = this.getMainChart();
  //   chart.suspendSignalsDispatching();
  //   var data;
  //   // deregistering data source
  //   if (this.data_) {
  //     data = this.data_;
  //     // we need this zeroing to let the chart check if the data source is still relevant
  //     this.data_ = null;
  //     chart.deregisterSource(/** @type {!anychart.stockModule.data.TableSelectable} */(data));
  //   }
  //
  //   // disposing previously created data
  //   if (this.dataToDispose_) {
  //     goog.dispose(this.dataToDispose_);
  //     this.dataToDispose_ = null;
  //   }
  //
  //   // saving source value here
  //   this.dataSource_ = opt_value;
  //
  //   // creating data table if needed
  //   if (!(anychart.utils.instanceOf(opt_value, anychart.stockModule.data.Table)) && !(anychart.utils.instanceOf(opt_value, anychart.stockModule.data.TableMapping))) {
  //     data = new anychart.stockModule.data.Table();
  //     if (opt_value)
  //       data.addData(/** @type {!(Array.<Array.<*>>|string)} */(opt_value), false, opt_csvSettings);
  //     this.dataToDispose_ = opt_value = data;
  //   }
  //
  //   // creating data mapping if needed
  //   if (anychart.utils.instanceOf(opt_value, anychart.stockModule.data.Table)) {
  //     opt_value = opt_value.mapAs(opt_mappingSettings);
  //     if (!opt_mappingSettings) {
  //       opt_value.addField('value', 1, anychart.enums.AggregationType.AVERAGE);
  //       opt_value.addField('size', 2, anychart.enums.AggregationType.SUM);
  //       opt_value.addField('open', 1, anychart.enums.AggregationType.FIRST);
  //       opt_value.addField('high', 2, anychart.enums.AggregationType.MAX);
  //       opt_value.addField('low', 3, anychart.enums.AggregationType.MIN);
  //       opt_value.addField('close', 4, anychart.enums.AggregationType.LAST);
  //       opt_value.addField('volume', 5, anychart.enums.AggregationType.SUM);
  //     }
  //     if (!this.dataToDispose_)
  //       this.dataToDispose_ = opt_value;
  //   }
  //
  //   // applying passed value if it is suitable.
  //   if (anychart.utils.instanceOf(opt_value, anychart.stockModule.data.TableMapping)) {
  //     this.data_ = opt_value.createSelectable();
  //     this.registerDataSource();
  //   } else {
  //     this.dataSource_ = null;
  //   }
  //   chart.resumeSignalsDispatching(true);
  //   return this;
  // }
  // return this.dataSource_;
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
    this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_CLIP |
        anychart.ConsistencyState.EVENT_MARKERS_DATA |
        anychart.ConsistencyState.APPEARANCE);
  }

  acgraph.rect(
      this.pixelBoundsCache.left,
      this.pixelBoundsCache.top,
      this.pixelBoundsCache.width,
      this.pixelBoundsCache.height)
      .parent(this.container())
      .fill('red', 0.5)
      .stroke('blue', 5)
      .zIndex(this.zIndex());
  this.markConsistent(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.EVENT_MARKERS_DATA | anychart.ConsistencyState.EVENT_MARKERS_CLIP);

  //
  // if (this.hasInvalidationState(anychart.ConsistencyState.EVENT_MARKERS_DATA)) {
  //   var columns = this.retrieveDataColumns();
  //   var iterator;
  //   if (columns) {
  //     var yValueNames = this.getYValueNames();
  //     this.prepareMetaMakers(columns, yValueNames);
  //     if (labelsAreToBeRedrawn)
  //       this.additionalLabelsInitialize();
  //     this.startDrawing();
  //
  //     iterator = this.getResetIterator();
  //     // currently this section is actual only for Stock, because
  //     // Cartesian processes preFirst point as a regular point in iterator
  //     var point = this.getPreFirstPoint();
  //     if (point) {
  //       this.makePointMeta(point, yValueNames, columns);
  //       this.drawPoint(point, this.getPointState(point.getIndex()));
  //     }
  //
  //     // main points drawing cycle
  //     iterator.reset();
  //     while (iterator.advance()) {
  //       iterator.meta('destinationValue', NaN); //for animation-after-draw purposes.
  //       state = this.getPointState(iterator.getIndex());
  //       this.makePointMeta(iterator, yValueNames, columns);
  //       this.drawPoint(iterator, state);
  //       for (i = 0; i < elementsDrawersLength; i++)
  //         elementsDrawers[i].call(this, iterator, state, false);
  //     }
  //
  //     // currently this section is actual only for Stock, because
  //     // Cartesian processes preFirst point as a regular point in iterator
  //     point = this.getPostLastPoint();
  //     if (point) {
  //       this.makePointMeta(point, yValueNames, columns);
  //       this.drawPoint(point, this.getPointState(point.getIndex()));
  //     }
  //
  //     this.finalizeDrawing();
  //   } else {
  //     iterator = this.getResetIterator();
  //     while (iterator.advance()) {
  //       this.makeMissing(iterator, this.getYValueNames(), NaN);
  //     }
  //   }
  //   this.markConsistent(anychart.ConsistencyState.SERIES_COLOR | anychart.ConsistencyState.Z_INDEX);
  // }
  //
  // // if the series had only color settings changed, than we get here
  // if (this.hasInvalidationState(anychart.ConsistencyState.SERIES_COLOR)) {
  //   this.updateColors();
  //   this.markConsistent(anychart.ConsistencyState.SERIES_COLOR);
  // }
  //
  // if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
  //   this.applyZIndex();
  //   this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  // }
  //
  // if (this.hasInvalidationState(anychart.ConsistencyState.SERIES_CLIP)) {
  //   this.applyClip();
  //   this.markConsistent(anychart.ConsistencyState.SERIES_CLIP);
  // }

  this.markConsistent(anychart.ConsistencyState.BOUNDS);

  this.resumeSignalsDispatching(false);

  return this;
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
 * Returns proper settings due to the state if point settings are supported by the IShapeManagerUser.
 * @param {string} name
 * @param {number} state
 * @param {anychart.data.IRowInfo} point
 * @param {Function} normalizer
 * @param {boolean} scrollerSelected
 * @param {string=} opt_seriesName - series option name if differs from point names.
 * @param {boolean=} opt_ignorePointSettings
 * @return {*}
 */
anychart.stockModule.eventMarkers.Group.prototype.resolveOption = function(name, state, point, normalizer, scrollerSelected, opt_seriesName, opt_ignorePointSettings) {
  var val;
  var stateObject = state ? (state == 1 ? this.hovered_ : this.selected_) : this.normal_;
  if (opt_ignorePointSettings) {
    return normalizer(stateObject.getOption(name));
  }
  var pointStateName = state ? (state == 1 ? 'hovered' : 'selected') : 'normal';
  var pointStateObject = point.get(pointStateName);
  val = anychart.utils.getFirstDefinedValue(
      goog.isDef(pointStateObject) ? pointStateObject[name] : void 0,
      // point.get(anychart.color.getPrefixedColorName(state, name)),
      stateObject.getOption(name));
  if (goog.isDef(val)) {
    val = normalizer(val);
  } else {
    name = opt_seriesName || name;
    if (name in this.descriptorsMeta) {
      val = this.getOption(name);
      if (goog.isDef(val))
        return normalizer(val);
    }
    if (scrollerSelected)
      stateObject = this.selected_;
    val = stateObject.ownSettings[name];
    if (!goog.isDefAndNotNull(val)) {
      val = stateObject.themeSettings[name];
      // if (!goog.isDefAndNotNull(val) && !state)
      //   val = this.autoSettings[name];
      if (goog.isDef(val))
        val = normalizer(val);
    }
  }
  return val;
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
anychart.stockModule.eventMarkers.Group.prototype.setupByJSON = function(config, opt_default) {
  anychart.stockModule.eventMarkers.Group.base(this, 'setupByJSON', config, opt_default);

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
