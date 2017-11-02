goog.provide('anychart.pieModule.defaultTheme');


goog.mixin(goog.global['anychart']['themes']['defaultTheme'], {
  'pie': {
    'interactivity': {
      'multiSelectOnClick': true,
      'unselectOnClickOutOfPoint': false
    },
    'animation': {
      'duration': 2000
    },
    'title': {
      'text': 'Pie Chart'
    },
    'group': false,
    'sort': 'none',
    'radius': '45%',
    'innerRadius': 0,
    'startAngle': 0,
    'outsideLabelsCriticalAngle': 60,
    'insideLabelsOffset': '50%',
    'normal': {
      'labels': {
        'format': anychart.core.defaultTheme.PERCENT_VALUE_TOKEN + '%'
      },
      'explode': 0
    },
    'hovered': {
      'explode': 0,
      'outlineWidth': 10,
      'outlineOffset': 0,
      'outlineFill': anychart.core.defaultTheme.returnLightenSourceColor50,
      'outlineStroke': 'none'
    },
    'selected': {
      'explode': '7%',
      'fill': anychart.core.defaultTheme.returnLightenSourceColor,
      'stroke': 'none',
      'outlineWidth': 10,
      'outlineOffset': 0,
      'outlineFill': anychart.core.defaultTheme.returnLightenSourceColor50,
      'outlineStroke': 'none'
    },
    'a11y': {
      'titleFormat': anychart.core.defaultTheme.pieA11yTitleFormatter
    }
  },
  // merge with pie
  'pie3d': {
    'mode3d': true,
    'explode': '5%',
    'connectorLength': '15%',
    //'legend': {
    'legendItem': {
      'iconStroke': null
    }
    //}
  }
});
