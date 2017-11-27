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
  delete this.descriptorsMeta['fontFamily'];
  delete this.descriptorsMeta['fontStyle'];
  delete this.descriptorsMeta['fontVariant'];
  delete this.descriptorsMeta['fontWeight'];
  delete this.descriptorsMeta['fontSize'];
  delete this.descriptorsMeta['fontColor'];
  delete this.descriptorsMeta['fontOpacity'];
};
goog.inherits(anychart.annotationsModule.Label, anychart.annotationsModule.Base);
anychart.core.settings.populate(anychart.annotationsModule.Label, anychart.annotationsModule.X_ANCHOR_DESCRIPTORS);
anychart.core.settings.populate(anychart.annotationsModule.Label, anychart.annotationsModule.VALUE_ANCHOR_DESCRIPTORS);
anychart.core.settings.populate(anychart.annotationsModule.Label, anychart.annotationsModule.LABEL_DESCRIPTORS);
anychart.core.settings.populateAliases(anychart.annotationsModule.Label, ['fontFamily', 'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'fontColor', 'fontOpacity', 'fontDecoration'], 'normal');
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
  return anychart.annotationsModule.LABEL_DESCRIPTORS_STATE_META;
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.setState = function(state) {
  anychart.annotationsModule.Label.base(this, 'setState', state);
  this.invalidate(anychart.ConsistencyState.ANNOTATIONS_SHAPES);
};


//endregion
//region Infrastructure
/** @inheritDoc */
anychart.annotationsModule.Label.prototype.resolveOption = function(name, state, normalizer) {
  var stateObject = state == 0 ? this.normal() : state == 1 ? this.hovered() : this.selected();

  var normalValue = this.normal().getOption(name);
  var value = !state ? normalValue : stateObject.getOption(name);
  return value || normalValue;
};


//endregion
//region Drawing
//----------------------------------------------------------------------------------------------------------------------
//
//  Drawing
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} state
 */
anychart.annotationsModule.Label.prototype.applyTextSettings = function(state) {
  var text = this.getOption('text');
  var useHtml = this.getOption('useHtml');

  if (goog.isDef(text)) {
    if (useHtml) {
      this.textElement_.htmlText(text);
    } else {
      this.textElement_.text(text);
    }
  }

  this.textElement_.fontFamily(/** @type {string} */ (this.resolveOption('fontFamily', state, null)));
  this.textElement_.fontStyle(/** @type {string} */ (this.resolveOption('fontStyle', state, null)));
  this.textElement_.fontVariant(/** @type {string} */ (this.resolveOption('fontVariant', state, null)));
  this.textElement_.fontWeight(/** @type {number|string} */ (this.resolveOption('fontWeight', state, null)));
  this.textElement_.fontSize(/** @type {number|string} */ (this.resolveOption('fontSize', state, null)));
  this.textElement_.decoration(/** @type {string} */ (this.resolveOption('fontDecoration', state, null)));

  this.textElement_.direction(/** @type {string} */ (this.getOption('textDirection')));
  this.textElement_.wordBreak(/** @type {string} */ (this.getOption('wordBreak')));
  this.textElement_.wordWrap(/** @type {string} */ (this.getOption('wordWrap')));
  this.textElement_.letterSpacing(/** @type {number|string} */ (this.getOption('letterSpacing')));
  this.textElement_.lineHeight(/** @type {number|string} */ (this.getOption('lineHeight')));
  this.textElement_.textIndent(/** @type {number} */ (this.getOption('textIndent')));
  this.textElement_.vAlign(/** @type {string} */ (this.getOption('vAlign')));
  this.textElement_.hAlign(/** @type {string} */ (this.getOption('hAlign')));
  this.textElement_.textOverflow(/** @type {string} */ (this.getOption('textOverflow')));
  this.textElement_.selectable(/** @type {boolean} */ (this.getOption('selectable')));
  this.textElement_.disablePointerEvents(/** @type {boolean} */ (this.getOption('disablePointerEvents')));
  this.textElement_.width(/** @type {boolean} */ (this.getOption('width')));
  this.textElement_.height(/** @type {boolean} */ (this.getOption('height')));
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.ensureCreated = function() {
  anychart.annotationsModule.Label.base(this, 'ensureCreated');
  if (!this.textElement_) {
    this.textElement_ = acgraph.text();
    this.textElement_.parent(this.rootLayer);
    this.textElement_.zIndex(anychart.annotationsModule.Base.LABELS_ZINDEX);
  }
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.drawOnePointShape = function(x, y) {
  this.applyTextSettings(this.state);
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
  this.textElement_.color(this.resolveOption('fontColor', state, null));
  this.textElement_.opacity(this.resolveOption('fontOpacity', state, null));
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
  anychart.annotationsModule.Label.base(this, 'setupByJSON', config, opt_default);

  if (opt_default)
    anychart.core.settings.copy(this.themeSettings, anychart.annotationsModule.LABEL_DESCRIPTORS, config);
  else
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
