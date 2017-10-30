goog.provide('anychart.pieModule.defaultTheme');


goog.mixin(goog.global['anychart']['themes']['defaultTheme'], {
  'pie': {
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
      'outlineWidth': '10%',
      'outlineOffset': '5%',
      'explode': '10%'
    },
    'selected': {
      'explode': '3%'
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
