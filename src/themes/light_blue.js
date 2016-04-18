goog.provide('anychart.themes.light_blue');


/**
 * @this {*}
 * @return {*}
 */
var returnDarkenSourceColor = function() {
  return window['anychart']['color']['darken'](this['sourceColor']);
};


/**
 * @this {*}
 * @return {*}
 */
var returnLightenSourceColor = function() {
  return window['anychart']['color']['lighten'](this['sourceColor']);
};


window['anychart'] = window['anychart'] || {};
window['anychart']['themes'] = window['anychart']['themes'] || {};
window['anychart']['themes']['lightBlue'] = {
  'palette': {
    'type': 'distinct',
    'items': ['#90caf9', '#42a5f5', '#1976d2', '#9fa8da', '#5c6bc0', '#7e57c2', '#54dbdf', '#15a9c7', '#00897b', '#304ffe']
  },
  'ordinalColor': {
    'autoColors': function(rangesCount) {
      return window['anychart']['color']['blendedHueProgression']('#e3f2fd', '#1976d2', rangesCount);
    }
  },
  'defaultFontSettings': {
    'fontFamily': '"Lucida Console", Monaco, monospace',
    'fontColor': '#546e7a',
    'fontSize': 12
  },
  'defaultBackground': {
    'fill': '#eceff1',
    'stroke': '#cfd8dc',
    'cornerType': 'round',
    'corners': 0
  },
  'defaultAxis': {
    'stroke': '#b0bec5',
    'ticks': {
      'stroke': '#b0bec5'
    },
    'minorTicks': {
      'stroke': '#cfd8dc'
    }
  },
  'defaultGridSettings': {
    'stroke': '#b0bec5'
  },
  'defaultMinorGridSettings': {
    'stroke': '#cfd8dc'
  },
  'defaultSeparator': {
    'fill': '#cfd8dc'
  },
  'defaultTooltip': {
    'background': {
      'fill': '#eceff1 0.9',
      'corners': 3
    },
    'fontSize': 12,
    'fontColor': '#78909c',
    'title': {
      'align': 'center',
      'fontSize': 14
    },
    'content': {
      'fontColor': '#78909c',
      'fontSize': 12
    },
    'padding': {'top': 10, 'right': 15, 'bottom': 10, 'left': 15},
    'separator': {
      'margin': {'top': 10, 'right': 10, 'bottom': 10, 'left': 10}
    }
  },
  'defaultColorRange': {
    'stroke': '#b0bec5',
    'ticks': {
      'stroke': '#b0bec5', 'position': 'outside', 'length': 7, 'enabled': true
    },
    'minorTicks': {
      'stroke': '#b0bec5', 'position': 'outside', 'length': 5, 'enabled': true
    },
    'marker': {
      'padding': {'top': 3, 'right': 3, 'bottom': 3, 'left': 3},
      'fill': '#b0bec5',
      'hoverFill': '#b0bec5'
    }
  },
  'defaultScroller': {
    'fill': '#dfe1e3',
    'selectedFill': '#b0bec5',
    'thumbs': {
      'fill': '#cfd8dc',
      'stroke': '#b0bec5',
      'hoverFill': '#eceff1',
      'hoverStroke': '#b0bec5'
    }
  },
  'chart': {
    'title': {
      'fontSize': 14
    },
    'padding': {'top': 20, 'right': 25, 'bottom': 15, 'left': 15}
  },
  'cartesianBase': {
    'defaultSeriesSettings': {
      'candlestick': {
        'risingFill': '#42a5f5',
        'risingStroke': '#42a5f5',
        'hoverRisingFill': returnLightenSourceColor,
        'hoverRisingStroke': returnDarkenSourceColor,
        'fallingFill': '#bbdefb',
        'fallingStroke': '#bbdefb',
        'hoverFallingFill': returnLightenSourceColor,
        'hoverFallingStroke': returnLightenSourceColor,
        'selectRisingStroke': '3 #42a5f5',
        'selectFallingStroke': '3 #bbdefb',
        'selectRisingFill': '#333333 0.85',
        'selectFallingFill': '#333333 0.85'
      },
      'ohlc': {
        'risingStroke': '#42a5f5',
        'hoverRisingStroke': returnLightenSourceColor,
        'fallingStroke': '#bbdefb',
        'hoverFallingStroke': returnLightenSourceColor,
        'selectRisingStroke': '3 #42a5f5',
        'selectFallingStroke': '3 #bbdefb'
      }
    }
  },
  'pieFunnelPyramidBase': {
    'labels': {
      'fontColor': null
    },
    'connectorStroke': '#b0bec5',
    'outsideLabels': {'autoColor': '#546e7a'},
    'insideLabels': {'autoColor': '#37474f'}
  },
  'map': {
    'unboundRegions': {'enabled': true, 'fill': '#cfd8dc', 'stroke': '#b0bec5'},
    'linearColor': {'colors': ['#e3f2fd', '#1976d2']},
    'defaultSeriesSettings': {
      'base': {
        'labels': {
          'fontColor': '#212121'
        }
      },
      'connector': {
        'selectStroke': '1.5 #000',
        'hoverStroke': '1.5 #b0bec5',
        'stroke': '1.5 #42a5f5',
        'markers': {
          'fill': '#546e7a',
          'stroke': '1.5 #cfd8dc'
        },
        'hoverMarkers': {
          'fill': '#cfd8dc'
        }
      }
    }
  },
  'sparkline': {
    'padding': 0,
    'background': {'stroke': '#eceff1'},
    'defaultSeriesSettings': {
      'area': {
        'stroke': '1.5 #42a5f5',
        'fill': '#42a5f5 0.5'
      },
      'column': {
        'fill': '#42a5f5',
        'negativeFill': '#bbdefb'
      },
      'line': {
        'stroke': '1.5 #42a5f5'
      },
      'winLoss': {
        'fill': '#42a5f5',
        'negativeFill': '#bbdefb'
      }
    }
  },
  'bullet': {
    'background': {'stroke': '#eceff1'},
    'defaultMarkerSettings': {
      'fill': '#90caf9',
      'stroke': '2 #90caf9'
    },
    'padding': {'top': 5, 'right': 10, 'bottom': 5, 'left': 10},
    'margin': {'top': 0, 'right': 0, 'bottom': 0, 'left': 0},
    'rangePalette': {
      'items': ['#90a4ae', '#b0bec5', '#cfd8dc', '#D6DEE1', '#E6EAED']
    }
  },
  'heatMap': {
    'stroke': '1 #eceff1',
    'hoverStroke': '1.5 #eceff1',
    'selectStroke': '2 #eceff1',
    'labels': {
      'fontColor': '#212121'
    }
  },
  'treeMap': {
    'headers': {
      'background': {
        'enabled': true,
        'fill': '#cfd8dc',
        'stroke': '#b0bec5'
      }
    },
    'hoverHeaders': {
      'fontColor': '#546e7a',
      'background': {
        'fill': '#b0bec5'
      }
    },
    'labels': {
      'fontColor': '#212121'
    },
    'selectLabels': {
      'fontColor': '#fafafa'
    },
    'stroke': '#b0bec5',
    'selectStroke': '2 #eceff1'
  }
};
