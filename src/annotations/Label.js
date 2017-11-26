goog.provide('anychart.annotationsModule.Label');
goog.require('anychart.annotationsModule');
goog.require('anychart.annotationsModule.Base');
goog.require('anychart.core.settings');
goog.require('anychart.enums');



/**
 * Label annotation.
 * @param {!anychart.annotationsModule.ChartController} chartController
 * @constructor
 * @extends {anychart.annotationsModule.Base}
 */
anychart.annotationsModule.Label = function(chartController) {
  anychart.annotationsModule.Label.base(this, 'constructor', chartController);

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, anychart.annotationsModule.X_ANCHOR_DESCRIPTORS_META);
  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, anychart.annotationsModule.VALUE_ANCHOR_DESCRIPTORS_META);
  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, anychart.annotationsModule.LABEL_DESCRIPTORS_META);

  anychart.core.settings.createTextPropertiesDescriptorsMeta(this.descriptorsMeta,
      anychart.ConsistencyState.ANNOTATIONS_SHAPES,
      anychart.ConsistencyState.APPEARANCE,
      anychart.Signal.NEEDS_REDRAW,
      anychart.Signal.NEEDS_REDRAW);
};
goog.inherits(anychart.annotationsModule.Label, anychart.annotationsModule.Base);
//anychart.core.settings.populateAliases(anychart.annotationsModule.Label, ['width', 'height'], 'normal');
anychart.core.settings.populate(anychart.annotationsModule.Label, anychart.annotationsModule.X_ANCHOR_DESCRIPTORS);
anychart.core.settings.populate(anychart.annotationsModule.Label, anychart.annotationsModule.VALUE_ANCHOR_DESCRIPTORS);
anychart.core.settings.populate(anychart.annotationsModule.Label, anychart.annotationsModule.LABEL_DESCRIPTORS);
anychart.annotationsModule.AnnotationTypes[anychart.enums.AnnotationTypes.LABEL] = anychart.annotationsModule.Label;


//region Properties
//----------------------------------------------------------------------------------------------------------------------
//
//  Properties
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.annotationsModule.Label.prototype.type = anychart.enums.AnnotationTypes.LABEL;


/**
 * Supported anchors.
 * @type {anychart.annotationsModule.AnchorSupport}
 */
anychart.annotationsModule.Label.prototype.SUPPORTED_ANCHORS = anychart.annotationsModule.AnchorSupport.ONE_POINT;


//endregion
//region State Settings
/** @inheritDoc */
anychart.annotationsModule.Label.prototype.getNormalDescriptorsMeta = function() {
  return [];//anychart.annotationsModule.LABEL_DESCRIPTORS_STATE_META;
};


//endregion
//region Drawing
//----------------------------------------------------------------------------------------------------------------------
//
//  Drawing
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.annotationsModule.Label.prototype.ensureCreated = function() {
  anychart.annotationsModule.Label.base(this, 'ensureCreated');
  if (!this.textElement_) {
    this.textElement_ = acgraph.text();
    this.textElement_.text('hello world');
    this.textElement_.color('black');
    this.textElement_.fontSize(30);
    this.textElement_.applyTextSettings();

    this.textElement_.parent(this.rootLayer);
    this.textElement_.zIndex(anychart.annotationsModule.Base.LABELS_ZINDEX);
  }
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.drawOnePointShape = function(x, y) {
  var anchor = /** @type {anychart.enums.Anchor} */(this.getOption('anchor'));
  var bounds = this.textElement_.getBounds();
  var position = {x: x, y: y};
  var diff = anychart.utils.getCoordinateByAnchor(anychart.math.rect(0, 0, bounds.width, bounds.height), anchor);
  position.x -= diff.x;
  position.y -= diff.y;

  anychart.utils.applyOffsetByAnchor(position, anchor,
      /** @type {number} */(this.getOption('offsetX') || 0),
      /** @type {number} */(this.getOption('offsetY') || 0));

  this.textElement_.x(position.x);
  this.textElement_.y(position.y);
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.colorize = function(state) {
  anychart.annotationsModule.Label.base(this, 'colorize', state);
};


//endregion
//region Serialization / Deserialization / Disposing
//----------------------------------------------------------------------------------------------------------------------
//
//  Serialization / Deserialization / Disposing
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.annotationsModule.Label.prototype.serialize = function() {
  var json = anychart.annotationsModule.Label.base(this, 'serialize');

  anychart.core.settings.serialize(this, anychart.annotationsModule.LABEL_DESCRIPTORS, json, 'Annotation');
  anychart.core.settings.serialize(this, anychart.annotationsModule.X_ANCHOR_DESCRIPTORS, json, 'Annotation');
  anychart.core.settings.serialize(this, anychart.annotationsModule.VALUE_ANCHOR_DESCRIPTORS, json, 'Annotation');

  return json;
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.setupByJSON = function(config, opt_default) {
  anychart.annotationsModule.Label.base(this, 'setupByJSON', config);

  anychart.core.settings.deserialize(this, anychart.annotationsModule.LABEL_DESCRIPTORS, config);
  anychart.core.settings.deserialize(this, anychart.annotationsModule.X_ANCHOR_DESCRIPTORS, config);
  anychart.core.settings.deserialize(this, anychart.annotationsModule.VALUE_ANCHOR_DESCRIPTORS, config);
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.disposeInternal = function() {
  goog.dispose(this.textElement_);
  anychart.annotationsModule.Label.base(this, 'disposeInternal');
};
//endregion
