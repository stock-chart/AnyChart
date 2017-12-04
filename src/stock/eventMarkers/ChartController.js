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

  this.normal_ = new anychart.core.StateSettings(this,
      anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_META_NORMAL,
      anychart.PointState.NORMAL,
      anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_OVERRIDE);
  this.normal_.setOption(anychart.core.StateSettings.CONNECTOR_AFTER_INIT_CALLBACK, anychart.core.StateSettings.DEFAULT_CONNECTOR_AFTER_INIT_CALLBACK);

  this.hovered_ = new anychart.core.StateSettings(this,
      anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_META_STATE,
      anychart.PointState.NORMAL,
      anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_OVERRIDE);
  this.selected_ = new anychart.core.StateSettings(this,
      anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_META_STATE,
      anychart.PointState.NORMAL,
      anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_OVERRIDE);

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, anychart.stockModule.eventMarkers.Group.OWN_DESCRIPTORS_META);

  chart.listen(anychart.enums.EventType.EVENT_MARKER_MOUSE_OVER, this.handleMouseOverAndMove_, false, this);
  chart.listen(anychart.enums.EventType.EVENT_MARKER_MOUSE_MOVE, this.handleMouseOverAndMove_, false, this);
  chart.listen(anychart.enums.EventType.EVENT_MARKER_MOUSE_OUT, this.handleMouseOut_, false, this);
  chart.listen(anychart.enums.EventType.EVENT_MARKER_CLICK, this.handleMouseClick_, false, this);
};
goog.inherits(anychart.stockModule.eventMarkers.ChartController, anychart.core.Base);
anychart.core.settings.populate(anychart.stockModule.eventMarkers.ChartController, anychart.stockModule.eventMarkers.Group.OWN_DESCRIPTORS);
anychart.core.settings.populateAliases(anychart.stockModule.eventMarkers.ChartController, anychart.stockModule.eventMarkers.Group.STATE_DESCRIPTORS_NAMES, 'normal');


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
 * @return {anychart.stockModule.eventMarkers.Group}
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
//region --- Interactivity
//------------------------------------------------------------------------------
//
//  Interactivity
//
//------------------------------------------------------------------------------
/**
 * Event handler for mouseOver and mouseMove.
 * @param {goog.events.Event} e
 * @private
 */
anychart.stockModule.eventMarkers.ChartController.prototype.handleMouseOverAndMove_ = function(e) {
  var group = e['group'];
  if (group) {
    var index = e['index'];
    if (this.currentHoverGroup_ != group || this.currentHoverIndex_ != index) {
      if (this.currentHoverGroup_) {
        this.currentHoverGroup_.plot.eventMarkers().applyState(this.currentHoverGroup_, this.currentHoverIndex_, anychart.PointState.NORMAL, anychart.PointState.HOVER);
      }
      if (group.plot.eventMarkers().applyState(group, index, anychart.PointState.HOVER, anychart.PointState.NORMAL)) {
        this.currentHoverGroup_ = group;
        this.currentHoverIndex_ = index;
      } else {
        this.currentHoverGroup_ = null;
        this.currentHoverIndex_ = NaN;
      }
    }
  }
};


/**
 * Event handler for mouseOut.
 * @param {goog.events.Event} e
 * @private
 */
anychart.stockModule.eventMarkers.ChartController.prototype.handleMouseOut_ = function(e) {
  var group = e['group'];
  if (group) {
    var index = e['index'];
    if (group.plot.eventMarkers().applyState(group, index, anychart.PointState.NORMAL, anychart.PointState.HOVER)) {
      this.currentHoverGroup_ = null;
      this.currentHoverIndex_ = NaN;
    }
  }
};


/**
 * Event handler for mouseOut.
 * @param {goog.events.Event} e
 * @private
 */
anychart.stockModule.eventMarkers.ChartController.prototype.handleMouseClick_ = function(e) {
  var group = e['group'];
  if (group) {
    var index = e['index'];
    var sameMarker = this.currentSelectGroup_ == group && this.currentSelectIndex_ == index;
    // var evt = (/** @type {anychart.core.MouseEvent} */(e['originalEvent']));
    if (this.currentSelectGroup_) {
      this.currentSelectGroup_.plot.eventMarkers().applyState(this.currentSelectGroup_, this.currentSelectIndex_, sameMarker ? anychart.PointState.HOVER : anychart.PointState.NORMAL, anychart.PointState.SELECT);
    }
    if (!sameMarker && group.plot.eventMarkers().applyState(group, index, anychart.PointState.SELECT, anychart.PointState.HOVER)) {
      this.currentSelectGroup_ = group;
      this.currentSelectIndex_ = index;
    } else {
      this.currentSelectGroup_ = null;
      this.currentSelectIndex_ = NaN;
    }
  }
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
  anychart.core.settings.serialize(this, anychart.stockModule.eventMarkers.Group.OWN_DESCRIPTORS, json);
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
  anychart.core.settings.deserialize(this, anychart.stockModule.eventMarkers.Group.OWN_DESCRIPTORS, config);

  var groups = config['groups'];
  if (goog.isDef(groups)) {
    this.chart_.plot().eventMarkers().disposeGroups();
    if (goog.isArray(groups)) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        if (goog.isDefAndNotNull(group)) {
          this.group(i, group);
        }
      }
    }
  }
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
  var proto = anychart.stockModule.eventMarkers.ChartController.prototype;
  proto['group'] = proto.group;
  proto['data'] = proto.data;
  proto['normal'] = proto.normal;
  proto['hovered'] = proto.hovered;
  proto['selected'] = proto.selected;
})();
