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
};
goog.inherits(anychart.annotationsModule.Label, anychart.annotationsModule.Base);
//anychart.core.settings.populateAliases(anychart.annotationsModule.Label, ['stroke', 'fill', 'hatchFill'], 'normal');
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
  return [];
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
  //
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.drawOnePointShape = function(x, y) {
  //
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
  anychart.annotationsModule.Label.base(this, 'disposeInternal');
};
//endregion
