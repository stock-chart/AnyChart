goog.provide('anychart.chartEditor2Module.DataDialog');

goog.require('goog.ui.Dialog');


anychart.chartEditor2Module.DataDialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
  anychart.chartEditor2Module.DataDialog.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);
};
goog.inherits(anychart.chartEditor2Module.DataDialog, goog.ui.Dialog);


anychart.chartEditor2Module.DataDialog.prototype.update = function(dialogType, opt_dataType){
  this.type_ = dialogType;
  this.dataType_ = opt_dataType;

  var title;
  if (dialogType == 'file') {
    title = opt_dataType.toUpperCase() + ' file';
  } else if (dialogType == 'string') {
    title = opt_dataType.toUpperCase() + ' string';
  } else {
    title = 'Google Spreadsheet';
  }
  this.setTitle(title);

  var dom = this.getDomHelper();
  var contentEl = this.getContentElement();

  this.input_ = null;
  this.input2_ = null;
  while (contentEl.firstChild) {
    contentEl.removeChild(contentEl.firstChild);
  }

  var pholder = '';
  if (dialogType == 'file') {
    pholder = 'Enter URL to ' + opt_dataType.toUpperCase() + ' file';
    this.input_ = dom.createDom(goog.dom.TagName.INPUT, {class: 'input', placeholder: pholder});
    contentEl.appendChild(this.input_);

  } else if (dialogType == 'string') {
    pholder = 'Paste ' + opt_dataType.toUpperCase() + ' string';
    this.input_ = dom.createDom(goog.dom.TagName.TEXTAREA, {class: 'input', placeholder: pholder});
    contentEl.appendChild(this.input_);

  } else {
    pholder = 'ID or URL to spreadsheet';
    this.input_ = dom.createDom(goog.dom.TagName.INPUT, {class: 'input', placeholder: pholder});

    pholder = 'Sheet ID or index';
    this.input2_ = dom.createDom(goog.dom.TagName.INPUT, {class: 'input', placeholder: pholder});

    contentEl.appendChild(this.input_);
    contentEl.appendChild(this.input2_);
  }

  if (this.dataType_ == 'csv') {
    this.csvRSeparator_ = dom.createDom(goog.dom.TagName.INPUT, 'input');
    this.csvRSeparator_.value = '\\n';
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Rows Separator', this.csvRSeparator_]));

    this.csvCSeparator_ = dom.createDom(goog.dom.TagName.INPUT, 'input');
    this.csvCSeparator_.value = ',';
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Columns Separator', this.csvCSeparator_]));

    this.csvIgnoreFirstRow_ = dom.createDom(goog.dom.TagName.INPUT, {class: 'checkbox', type: 'checkbox'})
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Ignore First Row', this.csvIgnoreFirstRow_]));

    this.csvTrailingSpaces_ = dom.createDom(goog.dom.TagName.INPUT, {class: 'checkbox', type: 'checkbox'})
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Ignore Trailing Spaces', this.csvTrailingSpaces_]));

    contentEl.appendChild(this.dom_.createDom(goog.dom.TagName.DIV, 'cb'));
  }
};


anychart.chartEditor2Module.DataDialog.prototype.getType = function(){
  return this.type_;
};


anychart.chartEditor2Module.DataDialog.prototype.getInputValue = function(){
  return this.input_ && this.input_.value;
};


anychart.chartEditor2Module.DataDialog.prototype.getInput2Value = function(){
  return this.input2_ && this.input2_.value;
};


anychart.chartEditor2Module.DataDialog.prototype.getCSVSettings = function() {
  var rowsSeparator = this.processSpecialChars_(this.csvRSeparator_.value);
  var columnsSeparator = this.processSpecialChars_(this.csvCSeparator_.value);

  return {
    'rowsSeparator': rowsSeparator,
    'columnsSeparator': columnsSeparator,
    'ignoreFirstRow': !!this.csvIgnoreFirstRow_.checked,
    'ignoreTrailingSpaces': !!this.csvTrailingSpaces_.checked
  };
};


anychart.chartEditor2Module.DataDialog.prototype.processSpecialChars_ = function(string) {
  return string.replace(/\\(r|n|t)/g, function(part, g1) {
    switch (g1) {
      case 'r':
        return '\r';
      case 'n':
        return '\n';
      case 't':
        return '\t';
    }
    return part;
  });
};
