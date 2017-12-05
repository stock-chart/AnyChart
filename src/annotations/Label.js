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
  var base = anychart.annotationsModule.Label.base(this, 'getNormalDescriptorsMeta');
  return goog.array.concat(base, anychart.annotationsModule.LABEL_DESCRIPTORS_STATE_META);
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


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.createPositionProviders = function() {
  var res = [];
  res.push(
      {
        'x': this.coords['xAnchor'],
        'y': this.coords['valueAnchor']
      },
      {
        'x': this.textBoundsCache_.left,
        'y': this.textBoundsCache_.top
      },
      {
        'x': this.textBoundsCache_.getRight(),
        'y': this.textBoundsCache_.top
      },
      {
        'x': this.textBoundsCache_.getRight(),
        'y': this.textBoundsCache_.getBottom()
      },
      {
        'x': this.textBoundsCache_.left,
        'y': this.textBoundsCache_.getBottom()
      }
  );
  return goog.array.map(res, function(item) {
    return {'value': item};
  });
};


//endregion
//region Dragging
/** @inheritDoc */
anychart.annotationsModule.Label.prototype.secureCurrentPosition = function() {
  anychart.annotationsModule.Label.base(this, 'secureCurrentPosition');
  this.securedBounds = this.textBoundsCache_.clone();
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.moveAnchor = function(anchorId, dx, dy) {
  if (anchorId < 1)
    return anychart.annotationsModule.Label.base(this, 'moveAnchor', anchorId, dx, dy);
  else {
    var right = this.securedBounds.width;
    var bottom = this.securedBounds.height;
    this.ownSettings['width'] = right + dx;
    this.ownSettings['height'] = bottom + dy;
  }
  this.invalidate(anychart.ConsistencyState.ANNOTATIONS_SHAPES | anychart.ConsistencyState.ANNOTATIONS_MARKERS);
  this.draw();
  return this;
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
    this.textElement_ = /** @type {acgraph.vector.Text} */(this.rootLayer.text());
    this.textElement_.zIndex(anychart.annotationsModule.Base.LABELS_ZINDEX);
  }
  if (!this.hoverRect_) {
    this.hoverRect_ = this.rootLayer.rect();
    this.hoverRect_
        .fill(anychart.color.TRANSPARENT_HANDLER)
        .zIndex(anychart.annotationsModule.Base.HOVER_SHAPE_ZINDEX);
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

  this.textBoundsCache_ = this.textElement_.getBounds();
  var hg = (/** @type {number} */(this.getOption('hoverGap')) || 0) / 2;
  this.textBoundsCache_.left -= hg;
  this.textBoundsCache_.top -= hg;
  this.textBoundsCache_.width += 2 * hg;
  this.textBoundsCache_.height += 2 * hg;
  anychart.utils.applyPixelShiftToRect(this.textBoundsCache_, 1);
  this.hoverRect_.setBounds(this.textBoundsCache_);
  this.invalidate(anychart.ConsistencyState.ANNOTATIONS_MARKERS);
};


/** @inheritDoc */
anychart.annotationsModule.Label.prototype.colorize = function(state) {
  anychart.annotationsModule.Label.base(this, 'colorize', state);
  this.textElement_.color(this.resolveOption('fontColor', state, null));
  this.textElement_.opacity(this.resolveOption('fontOpacity', state, null));
  var stroke = (state == anychart.PointState.SELECT) ?
      {
        color: 'black',
        thickness: 1
      } : 'none';
  this.hoverRect_.stroke(/** @type {acgraph.vector.SolidFill} */(stroke));
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
  goog.disposeAll(this.textElement_, this.hoverRect_);
  anychart.annotationsModule.Label.base(this, 'disposeInternal');
};
//endregion
