goog.provide('anychart.themes.dark_blue');


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
window['anychart']['themes']['darkBlue'] = {
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
    'fontColor': '#b0bec5',
    'fontSize': 12
  },
  'defaultBackground': {
    'fill': '#37474f',
    'stroke': '#263238',
    'cornerType': 'round',
    'corners': 0
  },
  'defaultAxis': {
    'stroke': '#546e7a',
    'ticks': {
      'stroke': '#546e7a'
    },
    'minorTicks': {
      'stroke': '#455a64'
    }
  },
  'defaultGridSettings': {
    'stroke': '#546e7a'
  },
  'defaultMinorGridSettings': {
    'stroke': '#455a64'
  },
  'defaultSeparator': {
    'fill': '#546e7a'
  },
  'defaultTooltip': {
    'background': {
      'fill': '#37474f 0.9',
      'corners': 3
    },
    'fontColor': '#90a4ae',
    'title': {
      'align': 'center',
      'fontSize': 14
    },
    'content': {
      'fontColor': '#90a4ae',
      'fontSize': 12
    },
    'padding': {'top': 10, 'right': 15, 'bottom': 10, 'left': 15},
    'separator': {
      'margin': {'top': 10, 'right': 10, 'bottom': 10, 'left': 10}
    }
  },
  'defaultColorRange': {
    'stroke': '#546e7a',
    'ticks': {
      'stroke': '#546e7a', 'position': 'outside', 'length': 7, 'enabled': true
    },
    'minorTicks': {
      'stroke': '#546e7a', 'position': 'outside', 'length': 5, 'enabled': true
    },
    'marker': {
      'padding': {'top': 3, 'right': 3, 'bottom': 3, 'left': 3},
      'fill': '#b0bec5',
      'hoverFill': '#b0bec5'
    }
  },
  'defaultScroller': {
    'fill': '#455a64',
    'selectedFill': '#546e7a',
    'thumbs': {
      'fill': '#78909c',
      'stroke': '#455a64',
      'hoverFill': '#90a4ae',
      'hoverStroke': '#546e7a'
    }
  },
  'chart': {
    'defaultSeriesSettings': {
      'base': {
        'selectStroke': '1.5 #878f96',
        'selectMarkers': {
          'stroke': '1.5 #878f96'
        }
      },
      'lineLike': {
        'selectStroke': '3 #878f96'
      },
      'areaLike': {
        'selectStroke': '3 #878f96'
      },
      'marker': {
        'selectStroke': '1.5 #878f96'
      }
    },
    'title': {
      'fontSize': 14
    },
    'padding': {'top': 20, 'right': 25, 'bottom': 15, 'left': 15}
  },
  'cartesianBase': {
    'defaultSeriesSettings': {
      'box': {
        'selectMedianStroke': '#878f96',
        'selectStemStroke': '#878f96',
        'selectWhiskerStroke': '#878f96',
        'selectOutlierMarkers': {
          'enabled': null,
          'size': 4,
          'fill': '#878f96',
          'stroke': '#878f96'
        }
      },
      'candlestick': {
        'risingFill': '#42a5f5',
        'risingStroke': '#42a5f5',
        'hoverRisingFill': returnLightenSourceColor,
        'hoverRisingStroke': returnDarkenSourceColor,
        'fallingFill': '#bbdefb',
        'fallingStroke': '#bbdefb',
        'hoverFallingFill': returnLightenSourceColor,
        'hoverFallingStroke': returnDarkenSourceColor,
        'selectRisingStroke': '3 #42a5f5',
        'selectFallingStroke': '3 #bbdefb',
        'selectRisingFill': '#333333 0.85',
        'selectFallingFill': '#333333 0.85'
      },
      'ohlc': {
        'risingStroke': '#42a5f5',
        'hoverRisingStroke': returnDarkenSourceColor,
        'fallingStroke': '#bbdefb',
        'hoverFallingStroke': returnDarkenSourceColor,
        'selectRisingStroke': '3 #42a5f5',
        'selectFallingStroke': '3 #bbdefb'
      }
    }
  },
  'pieFunnelPyramidBase': {
    'labels': {
      'fontColor': null
    },
    'selectStroke': '1.5 #878f96',
    'connectorStroke': '#546e7a',
    'outsideLabels': {'autoColor': '#b0bec5'},
    'insideLabels': {'autoColor': '#212121'}
  },
  'map': {
    'unboundRegions': {'enabled': true, 'fill': '#455a64', 'stroke': '#546e7a'},
    'linearColor': {'colors': ['#e3f2fd', '#1976d2']},
    'defaultSeriesSettings': {
      'base': {
        'labels': {
          'fontColor': '#212121'
        },
        'selectStroke': '3 #878f96'
      },
      'connector': {
        'selectStroke': '1.5 #000',
        'hoverStroke': '1.5 #b0bec5',
        'stroke': '1.5 #42a5f5',
        'markers': {
          'fill': '#b0bec5',
          'stroke': '1.5 #455a64'
        },
        'hoverMarkers': {
          'fill': '#42a5f5'
        }
      },
      'marker': {
        'labels': {
          'fontColor': '#b0bec5'
        }
      }
    }
  },
  'sparkline': {
    'padding': 0,
    'background': {'stroke': '#37474f'},
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
    'background': {'stroke': '#37474f'},
    'padding': {'top': 5, 'right': 10, 'bottom': 5, 'left': 10},
    'margin': {'top': 0, 'right': 0, 'bottom': 0, 'left': 0},
    'defaultMarkerSettings': {
      'fill': '#90caf9',
      'stroke': '2 #90caf9'
    },
    'rangePalette': {
      'items': ['#b0bec5', '#90a4ae', '#78909c', '#546e7a', '#455a64']
    }
  },
  'heatMap': {
    'stroke': '#37474f',
    'hoverStroke': '1.5 #37474f',
    'selectStroke': '1.5 #878f96',
    'labels': {
      'fontColor': '#212121'
    }
  },
  'treeMap': {
    'headers': {
      'background': {
        'enabled': true,
        'fill': '#455a64',
        'stroke': '#546e7a'
      }
    },
    'hoverHeaders': {
      'fontColor': '#b0bec5',
      'background': {
        'fill': '#546e7a'
      }
    },
    'labels': {
      'fontColor': '#212121'
    },
    'selectLabels': {
      'fontColor': '#fafafa'
    },
    'stroke': '#546e7a',
    'selectStroke': '2 #878f96'
  }
};
