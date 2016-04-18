var data_set_1 = anychart.data.set([
  {name: 'Apples', value: 6371664},
  {name: 'Pears', value: 7216301},
  {name: 'Peaches', value: 1486621},
  {name: 'Plums', value: 786622},
  {name: 'Other', value: 900000}
]);
var seriesNames = ['Apples', 'Pears', 'Peaches', 'Plums', 'Apricots', 'Oranges', 'Bananas', 'Melons', 'Cherry', 'Bilberry'];
var data_set_2 = anychart.data.set([
  ['Jan.', 12, 16, 8, 13, 9, 13, 11, 33, 22, 15, 10, 1],
  ['Feb.', 11, 7, 12, 6, 8, 16, 24, 32, 29, 17, 12, 2],
  ['Mar.', 13, 8, 13, 7, 7, 12, 20, 23, 21, 18, 9, 1.9],
  ['Apr.', 14, 8, 15, 7, 7, 19, 28, 36, 22, 18, 8, 1.5],
  ['May', 10, 9, 14, 4, 8, 27, 25, 38, 23, 18, 15, 1.8],
  ['June', 22, 20, 24, 6, 22, 27, 24, 33, 21, 32, 16, 2.3],
  ['July', 13, 10, 14, 9, 11, 18, 27, 32, 20, 21, 18, 1.7],
  ['Aug.', 14, 12, 14, 7, 10, 13, 19, 35, 26, 24, 3, 1.1],
  ['Sep.', 15, 19, 15, 9, 9, 21, 16, 39, 27, 23, 12, 0.9],
  ['Oct.', 17, 21, 12, 8, 7, 25, 17, 38, 25, 26, 11, 1.7],
  ['Nov.', 21, 20, 12, 10, 5, 27, 14, 33, 26, 29, 15, 1.3],
  ['Dec.', 16, 21, 13, 11, 7, 30, 12, 34, 24, 32, 14, 1.2]
]);
var data_set_3 = anychart.data.set([
  {x: 'Apples', low: 20000, q1: 26000, median: 27000, q3: 32000, high: 38000, outliers: [50000, 52000]},
  {x: 'Pears', low: 24000, q1: 28000, median: 32000, q3: 38000, high: 42000, outliers: [48000]},
  {x: 'Peaches', low: 40000, q1: 49000, median: 62000, q3: 73000, high: 88000, outliers: [32000, 29000, 106000]},
  {x: 'Plums', low: 52000, q1: 59000, median: 65000, q3: 74000, high: 83000, outliers: [91000]},
  {x: 'Apricots', low: 45000, q1: 54000, median: 66000, q3: 81000, high: 97000, outliers: [120000]},
  {x: 'Oranges', low: 47000, q1: 56000, median: 69000, q3: 85000, high: 100000, outliers: [110000, 115000, 32000]},
  {x: 'Bananas', low: 64000, q1: 74000, median: 83000, q3: 93000, high: 100000, outliers: [110000]},
  {x: 'Melons', low: 67000, q1: 72000, median: 84000, q3: 95000, high: 110000, outliers: [57000, 54000]},
  {x: 'Cherry', low: 75000, q1: 99000, median: 123000, q3: 160000, high: 210000, outliers: [220000, 70000]},
  {x: 'Bilberry', low: 58000, q1: 96000, median: 130000, q3: 170000, high: 200000, outliers: [42000, 210000, 215000]}
]);
var data_set_4 = anychart.data.set([
  ['Blouse "Blue Viola"', 101.88, 99.75, 23, 17, 32, 18],
  ['Dress "Daisy"', 155.8, 144.03, 18, 12, 26, 33],
  ['Trousers "Cutesy Classic"', 203.25, 173.56, 22, 14, 20, 46],
  ['Dress "Morning Dew"', 256.0, 120.5, 22, 16, 20, 23],
  ['Turtleneck "Dark Chocolate"', 408.89, 294.75, 18, 22, 23, 19],
  ['Jumper "Early Spring"', 427.36, 430.24, 23, 22, 28, 34],
  ['Breeches "Summer Mood"', 356.0, 135.5, 12, 16, 23, 31],
  ['Dress "Mauve Chamomile"', 406.0, 95.5, 22, 16, 40, 23],
  ['Dress "Flying Tits"', 527.36, 503.24, 15, 22, 42, 24],
  ['Dress "Singing Nightingales"', 587.36, 543.24, 25, 12, 28, 37],
  ['Sundress "Cloudy weather"', 603.36, 407.24, 15, 12, 22, 24],
  ['Sundress "East motives"', 633.36, 477.24, 32, 10, 39, 19],
  ['Sweater "Cold morning"', 517.36, 437.24, 21, 17, 29, 48],
  ['Trousers "Lavender Fields"', 443.36, 387.24, 17, 26, 31, 41],
  ['Jumper "Coffee with Milk"', 543.36, 307.24, 19, 10, 34, 31],
  ['Blouse "Blooming Cactus"', 790.36, 277.24, 23, 18, 26, 28],
  ['Sweater "Fluffy Comfort"', 790.34, 678.34, 18, 12, 28, 34]
]);
var dataSet_austria_map_1 = anychart.data.set([
  {'id': 'AT.VO', 'value': 0, 'series': '1'},
  {'id': 'AT.BU', 'value': 1, 'series': '2'},
  {'id': 'AT.ST', 'value': 2, 'series': '2'},
  {'id': 'AT.KA', 'value': 3, 'series': '1', 'label': {'enabled': true}},
  {'id': 'AT.OO', 'value': 4, 'series': '4'},
  {'id': 'AT.SZ', 'value': 5, 'series': '3'},
  {'id': 'AT.TR', 'value': 6, 'series': '2'},
  {'id': 'AT.NO', 'value': 7, 'series': '4'},
  {'id': 'AT.WI', 'value': 8, 'series': '3'}
]).mapAs();
var dataSet_austria_map_2 = anychart.data.set([
  {'id': 'AT.VO', 'value': 0, 'size': '3'},
  {'id': 'AT.BU', 'value': 1, 'size': '2.9'},
  {'id': 'AT.ST', 'value': 2, 'size': '2.5'},
  {'id': 'AT.OO', 'value': 4, 'size': '1.9'},
  {'id': 'AT.NO', 'value': 7, 'size': '2.3'},
  {'id': 'AT.KA', 'value': 7, 'size': '2.5'},
  {'id': 'AT.SZ', 'value': 7, 'size': '2.7'},
  {'id': 'AT.TR', 'value': 7, 'size': '2.9'},
  {'id': 'AT.WI', 'value': 7, 'size': '2.1'}
]);
var dataSet_austria_map_3 = anychart.data.set([
  {'name': 'Wien', 'lat': '48.208185', 'long': '16.373503'},
  {'name': 'Salzburg', 'lat': '47.808747', 'long': '13.054934'},
  {'name': 'Graz', 'lat': '47.070115', 'long': '15.439200'},
  {'name': 'Innsbruck', 'lat': '47.268186', 'long': '11.403967'},
  {'name': 'Klagenfurt am\nWörthersee', 'lat': '46.636389', 'long': '14.311742'}
]);
var dataSet_austria_map_4 = anychart.data.set([
  {points: [48.208185, 16.373503, 47.808747, 13.054934], from: 'Wien', to: 'Salzburg'},
  {points: [48.208185, 16.373503, 47.070115, 15.439200], from: 'Wien', to: 'Graz'},
  {points: [47.808747, 13.054934, 47.070115, 15.439200], from: 'Salzburg', to: 'Graz'},
  {points: [47.808747, 13.054934, 47.268186, 11.403967], from: 'Salzburg', to: 'Innsbruck'},
  {points: [47.808747, 13.054934, 46.636389, 14.311742], from: 'Salzburg', to: 'Klagenfurt am\nWörthersee'}
]);
var table_data = {
  'Alabama': {
    actualSales: [2.173, 2.313, 2.233, 2.303, 3.743, 1.265, 1.881, 2.854, 1.009, 1.022, 3.165, 2.232],
    toGoal: [1.508, 3.252, 1.795, 1.329, 2.289, 3.464, 1.98, 3.301, 2.643, 2.254, 1.82, 3.868],
    profitTrend: [2.434, -1.593, 1.094, 3.264, 2.102, -2.003, 3.814, 2.564, 2.553, -1.903, 2.61, -2.123]
  },
  'Alaska': {
    actualSales: [3.92, 1.433, 2.181, 2.042, 3.357, 2.786, 2.441, 3.205, 1.342, 2.619, 1.811, 3.738],
    toGoal: [1.329, 1.226, 1.303, 2.848, 1.078, 1.32, 3.081, 1.153, 2.89, 1.911, 2.698, 3.406],
    profitTrend: [3.166, -3.161, 3.746, -1.057, -2.122, 3.207, 3.124, 2.358, 1.041, 3.781, 1.576, 3.51]
  },
  'Arizona': {
    actualSales: [2.171, 1.522, 3.418, 2.124, 3.741, 1.93, 2.019, 2.317, 1.038, 3.585, 2.048, 3.715],
    toGoal: [2.033, 1.141, 2.754, 1.386, 1.808, 1.671, 2.332, 3.274, 1.628, 1.588, 2.244, 1.872],
    profitTrend: [3.234, -1.492, 2.295, -2.02, 3.194, 2.546, 3.08, -2.702, 1.505, -1.074, 2.223, 1.723]
  },
  'Idaho': {
    actualSales: [1.831, 2.913, 2.781, 1.046, 2.032, 3.538, 3.746, 2.654, 1.32, 3.416, 3.86, 3.072],
    toGoal: [3.438, 3.772, 2.881, 1.971, 3.214, 1.403, 3.151, 2.31, 1.42, 1.117, 2.638, 3.578],
    profitTrend: [-1.783, 1.956, 2.133, 3.224, -1.346, -1.13, 3.561, 2.867, 1.769, -1.738, 3.901, 3.542]
  },
  'Illinois': {
    actualSales: [1.396, 2.276, 3.223, 1.376, 3.324, 3.671, 3.946, 3.148, 2.799, 3.537, 2.937, 2.203],
    toGoal: [3.539, 3.474, 3.363, 3.834, 2.237, 2.239, 3.833, 2.913, 1.29, 1.051, 1.098, 1.332],
    profitTrend: [2.29, 1.201, 2.566, -1.567, 3.748, 3.483, 2.01, 2.138, 1.316, -1.43, 1.1, 2.932]
  },
  'Indiana': {
    actualSales: [2.223, 2.979, 2.902, 1.321, 2.709, 3.249, 1.544, 1.863, 2.751, 3.566, 1.635, 1.772],
    toGoal: [2.005, 1.513, 1.835, 3.688, 1.776, 2.363, 3.928, 1.604, 1.12, 1.558, 3.978, 1.363],
    profitTrend: [3.262, -1.396, 2.679, 3.553, 2.489, 2.404, -1.774, 2.549, -1.201, 3.037, 1.38, 1.333]
  },
  'Ohio': {
    actualSales: [3.797, 2.34, 2.955, 1.645, 2.268, 2.507, 2.808, 1.762, 1.433, 3.76, 1.259, 2.017],
    toGoal: [1.21, 2.74, 3.919, 2.706, 1.44, 3.698, 2.558, 2.386, 1.764, 2.953, 2.166, 1.511],
    profitTrend: [3.042, -1.914, 2.443, 2.646, 3.761, 1.181, -1.746, 3.889, -1.73, 1.974, 2.831, 2.307]
  },
  'Oklahoma': {
    actualSales: [2.223, 3.569, 2.527, 3.449, 1.407, 2.24, 3.21, 3.104, 3.673, 3.365, 1.879, 2.703],
    toGoal: [2.441, 3.925, 1.915, 2.419, 2.447, 1.69, 3.138, 1.859, 3.886, 2.072, 3.131, 2.407],
    profitTrend: [2.061, 3.792, 3.711, -1.753, 1.947, 2.674, -1.873, 3.141, -2.636, 3.394, 1.074, 3.516]
  },
  'Oregon': {
    actualSales: [3.405, 1.784, 3.735, 1.768, 3.243, 2.868, 1.546, 3.761, 2.988, 2.579, 1.353, 2.119],
    toGoal: [2.516, 1.287, 3.444, 2.822, 3.376, 1.521, 2.289, 2.407, 2.821, 3.82, 3.931, 2.079],
    profitTrend: [2.327, 3.3, -1.302, 1.812, 1.906, 3.645, 1.727, -1.204, 3.882, -1.282, 1.541, 2.147]
  },
  'Vermont': {
    actualSales: [1.604, 2.514, 3.3, 1.54, 3.477, 1.834, 3.031, 2.749, 2.134, 2.722, 2.839, 1.228],
    toGoal: [3.024, 1.535, 1.81, 2.234, 3.456, 1.436, 3.891, 3.016, 3.785, 2.826, 1.324, 3.139],
    profitTrend: [-1.746, 2.522, 1.502, 2.094, 2.911, 2.024, 2.509, -1.758, 3.12, 2.521, 2.019, 1.093]
  },
  'Virginia': {
    actualSales: [2.316, 2.339, 1.547, 1.914, 2.731, 3.561, 1.349, 1.247, 2.634, 2.393, 2.264, 2.551],
    toGoal: [2.724, 3.603, 1.065, 3.948, 2.025, 3.046, 2.524, 3.118, 2.802, 1.878, 1.335, 2.197],
    profitTrend: [-1.334, 3.606, 3.518, 1.774, 2.552, 3.541, 2.385, 3.343, -1.871, 2.723, 3.023, 3.417]
  },
  'Washington': {
    actualSales: [3.718, 2.24, 1.779, 1.698, 1.612, 3.81, 1.548, 3.754, 1.655, 1.505, 3.567, 2.601],
    toGoal: [2.168, 1.641, 2.654, 3.205, 2.397, 1.37, 3.301, 2.553, 3.433, 3.084, 1.0, 1.49],
    profitTrend: [3.92, 3.257, 2.299, -1.358, -1.936, 2.097, 1.282, 1.642, 3.573, -2.761, 3.084, 1.319]
  }
};
var t1 = [1, -1, 1, 1, -1, 1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1];
var t2 = [-1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, 1, -1, -1, 1, -1];
var t3 = [1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1];
var t4 = [1, -1, 1, 1, 1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1];
var t5 = [-1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1, -1, -1, -1, 1, 1, 1, -1, 1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1];
var t6 = [-1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1];
var t7 = [-1, 1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, -1, 1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, 1, -1, -1, 1];
var t8 = [-1, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1];
var t9 = [1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1];
var t10 = [1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1];
var t11 = [1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1];
var t12 = [-1, 1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1];

var data_for_heat_map = [
  ['18-20', 0, 2.0, 0],
  ['18-20', 1, 3.9, 0],
  ['18-20', 2, 6.2, 1],
  ['18-20', 3, 8.5, 1],
  ['18-20', 4, 10.5, 1],
  ['18-20', 5, 12.5, 1],
  ['18-20', 6, 14.3, 2],
  ['18-20', 7, 16.0, 2],
  ['18-20', 8, 17.5, 2],
  ['18-20', 9, 18.9, 2],
  ['18-20', 10, 20.2, 3],
  ['18-20', 11, 21.3, 3],
  ['18-20', 12, 22.3, 3],
  ['18-20', 13, 23.1, 3],
  ['18-20', 14, 23.8, 3],
  ['18-20', 15, 24.3, 3],
  ['18-20', 16, 24.9, 3],

  ['21-25', 0, 2.5, 0],
  ['21-25', 1, 4.9, 0],
  ['21-25', 2, 7.3, 1],
  ['21-25', 3, 9.5, 1],
  ['21-25', 4, 11.6, 1],
  ['21-25', 5, 13.6, 1],
  ['21-25', 6, 15.4, 2],
  ['21-25', 7, 17.0, 2],
  ['21-25', 8, 18.6, 2],
  ['21-25', 9, 20.0, 2],
  ['21-25', 10, 21.2, 2],
  ['21-25', 11, 22.3, 3],
  ['21-25', 12, 23.3, 3],
  ['21-25', 13, 24.2, 3],
  ['21-25', 14, 24.9, 3],
  ['21-25', 15, 25.4, 3],
  ['21-25', 16, 25.8, 3],

  ['26-30', 0, 3.5, 0],
  ['26-30', 1, 6.0, 0],
  ['26-30', 2, 8.4, 0],
  ['26-30', 3, 10.6, 1],
  ['26-30', 4, 12.7, 1],
  ['26-30', 5, 14.6, 1],
  ['26-30', 6, 16.4, 1],
  ['26-30', 7, 18.1, 2],
  ['26-30', 8, 19.6, 2],
  ['26-30', 9, 21.0, 2],
  ['26-30', 10, 22.3, 2],
  ['26-30', 11, 23.4, 3],
  ['26-30', 12, 24.4, 3],
  ['26-30', 13, 25.2, 3],
  ['26-30', 14, 25.6, 3],
  ['26-30', 15, 26.5, 3],
  ['26-30', 16, 26.9, 3],

  ['31-35', 0, 4.5, 0],
  ['31-35', 1, 7.1, 0],
  ['31-35', 2, 9.4, 0],
  ['31-35', 3, 11.7, 1],
  ['31-35', 4, 13.7, 1],
  ['31-35', 5, 15.7, 1],
  ['31-35', 6, 17.5, 1],
  ['31-35', 7, 19.2, 2],
  ['31-35', 8, 20.7, 2],
  ['31-35', 9, 22.1, 2],
  ['31-35', 10, 23.4, 2],
  ['31-35', 11, 24.5, 3],
  ['31-35', 12, 25.5, 3],
  ['31-35', 13, 26.3, 3],
  ['31-35', 14, 27.0, 3],
  ['31-35', 15, 27.5, 3],
  ['31-35', 16, 28.0, 3],

  ['36-40', 0, 5.6, 0],
  ['36-40', 1, 8.1, 0],
  ['36-40', 2, 10.5, 0],
  ['36-40', 3, 12.7, 1],
  ['36-40', 4, 14.8, 1],
  ['36-40', 5, 16.8, 1],
  ['36-40', 6, 18.6, 1],
  ['36-40', 7, 20.2, 2],
  ['36-40', 8, 21.8, 2],
  ['36-40', 9, 23.2, 2],
  ['36-40', 10, 24.4, 2],
  ['36-40', 11, 25.6, 3],
  ['36-40', 12, 26.5, 3],
  ['36-40', 13, 27.4, 3],
  ['36-40', 14, 28.1, 3],
  ['36-40', 15, 28.6, 3],
  ['36-40', 16, 29.0, 3],

  ['41-45', 0, 6.7, 0],
  ['41-45', 1, 9.2, 0],
  ['41-45', 2, 11.5, 0],
  ['41-45', 3, 13.8, 0],
  ['41-45', 4, 15.9, 1],
  ['41-45', 5, 17.8, 1],
  ['41-45', 6, 19.6, 1],
  ['41-45', 7, 21.3, 1],
  ['41-45', 8, 22.8, 2],
  ['41-45', 9, 24.7, 2],
  ['41-45', 10, 25.5, 2],
  ['41-45', 11, 26.6, 2],
  ['41-45', 12, 27.6, 3],
  ['41-45', 13, 28.4, 3],
  ['41-45', 14, 29.1, 3],
  ['41-45', 15, 29.7, 3],
  ['41-45', 16, 30.1, 3],

  ['46-50', 0, 7.7, 0],
  ['46-50', 1, 10.2, 0],
  ['46-50', 2, 12.6, 0],
  ['46-50', 3, 14.8, 0],
  ['46-50', 4, 16.9, 1],
  ['46-50', 5, 18.9, 1],
  ['46-50', 6, 20.7, 1],
  ['46-50', 7, 22.4, 1],
  ['46-50', 8, 23.9, 2],
  ['46-50', 9, 25.3, 2],
  ['46-50', 10, 26.6, 2],
  ['46-50', 11, 27.7, 2],
  ['46-50', 12, 28.7, 3],
  ['46-50', 13, 29.5, 3],
  ['46-50', 14, 30.2, 3],
  ['46-50', 15, 30.7, 3],
  ['46-50', 16, 31.2, 3],

  ['51-55', 0, 8.8, 0],
  ['51-55', 1, 11.3, 0],
  ['51-55', 2, 13.7, 0],
  ['51-55', 3, 15.9, 0],
  ['51-55', 4, 18.0, 1],
  ['51-55', 5, 20.0, 1],
  ['51-55', 6, 21.8, 1],
  ['51-55', 7, 23.4, 1],
  ['51-55', 8, 25.0, 2],
  ['51-55', 9, 26.4, 2],
  ['51-55', 10, 27.6, 2],
  ['51-55', 11, 28.7, 2],
  ['51-55', 12, 29.7, 3],
  ['51-55', 13, 30.6, 3],
  ['51-55', 14, 31.2, 3],
  ['51-55', 15, 31.8, 3],
  ['51-55', 16, 32.2, 3],

  ['56 & UP', 0, 9.9, 0],
  ['56 & UP', 1, 12.4, 0],
  ['56 & UP', 2, 14.7, 0],
  ['56 & UP', 3, 17.0, 0],
  ['56 & UP', 4, 19.1, 1],
  ['56 & UP', 5, 21.0, 1],
  ['56 & UP', 6, 22.8, 1],
  ['56 & UP', 7, 24.5, 1],
  ['56 & UP', 8, 26.0, 2],
  ['56 & UP', 9, 27.4, 2],
  ['56 & UP', 10, 28.7, 2],
  ['56 & UP', 11, 29.8, 2],
  ['56 & UP', 12, 30.8, 2],
  ['56 & UP', 13, 31.6, 3],
  ['56 & UP', 14, 32.3, 3],
  ['56 & UP', 15, 32.9, 3],
  ['56 & UP', 16, 33.3, 3]
];

function create_pie_chart(palette) {
  var chart = anychart.pie(data_set_1);
  if (palette) chart.palette(palette);
  chart.labels().position('outside');
  return chart;
}
function create_donut_chart(palette) {
  var chart = anychart.pie(data_set_1);
  chart.innerRadius('30%');
  chart.title('Distribution of Fruit by Profitability');
  if (palette) chart.palette(palette);
  chart.labels().position('inside');
  return chart;
}
function create_pyramid_chart(palette) {
  var chart = anychart.pyramid(data_set_1);
  if (palette) chart.palette(palette);
  chart.labels().position('inside');
  return chart;
}
function create_funnel_chart(palette) {
  var chart = anychart.funnel(data_set_1);
  if (palette) chart.palette(palette);
  chart.labels().position('outside');
  return chart;
}
function create_bar_chart(palette) {
  var chart = anychart.bar();
  if (palette) chart.palette(palette);
  chart.bar(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  return chart;
}
function create_area_chart(palette) {
  var chart = anychart.area();
  chart.yScale().stackMode('percent');
  if (palette) chart.palette(palette);
  chart.area(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  chart.area(data_set_2.mapAs({x: [0], value: [2]})).name('Pears');
  chart.area(data_set_2.mapAs({x: [0], value: [3]})).name('Peaches');
  return chart;
}
function create_column_chart(palette) {
  var chart = anychart.column();
  chart.title('Fruit Sales');
  chart.legend().enabled(true);
  if (palette) chart.palette(palette);
  chart.grid().enabled(true);
  chart.grid(1).enabled(true).layout('v');
  chart.minorGrid().enabled(true);
  chart.xAxis().ticks().enabled(true);
  chart.yAxis().ticks().enabled(true);
  chart.yAxis().minorTicks().enabled(true);
  chart.column(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  chart.column(data_set_2.mapAs({x: [0], value: [2]})).name('Pears');
  return chart;
}
function create_line_chart(palette, seriesCount) {
  var chart = anychart.line();
  chart.legend().enabled(true);
  if (palette) chart.palette(palette);
  if (!seriesCount) seriesCount = 10;
  for (var i = 0; i < seriesCount; i++) {
    chart.line(data_set_2.mapAs({x: [0], value: [i + 1]})).name(seriesNames[i]);
  }
  return chart;
}
function create_3D_pie_chart(palette) {
  var chart = anychart.pie3d(data_set_1);
  chart.innerRadius('30%');
  if (palette) chart.palette(palette);
  chart.labels().position('outside');
  return chart;
}
function create_3D_bar_chart(palette) {
  var chart = anychart.bar3d();
  if (palette) chart.palette(palette);
  chart.bar(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');

  return chart;
}
function create_3D_area_chart(palette) {
  var chart = anychart.area3d();
  if (palette) chart.palette(palette);
  chart.area(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  return chart;
}
function create_3D_column_chart(palette) {
  var chart = anychart.column3d();
  chart.title('Fruit Sales');
  chart.legend().enabled(true);
  if (palette) chart.palette(palette);
  chart.column(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  chart.column(data_set_2.mapAs({x: [0], value: [2]})).name('Pears');

  return chart;
}
function create_marker_chart(palette, seriesCount) {
  var chart = anychart.scatter();
  if (palette) chart.palette(palette);
  if (!seriesCount) seriesCount = 10;
  chart.title('April Fruit Sales');
  chart.xAxis().title('Price per kg, $');
  chart.yAxis().title('Amount of sold kgs');
  for (var i = 0; i < seriesCount; i++) {
    chart.marker(data_set_2.mapAs({x: [i + 1], value: [11]})).name(seriesNames[i]);
  }
  return chart;
}
function create_bubble_chart(palette) {
  var chart = anychart.scatter();
  if (palette) chart.palette(palette);
  chart.bubble(data_set_2.mapAs({x: [1], value: [11], size: [12]})).name('Apples');
  chart.bubble(data_set_2.mapAs({x: [2], value: [11], size: [12]})).name('Pears');
  return chart;
}

function create_box_chart(palette) {
  var chart = anychart.box();
  chart.title('April Fruits Sales');
  if (palette) chart.palette(palette);
  chart.box(data_set_3).name('April Sales');
  return chart;
}
function create_error_chart(palette) {
  var chart = anychart.marker();
  if (palette) chart.palette(palette);
  chart.marker(data_set_4.mapAs({
    name: [0],
    x: [2],
    value: [1],
    xLowerError: [3],
    xUpperError: [4],
    valueLowerError: [5],
    valueUpperError: [6]
  })).name('April Sales');
  return chart;
}
function create_polar_line_chart(palette) {
  var chart = anychart.polar();
  if (palette) chart.palette(palette);
  chart.line([[0, 0], [10, 1], [20, 2], [30, 3], [40, 4], [50, 5], [60, 6], [70, 7], [80, 8], [90, 9], [100, 10]])
      .closed(false).name('April Sales').markers().enabled(true);
  return chart;
}
function create_polar_marker_chart(palette) {
  var chart = anychart.polar();
  if (palette) chart.palette(palette);
  chart.marker(data_set_2.mapAs({x: [11], value: [1]})).name('Apples');
  chart.marker(data_set_2.mapAs({x: [11], value: [2]})).name('Oranges');
  chart.marker(data_set_2.mapAs({x: [11], value: [3]})).name('Peaches');
  return chart;
}
function create_radar_line_chart(palette) {
  var chart = anychart.radar();
  if (palette) chart.palette(palette);
  chart.line(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  chart.line(data_set_2.mapAs({x: [0], value: [2]})).name('Oranges');
  chart.line(data_set_2.mapAs({x: [0], value: [3]})).name('Peaches');
  return chart;
}
function create_radar_area_chart(palette) {
  var chart = anychart.radar();
  if (palette) chart.palette(palette);
  chart.area(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
  chart.area(data_set_2.mapAs({x: [0], value: [2]})).name('Oranges');
  chart.area(data_set_2.mapAs({x: [0], value: [3]})).name('Peaches');
  chart.yScale().stackMode('percent');
  return chart;
}
function create_choropleth_map(palette) {
  var filterConstructor = function(target) {
    return function(val) {
      return val == target;
    }
  };
  var chart = anychart.map();
  chart.geoData(anychart.maps['austria']);
  if (palette) chart.palette(palette);
  chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('1'))).name('First');
  chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('2'))).name('Second');
  chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('3'))).name('Third');
  chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('4'))).name('Forth');
  chart.legend().enabled(true);
  return chart;
}
function create_choropleth_range_map(palette) {
  var chart = anychart.map();
  chart.geoData(anychart.maps['austria']);
  if (palette) chart.palette(palette);
  var series = chart.choropleth(dataSet_austria_map_1);
  series.colorScale(anychart.scales.linearColor());
  var colorRange = chart.colorRange();
  colorRange.enabled(true);
  return chart;
}

function create_bubble_markers_map(palette) {
  var chart = anychart.map();
  if (palette) chart.palette(palette);
  chart.title('Bubble & Marker Series');
  chart.geoData(anychart.maps['austria']);
  chart.minBubbleSize(7);
  chart.maxBubbleSize(20);
  chart.bubble(dataSet_austria_map_2);
  return chart;
}
function create_connector_map(palette) {
  var chart = anychart.connector();
  chart.geoData(anychart.maps['austria']);
  if (palette) chart.palette(palette);
  chart.marker(dataSet_austria_map_3);
  chart.connector(dataSet_austria_map_4)
    //todo: remove this line after Sergey M fix the issue
      .hoverMarkers().enabled(true).size(15);
  return chart;
}
function create_sparkline(data, type, palette) {
  var chart_data = data['profitTrend'];
  if (chart_data) var chart = anychart.sparkline(chart_data);
  else chart = anychart.sparkline(data);
  chart.type(type);
  return chart;
}
function create_bullet(data, palette) {
  var target = eval(data['toGoal'].join('+'));
  var actual = eval(data['actualSales'].join('+'));
  return anychart.bullet([
    {value: Math.round(actual), type: 'bar'},
    {value: Math.round(target), 'type': 'line'}
  ]);
}

function create_bullet_range(data, palette) {
  var target = eval(data['toGoal'].join('+'));
  var actual = eval(data['actualSales'].join('+'));
  var bullet = anychart.bullet([
    {value: Math.round(actual), 'type': 'x'},
    {value: Math.round(target), 'type': 'ellipse'}
  ]);
  bullet.range().from(0).to(Math.round(target) * 2 / 5);
  bullet.range(1).from(Math.round(target) * 2 / 5).to(Math.round(target) * 3 / 5);
  bullet.range(2).from(Math.round(target) * 3 / 5).to(Math.round(target) * 4 / 5);
  bullet.range(3).from(Math.round(target) * 4 / 5).to(Math.round(target) + 2);
  bullet.range(4).from(Math.round(target) + 2).to(37);
  return bullet;
}

function create_sparkline_area(palette) {
  var table = anychart.ui.table();
  table.cellPadding(0).cellBorder(anychart.theme().defaultBackground.fill);
  table.contents([
    [create_sparkline(table_data['Alabama'], 'area', palette)],
    [create_sparkline(table_data['Alaska'], 'area', palette)],
    [create_sparkline(table_data['Arizona'], 'area', palette)],
    [create_sparkline(table_data['Idaho'], 'area', palette)],
    [create_sparkline(table_data['Illinois'], 'area', palette)],
    [create_sparkline(table_data['Indiana'], 'area', palette)],
    [create_sparkline(table_data['Ohio'], 'area', palette)],
    [create_sparkline(table_data['Oklahoma'], 'area', palette)],
    [create_sparkline(table_data['Oregon'], 'area', palette)],
    [create_sparkline(table_data['Vermont'], 'area', palette)],
    [create_sparkline(table_data['Virginia'], 'area', palette)],
    [create_sparkline(table_data['Washington'], 'area', palette)]
  ]);
  return table;
}
function create_sparkline_column(palette) {
  var table = anychart.ui.table();
  table.cellPadding(0).cellBorder(anychart.theme().defaultBackground.fill);
  table.contents([
    [create_sparkline(table_data['Alabama'], 'column', palette), create_sparkline(table_data['Ohio'], 'column', palette)],
    [create_sparkline(table_data['Alaska'], 'column', palette), create_sparkline(table_data['Oklahoma'], 'column', palette)],
    [create_sparkline(table_data['Arizona'], 'column', palette), create_sparkline(table_data['Oregon'], 'column', palette)],
    [create_sparkline(table_data['Idaho'], 'column', palette), create_sparkline(table_data['Vermont'], 'column', palette)],
    [create_sparkline(table_data['Illinois'], 'column', palette), create_sparkline(table_data['Virginia'], 'column', palette)],
    [create_sparkline(table_data['Indiana'], 'column', palette), create_sparkline(table_data['Washington'], 'column', palette)]
  ]);
  return table;
}
function create_sparkline_line(palette) {
  var table = anychart.ui.table();
  table.cellPadding(0).cellBorder(anychart.theme().defaultBackground.fill);
  table.contents([
    [create_sparkline(table_data['Alabama'], 'line', palette)],
    [create_sparkline(table_data['Alaska'], 'line', palette)],
    [create_sparkline(table_data['Arizona'], 'line', palette)],
    [create_sparkline(table_data['Idaho'], 'line', palette)],
    [create_sparkline(table_data['Illinois'], 'line', palette)],
    [create_sparkline(table_data['Indiana'], 'line', palette)],
    [create_sparkline(table_data['Ohio'], 'line', palette)],
    [create_sparkline(table_data['Oklahoma'], 'line', palette)],
    [create_sparkline(table_data['Oregon'], 'line', palette)],
    [create_sparkline(table_data['Vermont'], 'line', palette)],
    [create_sparkline(table_data['Virginia'], 'line', palette)],
    [create_sparkline(table_data['Washington'], 'line', palette)]
  ]);
  return table;
}
function create_sparkline_win_loss(palette) {
  var table = anychart.ui.table();
  table.cellPadding(0).cellBorder(anychart.theme().defaultBackground.fill);
  table.contents([
    [create_sparkline(t1, 'winLoss', palette)],
    [create_sparkline(t2, 'winLoss', palette)],
    [create_sparkline(t3, 'winLoss', palette)],
    [create_sparkline(t4, 'winLoss', palette)],
    [create_sparkline(t5, 'winLoss', palette)],
    [create_sparkline(t6, 'winLoss', palette)],
    [create_sparkline(t7, 'winLoss', palette)],
    [create_sparkline(t8, 'winLoss', palette)],
    [create_sparkline(t9, 'winLoss', palette)],
    [create_sparkline(t10, 'winLoss', palette)],
    [create_sparkline(t11, 'winLoss', palette)],
    [create_sparkline(t12, 'winLoss', palette)]
  ]);
  return table;
}
function create_bullet_chart(palette) {
  var table = anychart.ui.table();
  table.cellPadding(0).cellBorder(anychart.theme().defaultBackground.fill);
  table.contents([
    [create_bullet(table_data['Alabama'], palette)],
    [create_bullet(table_data['Alaska'], palette)],
    [create_bullet(table_data['Arizona'], palette)],
    [create_bullet(table_data['Idaho'], palette)],
    [create_bullet(table_data['Illinois'], palette)]
  ]);
  return table;
}
function create_bullet_range_chart(palette) {
  var table = anychart.ui.table();
  table.cellPadding(0).cellBorder(anychart.theme().defaultBackground.fill);
  table.contents([
    [create_bullet_range(table_data['Alabama'], palette)],
    [create_bullet_range(table_data['Alaska'], palette)],
    [create_bullet_range(table_data['Arizona'], palette)],
    [create_bullet_range(table_data['Idaho'], palette)],
    [create_bullet_range(table_data['Illinois'], palette)]
  ]);
  return table;
}
function create_heat_map_color_scaled(palette) {
  var chart = anychart.heatMap([
    {x: 'Rare', y: 'Insignificant', heat: 0},
    {x: 'Rare', y: 'Minor', heat: 0},
    {x: 'Rare', y: 'Moderate', heat: 0},
    {x: 'Rare', y: 'Major', heat: 0},
    {x: 'Rare', y: 'Extreme', heat: 0},
    {x: 'Unlikely', y: 'Insignificant', heat: 0},
    {x: 'Unlikely', y: 'Minor', heat: 0},
    {x: 'Unlikely', y: 'Moderate', heat: 0},
    {x: 'Unlikely', y: 'Major', heat: 1},
    {x: 'Unlikely', y: 'Extreme', heat: 1},
    {x: 'Possible', y: 'Insignificant', heat: 0},
    {x: 'Possible', y: 'Minor', heat: 0},
    {x: 'Possible', y: 'Moderate', heat: 1},
    {x: 'Possible', y: 'Major', heat: 1},
    {x: 'Possible', y: 'Extreme', heat: 1},
    {x: 'Likely', y: 'Insignificant', heat: 0},
    {x: 'Likely', y: 'Minor', heat: 1},
    {x: 'Likely', y: 'Moderate', heat: 1},
    {x: 'Likely', y: 'Major', heat: 2},
    {x: 'Likely', y: 'Extreme', heat: 2},
    {x: 'Almost\nCertain', y: 'Insignificant', heat: 0},
    {x: 'Almost\nCertain', y: 'Minor', heat: 1},
    {x: 'Almost\nCertain', y: 'Moderate', heat: 1},
    {x: 'Almost\nCertain', y: 'Major', heat: 2},
    {x: 'Almost\nCertain', y: 'Extreme', heat: 3}
  ]);
  var scale = anychart.scales.linearColor();
  chart.colorScale(scale);
  // todo: make it possible:
  //var colorRange = chart.colorRange();
  //colorRange.enabled(true);
  return chart;
}
function create_heat_map(palette) {
  var chart = anychart.heatMap(anychart.data.set(data_for_heat_map).mapAs({y: [0], x: [1], value: [2], heat: [3]}));
  var colorScale = chart.colorScale();
  colorScale.ranges([
    {equal: 0, name: 'Lean'},
    {equal: 1, name: 'Ideal'},
    {equal: 2, name: 'Average'},
    {equal: 3, name: 'Above average'}
  ]);
  chart.colorScale(colorScale);

  chart.xScroller().enabled(true);
  chart.yScroller().enabled(true);
  chart.xZoom().setToPointsCount(8);
  chart.yZoom().setToPointsCount(6);

  chart.legend().enabled(true);
  return chart;
}
function create_tree_map(palette) {
  var data = anychart.data.tree([
    {id: 'Cosmetics', parent: null},
      {id: 'Decorative Cosmetics', parent: 'Cosmetics'},
        {id: 'Powder', parent: 'Decorative Cosmetics', value: 20},
        {id: 'Foundation', parent: 'Decorative Cosmetics', value: 30},
        {id: 'Rouge', parent: 'Decorative Cosmetics', value: 15},
        {id: 'Pomade', parent: 'Decorative Cosmetics', value: 55},
        {id: 'Lip gloss', parent: 'Decorative Cosmetics', value: 45},
        {id: 'Lip pencil', parent: 'Decorative Cosmetics', value: 50},
        {id: 'Mascara', parent: 'Decorative Cosmetics', value: 35},
        {id: 'Eyeliner', parent: 'Decorative Cosmetics', value: 70},
        {id: 'Eye shadow', parent: 'Decorative Cosmetics', value: 105},

      {id: 'Face-care Cosmetics', parent: 'Cosmetics'},
        {id: 'Balm Cream', parent: 'Face-care Cosmetics'},
        {id: 'Creams', parent: 'Face-care Cosmetics', value: 40},
        {id: 'Day-care Cream', parent: 'Face-care Cosmetics', value: 30},
        {id: 'Night-care Cream', parent: 'Face-care Cosmetics', value: 40},

      {id: 'Body-care Cosmetics', parent: 'Cosmetics'},
        {id: 'Shampoo', parent: 'Body-care Cosmetics', value: 30},
        {id: 'Hair Balm', parent: 'Body-care Cosmetics', value: 40},
        {id: 'Moisturizer', parent: 'Body-care Cosmetics', value: 10}

  ], anychart.enums.TreeFillingMethod.AS_TABLE);
  var chart = anychart.treeMap(data);
  chart.hintDepth(0);
  chart.maxDepth(2);
  chart.container('container');
  chart.legend().enabled(true);
  return chart;
}

function create_tree_map_with_color_range(palette) {
  var data = anychart.data.tree([
    {id: 'Cosmetics', parent: null},
      {id: 'Decorative Cosmetics', parent: 'Cosmetics'},
        {id: 'Masking Cosmetics', parent: 'Decorative Cosmetics'},
          {id: 'Powder', parent: 'Masking Cosmetics', value: 20},
          {id: 'Foundation', parent: 'Masking Cosmetics', value: 30},
          {id: 'Rouge', parent: 'Masking Cosmetics', value: 15},
        {id: 'Lips Cosmetics', parent: 'Decorative Cosmetics'},
          {id: 'Pomade', parent: 'Lips Cosmetics', value: 55},
          {id: 'Lip gloss', parent: 'Lips Cosmetics', value: 45},
          {id: 'Lip pencil', parent: 'Lips Cosmetics', value: 50},
        {id: 'Eye Cosmetics', parent: 'Decorative Cosmetics'},
          {id: 'Mascara', parent: 'Eye Cosmetics', value: 35},
          {id: 'Eyeliner', parent: 'Eye Cosmetics', value: 70},
          {id: 'Eye shadow', parent: 'Eye Cosmetics', value: 105},

      {id: 'Face-care Cosmetics', parent: 'Cosmetics'},
        {id: 'Balm Cream', parent: 'Face-care Cosmetics'},

      {id: 'Creams', parent: 'Face-care Cosmetics', value: 400},
        {id: 'Day-care Cream', parent: 'Face-care Cosmetics', value: 300},
        {id: 'Night-care Cream', parent: 'Face-care Cosmetics', value: 400},

      {id: 'Body-care Cosmetics', parent: 'Cosmetics'},
        {id: 'Skin-care', parent: 'Body-care Cosmetics', value: 400},
        {id: 'Hair-care', parent: 'Body-care Cosmetics'},
          {id: 'Shampoo', parent: 'Hair-care', value: 300},
          {id: 'Hair Balm', parent: 'Hair-care', value: 400},
          {id: 'Moisturizer', parent: 'Skin-care', value: 100}
  ], anychart.enums.TreeFillingMethod.AS_TABLE);
  var chart = anychart.treeMap(data);
  chart.container('container');
  var colorRange = chart.colorRange();
  colorRange.enabled(true);

  chart.title('Profit from Cosmetics Sales. ACME corp.').enabled(true);
  return chart;
}

function create_ohlc(palette) {
  var chart = anychart.financial();
  chart.ohlc([
    {x: Date.UTC(2007, 7, 28), open: 511.53, high: 514.98, low: 505.79, close: 506.40},
    {x: Date.UTC(2007, 7, 29), open: 507.84, high: 513.30, low: 507.23, close: 512.88},
    {x: Date.UTC(2007, 7, 30), open: 512.36, high: 515.40, low: 510.58, close: 511.40},
    {x: Date.UTC(2007, 7, 31), open: 513.10, high: 516.50, low: 511.47, close: 515.25},
    {x: Date.UTC(2007, 8, 4), open: 515.02, high: 528.00, low: 514.62, close: 525.15}
  ]);
  return chart;
}

function create_candlestick(palette) {
  var chart = anychart.financial();
  chart.candlestick([
    {x: Date.UTC(2007, 7, 28), open: 511.53, high: 514.98, low: 505.79, close: 506.40},
    {x: Date.UTC(2007, 7, 29), open: 507.84, high: 513.30, low: 507.23, close: 512.88},
    {x: Date.UTC(2007, 7, 30), open: 512.36, high: 515.40, low: 510.58, close: 511.40},
    {x: Date.UTC(2007, 7, 31), open: 513.10, high: 516.50, low: 511.47, close: 515.25},
    {x: Date.UTC(2007, 8, 4), open: 515.02, high: 528.00, low: 514.62, close: 525.15}
  ]);
  return chart;
}

var currentPalette, currentSeriesCount, currentTheme, currentTypes;
var chart1, chart2, chart3, chart4;
var stage1, stage2, stage3, stage4;
function disposeCharts() {
  chart1.dispose();
  chart2.dispose();
  chart3.dispose();
  chart4.dispose();
}
function createStages() {
  stage1 = acgraph.create('container-chart-1');
  stage2 = acgraph.create('container-chart-2');
  stage3 = acgraph.create('container-chart-3');
  stage4 = acgraph.create('container-chart-4');
}
function updateCharts(pallete, chartTypes, seriesCount) {
  if (chartTypes == 'area-line-bar-column') {
    chart1 = create_bar_chart(pallete).container(stage1).draw();
    chart2 = create_area_chart(pallete).container(stage2).draw();
    chart3 = create_column_chart(pallete).container(stage3).draw();
    chart4 = create_line_chart(pallete, seriesCount).container(stage4).draw();
  }
  else if (chartTypes == 'pie-donut-funnel-pyramid') {
    chart1 = create_pie_chart(pallete).container(stage1).draw();
    chart2 = create_donut_chart(pallete).container(stage2).draw();
    chart3 = create_pyramid_chart(pallete).container(stage3).draw();
    chart4 = create_funnel_chart(pallete).container(stage4).draw();
  }
  else if (chartTypes == '3d') {
    chart1 = create_3D_pie_chart(pallete).container(stage1).draw();
    chart2 = create_3D_area_chart(pallete).container(stage2).draw();
    chart3 = create_3D_bar_chart(pallete).container(stage3).draw();
    chart4 = create_3D_column_chart(pallete).container(stage4).draw();
  }
  else if (chartTypes == 'marker-bubble-box-error') {
    chart1 = create_marker_chart(pallete, seriesCount).container(stage1).draw();
    chart2 = create_bubble_chart(pallete).container(stage2).draw();
    chart3 = create_box_chart(pallete).container(stage3).draw();
    chart4 = create_error_chart(pallete).container(stage4).draw();
  }
  else if (chartTypes == 'polar-radar') {
    chart1 = create_polar_line_chart(pallete).container(stage1).draw();
    chart2 = create_polar_marker_chart(pallete).container(stage2).draw();
    chart3 = create_radar_line_chart(pallete).container(stage3).draw();
    chart4 = create_radar_area_chart(pallete).container(stage4).draw();
  }
  else if (chartTypes == 'maps') {
    chart1 = create_choropleth_map(pallete).container(stage1).draw();
    chart2 = create_choropleth_range_map(pallete).container(stage2).draw();
    chart3 = create_bubble_markers_map(pallete).container(stage3).draw();
    chart4 = create_connector_map(pallete).container(stage4).draw();
  }
  else if (chartTypes == 'sparklines') {
    chart1 = create_sparkline_area(pallete).container(stage1).draw();
    chart2 = create_sparkline_column(pallete).container(stage2).draw();
    chart3 = create_sparkline_line(pallete).container(stage3).draw();
    chart4 = create_sparkline_win_loss(pallete).container(stage4).draw();
  }
  else if (chartTypes == 'bullet-financial') {
    chart1 = create_bullet_chart(pallete).container(stage1).draw();
    chart2 = create_bullet_range_chart(pallete).container(stage2).draw();
    chart3 = create_candlestick(pallete).container(stage3).draw();
    chart4 = create_ohlc(pallete).container(stage4).draw();
  }
  else if (chartTypes == 'tree-map-heat-map') {
    chart1 = create_tree_map(pallete).container(stage1).draw();
    chart2 = create_tree_map_with_color_range(pallete).container(stage2).draw();
    chart3 = create_heat_map(pallete).container(stage3).draw();
    chart4 = create_heat_map_color_scaled(pallete).container(stage4).draw();
  }
}
function update() {
  var theme = $('#themes-select').val().split('|')[0];
  var chartTypes = $('#chart-types-select').val();
  var paletteName = $('#palettes-select').val();
  var palette = anychart.palettes[paletteName];
  var seriesCount = (paletteName == 'monochrome') ? 5 : 10;
  if (theme != currentTheme || palette != currentPalette || chartTypes != currentTypes || seriesCount != seriesCount) {
    currentPalette = palette;
    currentSeriesCount = seriesCount;
    currentTheme = theme;
    currentTypes = chartTypes;
    if (chart1 && chart2 && chart3 && chart4) disposeCharts();
    anychart.theme(theme);
    updateCharts(palette, chartTypes, seriesCount);
  }
}

$(function() {
  createStages();
  update();
  $('#themes-select').on('change', function() {
    var themePalette = $('#themes-select').val().split('|')[1];
    var paletteSelect = $('#palettes-select');
    paletteSelect.val(themePalette);
    //paletteSelect.selectpicker('refresh');
    update();
  });
  $('select').on('change', function() {
    update();
  });
});

$(window).resize(function() {
  update();
});
