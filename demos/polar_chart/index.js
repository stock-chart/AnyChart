var chart;
anychart.onDocumentLoad(function() {

  var data = [
    //[0, 14.582],
    [0, NaN],
    [2, 15.24],
    [4, 16.169],
    [6, 17.44],
    [8, 19.101],
    [10, 20.997],
    [12, 21.462],
    [14, 20.279],
    [16, 18.077],
    [18, 15.902],
    [20, 14.157],
    [22, 12.847],
    [24, 11.761],
    [26, 10.786],
    [28, 9.955],
    [30, 9.341],
    [32, 8.935],
    [34, 8.636],
    [36, 8.323],
    [38, 8.025],
    [40, 7.843],
    [42, 7.874],
    [44, 7.985],
    [46, 8.089],
    [48, 8.163],
    [50, 8.257],
    [52, 8.455],
    [54, 8.657],
    [56, 8.84],
    [58, 9.024],
    [60, 9.238],
    [62, 9.636],
    [64, 10.072],
    [66, 10.54],
    [68, 11.04],
    [70, 11.57],
    [72, 12.369],
    [74, 13.233],
    [76, 14.035],
    [78, 14.61],
    [80, 14.885],
    [82, 14.991],
    [84, 14.788],
    [86, 14.206],
    [88, 13.393],
    [90, 12.613],
    [92, 11.921],
    [94, 11.291],
    [96, 10.624],
    [98, 9.938],
    [100, 9.394],
    [102, 8.979],
    [104, 8.728],
    [106, 8.582],
    //[108, 8.515],
    //[110, 8.581],
    //[112, 8.502],
    //[114, 8.534],
    [108, NaN],
    [110, NaN],
    [112, NaN],
    [114, NaN],
    [116, 8.656],
    [118, 8.833],
    [120, 9.034],
    [122, 8.861],
    [124, 8.657],
    [126, 8.369],
    [128, 7.982],
    [130, 7.514],
    [132, 7.173],
    [134, 6.778],
    [136, 6.339],
    [138, 5.873],
    [140, 5.402],
    [142, 4.999],
    [144, 4.597],
    [146, 4.221],
    [148, 3.876],
    [150, 3.55],
    [152, 3.266],
    //[154, 2.997],
    //[156, 2.745],
    //[158, 2.514],
    //[160, 2.299],
    //[162, 2.206],
    //[164, 2.111],
    //[166, 2.071],
    //[168, 2.075],
    //[170, 2.058],
    [154, NaN],
    [156, NaN],
    [158, NaN],
    [160, NaN],
    [162, NaN],
    [164, NaN],
    [166, NaN],
    [168, NaN],
    [170, NaN],
    [172, 2.11],
    [174, 2.118],
    [176, 2.131],
    [178, 2.135],
    [180, 2.073],
    [182, 2.054],
    [184, 1.976],
    [186, 1.837],
    [188, 1.64],
    [190, 1.415],
    [192, 1.223],
    [194, 1.031],
    [196, 0.793],
    [198, 0.516],
    [200, 0.281],
    [202, 0.126],
    [204, 0.027],
    [206, 0.018],
    [208, 0.099],
    [210, 0.245],
    [212, 0.551],
    [214, 0.913],
    [216, 1.321],
    [218, 1.754],
    [220, 2.184],
    [222, 2.522],
    [224, 2.83],
    [226, 3.104],
    [228, 3.311],
    [230, 3.399],
    [232, 3.403],
    [234, 3.288],
    [236, 3.128],
    [238, 2.945],
    [240, 2.697],
    [242, 2.529],
    [244, 2.321],
    [246, 2.137],
    [248, 1.99],
    [250, 1.844],
    [252, 1.787],
    [254, 1.732],
    [256, 1.747],
    [258, 1.838],
    [260, 1.945],
    [262, 2.032],
    [264, 2.15],
    [266, 2.318],
    [268, 2.534],
    [270, 2.78],
    [272, 3],
    [274, 3.257],
    [276, 3.564],
    [278, 3.92],
    [280, 4.304],
    [282, 4.748],
    [284, 5.221],
    [286, 5.773],
    [288, 6.401],
    [290, 7.034],
    [292, 7.649],
    [294, 8.268],
    [296, 8.737],
    [298, 9.048],
    [300, 9.369],
    [302, 9.83],
    [304, 10.348],
    [306, 10.871],
    [308, 11.409],
    [310, 12.052],
    [312, 12.984],
    [314, 14.11],
    [316, 15.32],
    [318, 16.582],
    [320, 18.017],
    [322, 19.861],
    [324, 22.274],
    [326, 24.923],
    [328, 26.94],
    [330, 27.227],
    [332, 25.166],
    [334, 23.02],
    [336, 21.075],
    [338, 19.431],
    [340, 18.164],
    [342, 17.007],
    //[344, 16.099],
    //[346, 15.357],
    //[348, 14.742],
    //[350, 14.287],
    //[352, 13.93],
    //[354, 13.737],
    //[356, 13.783],
    //[358, 14.084]
    [344, NaN],
    [346, NaN],
    [348, NaN],
    [350, NaN],
    [352, NaN],
    [354, NaN],
    [356, NaN],
    [358, NaN]
  ];

  var data2 = [
    //[0, -14.582],
    //[2, -15.24],
    //[4, -16.169],
    //[6, -17.44],
    //[8, -19.101],
    [0, NaN],
    [2, NaN],
    [4, NaN],
    [6, NaN],
    [8, NaN],
    [10, -20.997],
    [12, -21.462],
    [14, -20.279],
    [16, -18.077],
    [18, -15.902],
    [20, -14.157],
    [22, -12.847],
    [24, -11.761],
    [26, -10.786],
    [28, -9.955],
    [30, -9.341],
    [32, -8.935],
    [34, -8.636],
    [36, -8.323],
    [38, -8.025],
    [40, -7.843],
    [42, -7.874],
    [44, -7.985],
    [46, -8.089],
    [48, -8.163],
    [50, -8.257],
    [52, -8.455],
    [54, -8.657],
    [56, -8.84],
    [58, -9.024],
    [60, -9.238],
    [62, -9.636],
    [64, -10.072],
    [66, -10.54],
    [68, -11.04],
    [70, -11.57],
    [72, -12.369],
    [74, -13.233],
    [76, -14.035],
    [78, -14.61],
    [80, -14.885],
    [82, -14.991],
    [84, -14.788],
    [86, -14.206],
    [88, -13.393],
    [90, -12.613],
    [92, -11.921],
    [94, -11.291],
    [96, -10.624],
    [98, -9.938],
    [100, -9.394],
    [102, -8.979],
    [104, -8.728],
    [106, -8.582],
    [108, -8.515],
    [110, -8.581],
    [112, -8.502],
    [114, -8.534],
    [116, -8.656],
    [118, -8.833],
    [120, -9.034],
    [122, -8.861],
    [124, -8.657],
    [126, -8.369],
    [128, -7.982],
    [130, -7.514],
    [132, -7.173],
    [134, -6.778],
    [136, -6.339],
    [138, -5.873],
    [140, -5.402],
    [142, -4.999],
    [144, -4.597],
    [146, -4.221],
    [148, -3.876],
    [150, -3.55],
    [152, -3.266],
    [154, -2.997],
    [156, -2.745],
    [158, -2.514],
    [160, -2.299],
    [162, -2.206],
    [164, -2.111],
    [166, -2.071],
    [168, -2.075],
    [170, -2.058],
    [172, -2.11],
    [174, -2.118],
    [176, -2.131],
    [178, -2.135],
    [180, -2.073],
    [182, -2.054],
    [184, -1.976],
    [186, -1.837],
    [188, -1.64],
    //[190, -1.415],
    //[192, -1.223],
    //[194, -1.031],
    //[196, -0.793],
    //[198, -0.516],
    //[200, -0.281],
    //[202, -0.126],
    //[204, -0.027],
    //[206, -0.018],
    //[208, -0.099],
    //[210, -0.245],
    //[212, -0.551],
    //[214, -0.913],
    //[216, -1.321],
    //[218, -1.754],
    //[220, -2.184],
    [190, NaN],
    [192, NaN],
    [194, NaN],
    [196, NaN],
    [198, NaN],
    [200, NaN],
    [202, NaN],
    [204, NaN],
    [206, NaN],
    [208, NaN],
    [210, NaN],
    [212, NaN],
    [214, NaN],
    [216, NaN],
    [218, NaN],
    [220, NaN],
    [222, -2.522],
    [224, -2.83],
    [226, -3.104],
    [228, -3.311],
    [230, -3.399],
    [232, -3.403],
    [234, -3.288],
    [236, -3.128],
    [238, -2.945],
    [240, -2.697],
    [242, -2.529],
    [244, -2.321],
    [246, -2.137],
    [248, -1.99],
    [250, -1.844],
    [252, -1.787],
    [254, -1.732],
    [256, -1.747],
    [258, -1.838],
    [260, -1.945],
    [262, -2.032],
    [264, -2.15],
    [266, -2.318],
    [268, -2.534],
    [270, -2.78],
    [272, -3],
    [274, -3.257],
    [276, -3.564],
    [278, -3.92],
    [280, -4.304],
    [282, -4.748],
    [284, -5.221],
    [286, -5.773],
    [288, -6.401],
    [290, -7.034],
    [292, -7.649],
    [294, -8.268],
    [296, -8.737],
    [298, -9.048],
    [300, -9.369],
    [302, -9.83],
    [304, -10.348],
    [306, -10.871],
    [308, -11.409],
    [310, -12.052],
    [312, -12.984],
    [314, -14.11],
    [316, -15.32],
    [318, -16.582],
    [320, -18.017],
    [322, -19.861],
    [324, -22.274],
    [326, -24.923],
    [328, -26.94],
    [330, -27.227],
    //[332, -25.166],
    //[334, -23.02],
    //[336, -21.075],
    //[338, -19.431],
    //[340, -18.164],
    //[342, -17.007],
    //[344, -16.099],
    //[346, -15.357],
    //[348, -14.742],
    //[350, -14.287],
    //[352, -13.93],
    //[354, -13.737],
    //[356, -13.783],
    //[358, -14.084]
    [332, NaN],
    [334, NaN],
    [336, NaN],
    [338, NaN],
    [340, NaN],
    [342, NaN],
    [344, NaN],
    [346, NaN],
    [348, NaN],
    [350, NaN],
    [352, NaN],
    [354, NaN],
    [356, NaN],
    [358, NaN]
  ];

  var data3 = [
    [0, 'P1'],
    [46, 'P2'],
    [90, 'P3'],
    [136, 'P4'],
    [180, 'P5'],
    [226, 'P6'],
    [270, 'P7'],
    [316, 'P8']
  ];


  var data4 = [
    [0, 'P44'],
    //[46, 'P22'],
    //[90, 'P33'],
    //[136, 'P44'],
    //[180, 'P71'],
    //[226, 'P83'],
    //[270, 'P94'],
    [346, 'P44']
  ];

  var data5 = [
    [0, 44.582],
    [21, 35.24],
    [79, 26.169],
    [156, 37.44],
    [190, 19.101],
    [216, 40.997],
    [280, 31.462],
    [356,30.279]
  ];


  var data6 = [
    [0, 54.582],
    [21, 35.24],
    [79, 56.169],
    [156, 37.44],
    [190, 59.101],
    [216, 40.997],
    [280, 61.462],
    [356, 70.279]
  ];


  chart = anychart.polar()
      .container('container')
      .startAngle(0);

  //chart.yScale().ticks().interval(10);
  chart.xScale().maximum(360).minimum(0).inverted(false);
  //chart.yScale().inverted(true);

  //chart.xScale().ticks().interval(15);


  chart.yAxis().minorTicks().enabled(false);
  chart.xAxis().labels()
      .textFormatter(function() {
        return this['value'] + '°'
      });

  //chart.xAxis().minorLabels().enabled(true);
  //chart.xAxis().minorTicks().enabled(true);

  chart.title(null);
  chart.background().enabled(true);

  chart.palette(['blue .3', 'red .3', '#44F24A .9']);

  var series1 = chart.line().closed(false).connectMissingPoints(false);
  series1.data(data5);
  series1.markers();
  series1.stroke('3 blue');

  var series2 = chart.area().closed(false).connectMissingPoints(false);
  series2.data(data6);
  series2.stroke('3 red');

  //var series3 = chart.marker(data3);

  chart.draw();
});