goog.provide('anychart.standalones.axes.Radial');
goog.require('anychart.core.axes.Radial');



/**
 * @constructor
 * @extends {anychart.core.axes.Radial}
 */
anychart.standalones.axes.Radial = function() {
  anychart.standalones.axes.Radial.base(this, 'constructor');
};
goog.inherits(anychart.standalones.axes.Radial, anychart.core.axes.Radial);
anychart.core.makeStandalone(anychart.standalones.axes.Radial, anychart.core.axes.Radial);


/** @inheritDoc */
anychart.standalones.axes.Radial.prototype.setupByJSON = function(config, opt_default) {
  anychart.standalones.axes.Radial.base(this, 'setupByJSON', config, opt_default);
  this.startAngle(config['startAngle']);
  this.innerRadius(config['innerRadius']);
};


/** @inheritDoc */
anychart.standalones.axes.Radial.prototype.serialize = function() {
  var json = anychart.standalones.axes.Radial.base(this, 'serialize');
  json['startAngle'] = this.startAngle();
  json['innerRadius'] = this.innerRadius();
  return json;
};


/**
 * Returns axis instance.<br/>
 * <b>Note:</b> Any axis must be bound to a scale.
 * @return {!anychart.standalones.axes.Radial}
 */
anychart.standalones.axes.radial = function() {
  var axis = new anychart.standalones.axes.Radial();
  axis.setup(anychart.getFullTheme('standalones.radialAxis'));
  return axis;
};


//exports
(function() {
  var proto = anychart.standalones.axes.Radial.prototype;
  goog.exportSymbol('anychart.standalones.axes.radial', anychart.standalones.axes.radial);
  proto['draw'] = proto.draw;
  proto['parentBounds'] = proto.parentBounds;
  proto['container'] = proto.container;
  proto['startAngle'] = proto.startAngle;
  proto['innerRadius'] = proto.innerRadius;
})();
