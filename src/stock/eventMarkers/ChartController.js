goog.provide('anychart.stockModule.eventMarkers.ChartController');
goog.require('anychart.core.Base');
goog.require('anychart.core.StateSettings');
goog.require('anychart.stockModule.eventMarkers.Group');



/**
 * Chart event markers controller.
 * @param {anychart.stockModule.Chart} chart
 * @constructor
 * @extends {anychart.core.Base}
 */
anychart.stockModule.eventMarkers.ChartController = function(chart) {
  anychart.stockModule.eventMarkers.ChartController.base(this, 'constructor');

  /**
   * Chart reference.
   * @type {anychart.stockModule.Chart}
   * @private
   */
  this.chart_ = chart;

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
goog.inherits(anychart.stockModule.eventMarkers.ChartController, anychart.core.Base);
anychart.core.settings.populate(anychart.stockModule.eventMarkers.ChartController, anychart.stockModule.eventMarkers.Group.DESCRIPTORS);
anychart.core.settings.populateAliases(anychart.stockModule.eventMarkers.ChartController, [
  'type',
  'width',
  'height',
  'fill',
  'stroke',
  'format',
  'connector'
], 'normal');


//region --- Public methods
//------------------------------------------------------------------------------
//
//  Public methods
//
//------------------------------------------------------------------------------
/**
 * Normal state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.ChartController}
 */
anychart.stockModule.eventMarkers.ChartController.prototype.normal = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.normal_.setup(opt_value);
    return this;
  }
  return this.normal_;
};


/**
 * Hovered state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.ChartController}
 */
anychart.stockModule.eventMarkers.ChartController.prototype.hovered = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.hovered_.setup(opt_value);
    return this;
  }
  return this.hovered_;
};


/**
 * Selected state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.stockModule.eventMarkers.ChartController}
 */
anychart.stockModule.eventMarkers.ChartController.prototype.selected = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.selected_.setup(opt_value);
    return this;
  }
  return this.selected_;
};


/**
 * Getter/setter for groups.
 * @param {(Object|boolean|null|number)=} opt_indexOrValue Group settings to set or index of a group.
 * @param {(Object|boolean|null)=} opt_value Group settings to set.
 * @return {anychart.stockModule.eventMarkers.Group|anychart.stockModule.eventMarkers.ChartController}
 */
anychart.stockModule.eventMarkers.ChartController.prototype.group = function(opt_indexOrValue, opt_value) {
  var index,
      value;
  index = anychart.utils.toNumber(opt_indexOrValue);
  if (isNaN(index)) {
    index = 0;
    value = /** @type {Object|boolean|null} */(opt_indexOrValue);
  } else {
    index = /** @type {number} */(opt_indexOrValue);
    value = opt_value;
  }

  var res = this.chart_.plot().eventMarkers().group(index, value);
  if (goog.isDef(value)) {
    return this;
  }
  return /** @type {anychart.stockModule.eventMarkers.Group} */(res);
};


/**
 * Proxy to a group with index 0 of the chart.
 * @param {(anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string)=} opt_value
 * @return {anychart.stockModule.eventMarkers.ChartController|anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string}
 */
anychart.stockModule.eventMarkers.ChartController.prototype.data = function(opt_value) {
  var res = this.chart_.plot().eventMarkers().group().data(opt_value);
  if (goog.isDef(opt_value))
    return this;
  return /** @type {anychart.stockModule.data.TableMapping|anychart.stockModule.data.Table|Array.<Array.<*>>|string} */(res);
};


//endregion
//region --- Ser/Deser/Disp
//------------------------------------------------------------------------------
//
//  Ser/Deser/Disp
//
//------------------------------------------------------------------------------
/** @inheritDoc */
anychart.stockModule.eventMarkers.ChartController.prototype.serialize = function() {
  var json = anychart.stockModule.eventMarkers.ChartController.base(this, 'serialize');

  // Group is not a typo
  anychart.core.settings.serialize(this, anychart.stockModule.eventMarkers.Group.DESCRIPTORS, json);
  json['normal'] = this.normal_.serialize();
  json['hovered'] = this.hovered_.serialize();
  json['selected'] = this.selected_.serialize();

  return json;
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.ChartController.prototype.setupByJSON = function(config, opt_default) {
  anychart.stockModule.eventMarkers.ChartController.base(this, 'setupByJSON', config, opt_default);

  this.normal_.setupInternal(!!opt_default, config);
  this.normal_.setupInternal(!!opt_default, config['normal']);
  this.hovered_.setupInternal(!!opt_default, config['hovered']);
  this.selected_.setupInternal(!!opt_default, config['selected']);
  // Group is not a typo
  anychart.core.settings.deserialize(this, anychart.stockModule.eventMarkers.Group.DESCRIPTORS, config);
};


/** @inheritDoc */
anychart.stockModule.eventMarkers.ChartController.prototype.disposeInternal = function() {
  goog.disposeAll(this.normal_, this.hovered_, this.selected_);
  this.normal_ = this.hovered_ = this.selected_ = this.chart_ = null;
  anychart.stockModule.eventMarkers.ChartController.base(this, 'disposeInternal');
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
