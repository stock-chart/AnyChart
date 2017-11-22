goog.provide('anychart.stockModule.eventMarkers.PlotController');
goog.require('anychart.core.StateSettings');
goog.require('anychart.core.VisualBase');
goog.require('anychart.stockModule.eventMarkers.Group');



/**
 * Plot-level event markers controller.
 * @param {anychart.stockModule.Plot} plot
 * @param {anychart.stockModule.eventMarkers.ChartController} chartController 
 * @constructor
 * @extends {anychart.core.VisualBase}
 */
anychart.stockModule.eventMarkers.PlotController = function(plot, chartController) {
  anychart.stockModule.eventMarkers.PlotController.base(this, 'constructor');
  
  chartController.listenSignals(this.onSignal_, this);

  /**
   * Plot reference.
   * @type {anychart.stockModule.Plot}
   * @private
   */
  this.plot_ = plot;

  /**
   * Groups list.
   * @type {!Array.<anychart.stockModule.eventMarkers.Group>}
   * @private
   */
  this.groups_ = [];

  /**
   * Event marker offsets hash map.
   * @type {Object.<Object>}
   * @private
   */
  this.eventMarkerOffsets_ = {};

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
    ['fieldName',
      anychart.ConsistencyState.EVENT_MARKERS_DATA,
      anychart.Signal.NEEDS_REDRAW]
  ]);

  /**
   * Partial resolution chains cache.
   * @type {!Array.<Array>}
   * @private
   */
  this.partialChains_ = [];
};
goog.inherits(anychart.stockModule.eventMarkers.PlotController, anychart.core.VisualBase);
anychart.core.settings.populate(anychart.stockModule.eventMarkers.PlotController, anychart.stockModule.eventMarkers.Group.DESCRIPTORS);
anychart.core.settings.populateAliases(anychart.stockModule.eventMarkers.PlotController, [
  'type',
  'width',
  'height',
  'fill',
  'stroke',
  'format',
  'connector'
], 'normal');


/**
 * Supported consistency states
 * @type {number}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.VisualBase.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.EVENT_MARKERS_DATA;


/**
 * Z index multiplier for default group zIndex.
 * @const {number}
 */
anychart.stockModule.eventMarkers.PlotController.Z_INDEX_MULTIPLIER = 0.001;


/**
 * Normal state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.PlotController}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.normal = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.normal_.setup(opt_value);
    return this;
  }
  return this.normal_;
};


/**
 * Hovered state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.PlotController}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.hovered = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.hovered_.setup(opt_value);
    return this;
  }
  return this.hovered_;
};


/**
 * Selected state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.PlotController}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.selected = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.selected_.setup(opt_value);
    return this;
  }
  return this.selected_;
};


/**
 * Returns partial resolution chain for passed state and priority.
 * Always returns 2 elements.
 * @param {anychart.PointState|number} state
 * @param {boolean} low
 * @param {boolean=} opt_forConnector
 * @return {Array.<Object>}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.getPartialChain = function(state, low, opt_forConnector) {
  var index = Math.min(state, anychart.PointState.SELECT) * 4 + low * 2 + !opt_forConnector;
  var res = this.partialChains_[index];
  if (!res) {
    var controller = /** @type {anychart.stockModule.eventMarkers.ChartController} */(this.plot_.getChart().eventMarkers());
    var plotState, chartState;
    if (!state) {
      plotState = this.normal_;
      chartState = /** @type {anychart.core.StateSettings} */(controller.normal());
    } else if (state == 1) {
      plotState = this.hovered_;
      chartState = /** @type {anychart.core.StateSettings} */(controller.hovered());
    } else {
      plotState = this.selected_;
      chartState = /** @type {anychart.core.StateSettings} */(controller.selected());
    }
    if (opt_forConnector) {
      plotState = plotState.connector();
      chartState = chartState.connector();
    }
    if (low) {
      res = [(state || opt_forConnector) ? null : this.themeSettings, plotState.themeSettings, chartState.themeSettings];
    } else {
      res = [(state || opt_forConnector) ? null : this.ownSettings, plotState.ownSettings, chartState.ownSettings];
    }
    this.partialChains_[index] = res;
  }
  return res;
};



/**
 * Returns an event markers offsets object for given index.
 * @param index
 * @return {Object.<number>}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.getEventMarkerOffsets = function(index) {
  var res = this.eventMarkerOffsets_[index];
  if (!res) {
    res = this.eventMarkerOffsets_[index] = {};
  }
  return res;
};


/**
 * Getter/setter for groups.
 * @param {(Object|boolean|null|number)=} opt_indexOrValue Group settings to set or index of a group.
 * @param {(Object|boolean|null)=} opt_value Group settings to set.
 * @return {!(anychart.stockModule.eventMarkers.Group|anychart.stockModule.eventMarkers.PlotController)} Axis instance by index or itself for method chaining.
 */
anychart.stockModule.eventMarkers.PlotController.prototype.group = function(opt_indexOrValue, opt_value) {
  var index,
      value;
  index = anychart.utils.toNumber(opt_indexOrValue);
  if (isNaN(index)) {
    index = 0;
    value = opt_indexOrValue;
  } else {
    index = /** @type {number} */(opt_indexOrValue);
    value = opt_value;
  }
  var group = this.groups_[index];
  if (!group) {
    group = new anychart.stockModule.eventMarkers.Group(this.plot_);
    group.setAutoZIndex(/** @type {number} */(this.zIndex()) + this.groups_.length * anychart.stockModule.eventMarkers.PlotController.Z_INDEX_MULTIPLIER);
    this.groups_[index] = group;
    group.listenSignals(this.onSignal_, this);
    this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA, anychart.Signal.NEEDS_REDRAW);
  }

  if (goog.isDef(value)) {
    group.setup(value);
    return this;
  } else {
    return group;
  }
};


/**
 * Proxy to a group with index 0 of the plot.
 * @param {(anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string)=} opt_value
 * @return {anychart.stockModule.eventMarkers.PlotController|anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.data = function(opt_value) {
  var res = this.group().data(opt_value);
  if (goog.isDef(opt_value))
    return this;
  return /** @type {anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string} */(res);
};


/**
 * Draws all groups.
 * @return {anychart.stockModule.eventMarkers.PlotController}
 */
anychart.stockModule.eventMarkers.PlotController.prototype.draw = function() {
  if (!this.checkDrawingNeeded())
    return this;

  if (!this.rootLayer_) {
    this.rootLayer_ = acgraph.layer();
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.BOUNDS)) {
    this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA);
    this.markConsistent(anychart.ConsistencyState.BOUNDS);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.EVENT_MARKERS_DATA)) {
    this.partialChains_.length = 0;
    this.eventMarkerOffsets_ = {};
    var bounds = /** @type {anychart.math.Rect} */(this.parentBounds());
    for (var i = 0; i < this.groups_.length; i++) {
      var group = this.groups_[i];
      group.suspendSignalsDispatching();
      group.parentBounds(bounds);
      group.container(this.rootLayer_);
      group.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA);
      group.draw();
      group.resumeSignalsDispatching(false);
    }
    this.markConsistent(anychart.ConsistencyState.EVENT_MARKERS_DATA);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    this.rootLayer_.parent(this.container());
    this.markConsistent(anychart.ConsistencyState.CONTAINER);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
    this.rootLayer_.zIndex(this.zIndex());
    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  return this;
};


/**
 * Group signals handler.
 * @param {anychart.SignalEvent} event
 * @private
 */
anychart.stockModule.eventMarkers.PlotController.prototype.onSignal_ = function(event) {
  this.invalidate(anychart.ConsistencyState.EVENT_MARKERS_DATA, anychart.Signal.NEEDS_REDRAW);
};


//region --- Ser/Deser/Disp
//------------------------------------------------------------------------------
//
//  Ser/Deser/Disp
//
//------------------------------------------------------------------------------
/** @inheritDoc */
anychart.stockModule.eventMarkers.PlotController.prototype.serialize = function() {
  var json = anychart.stockModule.eventMarkers.PlotController.base(this, 'serialize');

  // Group is not a typo
  anychart.core.settings.serialize(this, anychart.stockModule.eventMarkers.Group.DESCRIPTORS, json);
  json['normal'] = this.normal_.serialize();
  json['hovered'] = this.hovered_.serialize();
  json['selected'] = this.selected_.serialize();

  return json;
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.PlotController.prototype.setupByJSON = function(config, opt_default) {
  anychart.stockModule.eventMarkers.PlotController.base(this, 'setupByJSON', config, opt_default);

  this.normal_.setupInternal(!!opt_default, config);
  this.normal_.setupInternal(!!opt_default, config['normal']);
  this.hovered_.setupInternal(!!opt_default, config['hovered']);
  this.selected_.setupInternal(!!opt_default, config['selected']);
  // Group is not a typo
  anychart.core.settings.deserialize(this, anychart.stockModule.eventMarkers.Group.DESCRIPTORS, config);
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.PlotController.prototype.disposeInternal = function() {
  goog.disposeAll(this.groups_, this.rootLayer_, this.normal_, this.hovered_, this.selected_);
  delete this.groups_;
  this.normal_ = this.hovered_ = this.selected_ = this.rootLayer_ = this.plot_ = null;
  anychart.stockModule.eventMarkers.PlotController.base(this, 'disposeInternal');
};


//endregion
//exports
(function() {
  var proto = anychart.stockModule.eventMarkers.PlotController.prototype;
  proto['group'] = proto.group;
  proto['data'] = proto.data;
  proto['normal'] = proto.normal;
  proto['hovered'] = proto.hovered;
  proto['selected'] = proto.selected;
})();

