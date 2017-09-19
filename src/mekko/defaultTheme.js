goog.provide('anychart.mekkoModule.defaultTheme');


goog.mixin(goog.global['anychart']['themes']['defaultTheme'], {
  // merge with chart
  'mekko': {
    'defaultSeriesType': 'mekko',
    'isVertical': false,
    'labels': {
      'enabled': true
    },
    'defaultSeriesSettings': {
      'base': {
        'fill': anychart.core.defaultTheme.returnSourceColor85,
        'hoverFill': anychart.core.defaultTheme.returnSourceColor65,
        'legendItem': {
          'iconStroke': 'none'
        },
        'isVertical': false,
        'labels': {
          'format': anychart.core.defaultTheme.VALUE_TOKEN_DECIMALS_COUNT_2,
          'position': 'center',
          'offsetY': 0,
          'fontColor': anychart.core.defaultTheme.fontColorReversedNormal
        },
        'markers': {
          'position': 'center',
          'anchor': 'center'
        },
        'tooltip': {
          'anchor': 'left-top'
        },
        'stroke': anychart.core.defaultTheme.returnStrokeSourceColor1,
        'hoverStroke': anychart.core.defaultTheme.returnLightenStrokeSourceColor1
      },
      'mekko': {}
    },
    'defaultXAxisSettings': {
      'orientation': 'bottom',
      'title': {
        'text': 'X-Axis',
        'padding': {
          'top': 5,
          'right': 0,
          'bottom': 0,
          'left': 0
        }
      },
      'labels': {
        'format': anychart.core.defaultTheme.VALUE_TOKEN_DECIMALS_COUNT_10
      },
      'scale': 0
    },
    'defaultYAxisSettings': {
      'orientation': 'left',
      'title': {
        'text': 'Y-Axis',
        'padding': {
          'top': 0,
          'right': 0,
          'bottom': 5,
          'left': 0
        }
      },
      'labels': {
        'format': anychart.core.defaultTheme.VALUE_TOKEN_DECIMALS_COUNT_10 + '%'
      },
      'scale': 1
    },
    'xAxes': [{}],
    'yAxes': [{}],
    'scales': [
      {
        'type': 'ordinal'
      },
      {
        'type': 'linear',
        'stackMode': 'percent',
        'stackDirection': 'direct',
        'minimumGap': 0,
        'maximumGap': 0
      },
      {
        'type': 'ordinal'
      },
      {
        'type': 'ordinal'
      }
    ],
    'crosshair': {
      'enabled': false,
      'displayMode': 'float',
      'xStroke': anychart.core.defaultTheme.colorStrokeExtraBright,
      'yStroke': anychart.core.defaultTheme.colorStrokeExtraBright,
      'zIndex': 41
    },
    'xScale': 0,
    'yScale': 1,
    'firstCategoriesScale': 2,
    'lastCategoriesScale': 3,
    'defaultAnnotationSettings': {},
    'annotations': {
      'annotationsList': [],
      'zIndex': 2000
    },
    'pointsPadding': 0,
    'maxPointWidth': '100%'
  },
  // merge with mekko
  'mosaic': {
    'pointsPadding': 5,
    'defaultXAxisSettings': {
      'stroke': 0,
      'ticks': {'enabled': false}
    },
    'defaultYAxisSettings': {
      'stroke': 0,
      'ticks': {'enabled': false},
      'labels': {
        'format': '{%Value}'
      }
    }
  },
  // merge with mekko
  'barmekko': {
    'scales': [
      {
        'type': 'ordinal'
      },
      {
        'type': 'linear',
        'stackMode': 'value',
        'softMinimum': 0
      },
      {
        'type': 'ordinal'
      },
      {
        'type': 'ordinal'
      }
    ],
    'defaultSeriesSettings': {
      'mekko': {
        /**
         * @this {*}
         * @return {*}
         */
        'fill': function() {
          var color = this['chart'].getSeriesCount() > 1 ? this['sourceColor'] : this['chart'].palette().itemAt(this['iterator'].currentIndex);
          color = color ? color : this['sourceColor'];
          return anychart.color.setOpacity(color, 0.85, true);
        },
        /**
         * @this {*}
         * @return {*}
         */
        'hoverFill': function() {
          var color = this['chart'].getSeriesCount() > 1 ? this['sourceColor'] : this['chart'].palette().itemAt(this['iterator'].currentIndex);
          color = color ? color : this['sourceColor'];
          return anychart.color.setOpacity(color, 0.65, true);
        },
        /**
         * @this {*}
         * @return {*}
         */
        'stroke': function() {
          var color = this['chart'].getSeriesCount() > 1 ? this['sourceColor'] : this['chart'].palette().itemAt(this['iterator'].currentIndex);
          color = color ? color : this['sourceColor'];
          return anychart.color.setThickness(color, 1);
        },
        'labels': {
          'format': anychart.core.defaultTheme.VALUE_TOKEN_DECIMALS_COUNT_2,
          'anchor': 'auto',
          'position': 'value',
          'fontColor': anychart.core.defaultTheme.fontColorNormal
        },
        'markers': {
          'position': 'value',
          'positionFormatter': anychart.core.defaultTheme.returnValue
        }
      }
    },
    'defaultYAxisSettings': {
      'labels': {
        'format': anychart.core.defaultTheme.VALUE_TOKEN_DECIMALS_COUNT_10
      }
    },
    'labels': {
      'enabled': false
    }
  }
});
