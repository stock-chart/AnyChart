goog.provide('anychart.chartEditor2Module.SettingsPanel');

goog.require('anychart.chartEditor2Module.ComponentWithKey');
goog.require('anychart.chartEditor2Module.checkbox.Base');
goog.require('anychart.ui.button.Base');



/**
 * @param {anychart.chartEditor2Module.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditor2Module.ComponentWithKey}
 */
anychart.chartEditor2Module.SettingsPanel = function(model, opt_domHelper) {
  anychart.chartEditor2Module.SettingsPanel.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {?string|undefined}
   * @protected
   */
  this.name = 'Settings Panel';


  /**
   * String id for excludes.
   * @type {string}
   * @protected
   */
  this.stringId = 'panel';


  /**
   * @type {boolean}
   * @protected
   */
  this.enabled = true;

  /**
   * @type {boolean}
   * @protected
   */
  this.enabledContent = true;

  /**
   * @type {boolean}
   */
  this.allowRemove_ = false;

  /**
   * @type {Array.<Element>}
   * @protected
   */
  this.labels = [];
};
goog.inherits(anychart.chartEditor2Module.SettingsPanel, anychart.chartEditor2Module.ComponentWithKey);


/**
 * @return {boolean} Whether the title settings is enabled.
 */
anychart.chartEditor2Module.SettingsPanel.prototype.isEnabled = function() {
  return this.enabled;
};


// /** @param {number} value */
// anychart.chartEditor2Module.SettingsPanel.prototype.setPlotIndex = function(value) {
//   this.plotIndex_ = value;
// };


/** @return {string} */
anychart.chartEditor2Module.SettingsPanel.prototype.getStringId = function() {
  return this.stringId;
};


/** @param {?string} value */
anychart.chartEditor2Module.SettingsPanel.prototype.setName = function(value) {
  this.name = value;
};


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditor2Module.SettingsPanel.prototype.allowEnabled_ = true;


/** @param {boolean} value */
anychart.chartEditor2Module.SettingsPanel.prototype.allowEnabled = function(value) {
  this.allowEnabled_ = value;
};


/** @param {boolean} value */
anychart.chartEditor2Module.SettingsPanel.prototype.allowRemove = function(value) {
  this.allowRemove_ = value;
};


/**
 * Container for enabled button.
 * @type {Element}
 * @private
 */
anychart.chartEditor2Module.SettingsPanel.prototype.enabledButtonContainer_ = null;


/**
 * Set container for enabled button.
 * @param {Element} enabledButtonContainer
 */
anychart.chartEditor2Module.SettingsPanel.prototype.setEnabledButtonContainer = function(enabledButtonContainer) {
  this.enabledButtonContainer_ = enabledButtonContainer;
};


/**
 * @return {?string|undefined}
 */
anychart.chartEditor2Module.SettingsPanel.prototype.getName = function() {
  return this.name;
};

/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.createDom = function() {
  anychart.chartEditor2Module.SettingsPanel.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());
  goog.dom.classlist.add(element, 'anychart-settings-panel');

  var dom = this.getDomHelper();
  this.topEl = dom.createDom(goog.dom.TagName.DIV, 'top');
  element.appendChild(this.topEl);

  if (this.name) {
    this.topEl.appendChild(dom.createDom(goog.dom.TagName.DIV, 'title', this.name));
  } else
    goog.dom.classlist.add(element, 'anychart-settings-panel-no-title');
  
  if (this.allowRemove_) {
    var removeBtn = dom.createDom(
        goog.dom.TagName.DIV,
        'anychart-settings-panel-remove-btn',
        goog.dom.createDom(goog.dom.TagName.IMG, {'src': 'https://cdn.anychart.com/images/chart_editor/remove-btn.png'})
    );
    goog.dom.appendChild(this.topEl, removeBtn);
    this.removeButton = removeBtn;
  }
  
  if (this.canBeEnabled()) {
    var enableContentCheckbox = new anychart.chartEditor2Module.checkbox.Base();

    if (this.enabledButtonContainer_) {
      enableContentCheckbox.render(this.enabledButtonContainer_);
      enableContentCheckbox.setParent(this);
    } else {
      this.addChild(enableContentCheckbox, true);
    }
    this.enableContentCheckbox = enableContentCheckbox;
    this.topEl.appendChild(this.enableContentCheckbox && !this.enabledButtonContainer_ ? this.enableContentCheckbox.getElement() : null);
  }

  var noTop = !this.name && !this.allowRemove_ && !(this.enableContentCheckbox && !this.enabledButtonContainer_);
  if (noTop)
    goog.dom.classlist.add(element, 'anychart-settings-panel-no-top');

  this.contentEl = dom.createDom(goog.dom.TagName.DIV, 'content');
  element.appendChild(this.contentEl);
};


/**
 * Returns the DOM element of tom bar.
 * @return {Element}
 */
anychart.chartEditor2Module.SettingsPanel.prototype.getTopElement = function() {
  return this.topEl;
};


/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.getContentElement = function() {
  return this.contentEl;
};


/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.enterDocument = function() {
  anychart.chartEditor2Module.SettingsPanel.base(this, 'enterDocument');

  if (this.isExcluded()) return;

  this.updateKeys();
  this.setEnabled(this.enabled);

  if (this.removeButton)
    goog.events.listen(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
};


/** @override */
anychart.chartEditor2Module.SettingsPanel.prototype.exitDocument = function() {
  if (this.removeButton)
    goog.events.unlisten(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
  anychart.chartEditor2Module.SettingsPanel.base(this, 'exitDocument');
};


/**
 * @param {Object} evt
 * @protected
 */
anychart.chartEditor2Module.SettingsPanel.prototype.onRemoveAction = function(evt) {
  this.dispatchEvent({
    type: anychart.chartEditor2Module.events.EventType.PANEL_CLOSE
  });
};


/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.update = function() {
  if (this.isExcluded()) return;
  anychart.chartEditor2Module.SettingsPanel.base(this, 'update');
};


/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.onChartDraw = function(evt) {
  if (this.isExcluded()) return;
  anychart.chartEditor2Module.SettingsPanel.base(this, 'onChartDraw', evt);

  if (evt.rebuild && this.enableContentCheckbox && this.canBeEnabled()) {
    this.enableContentCheckbox.setValueByTarget(evt.chart);
    this.setContentEnabled(this.enableContentCheckbox.isChecked());
  }
};


/**
 * Checks if this panel can be enabled/disabled.
 * If panel can be enabled, the this.key property of panel should contain '*.enable()' key.
 *
 * @return {boolean}
 */
anychart.chartEditor2Module.SettingsPanel.prototype.canBeEnabled = function() {
  return this.allowEnabled_ && Boolean(this.key.length);
};


/**
 * Enables/Disables the all group controls.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     all group controls.
 * @protected
 */
anychart.chartEditor2Module.SettingsPanel.prototype.setEnabled = function(enabled) {
  this.enabled = enabled;
  if (!this.canBeEnabled())
    this.enabledContent = this.enabled;

  if (this.isInDocument())
    this.setContentEnabled(this.enabledContent);

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(enabled);
};


/**
 * Enables/Disables the group content controls. Override this to disable labels etc.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     group content controls.
 * @protected
 */
anychart.chartEditor2Module.SettingsPanel.prototype.setContentEnabled = function(enabled) {
  this.enabledContent = this.enabled && enabled;

  // this should be to get child.setEnabled() working
  var tmp = this.enabled;
  this.enabled = true;
  for (var i = 0, count = this.getChildCount(); i < count; i++) {
    var child = this.getChildAt(i);
    if (goog.isFunction(child.setEnabled))
      child.setEnabled(this.enabledContent);
  }
  this.enabled = tmp;

  for (var j = 0; j < this.labels.length; j++) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.labels[j]),
        goog.getCssName('anychart-control-disabled'), !this.enabledContent);
  }

  if (this.topEl) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.topEl),
        goog.getCssName('anychart-control-disabled'), !this.enabled);
  }

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(this.enabled);

  // if (this.removeButton)
  //   this.removeButton.setEnabled(this.enabled);
};


/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.setKey = function(key) {
  anychart.chartEditor2Module.SettingsPanel.base(this, 'setKey', key);
  this.updateKeys();
};


/**
 * Update model keys.
 */
anychart.chartEditor2Module.SettingsPanel.prototype.updateKeys = function() {
  if (this.isExcluded()) return;

  var model = /** @type {anychart.chartEditor2Module.EditorModel} */(this.getModel());
  if (this.enableContentCheckbox)
    this.enableContentCheckbox.init(model, this.genKey('enabled()'));
};


/** @inheritDoc */
anychart.chartEditor2Module.SettingsPanel.prototype.exclude = function(value) {
  var oldValue = this.excluded;
  anychart.chartEditor2Module.SettingsPanel.base(this, 'exclude', value);
  if (oldValue != value) this.updateKeys();
};


/**
 * Registers label to disable and dispose
 * @param {?Element} labelElement
 */
anychart.chartEditor2Module.SettingsPanel.prototype.registerLabel = function(labelElement) {
  if (!labelElement) return;
  this.labels.push(labelElement);
};


/** @override */
anychart.chartEditor2Module.SettingsPanel.prototype.disposeInternal = function() {
  this.labels.length = 0;
  anychart.chartEditor2Module.SettingsPanel.base(this, 'disposeInternal');
};
