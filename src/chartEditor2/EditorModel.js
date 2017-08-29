goog.provide('anychart.chartEditor2Module.EditorModel');

goog.require('goog.events.EventTarget');


/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
anychart.chartEditor2Module.EditorModel = function() {
  goog.base(this);

  this.data_ = {};

  this.preparedData_ = [];

  this.generateInitialMappingsOnChangeView_ = true;

  this.model_ = {
    dataSettings: {
      active: null,
      activeGeo: null,
      field: null,
      mappings: [
        // [ // plot
        //   {ctl: 'line', mapping: {value: 1}},
        //   {ctl: 'column', mapping: {value: 2}}
        // ]
      ]
    },
    chart: {
      type: null,
      seriesType: null,
      settings: {
        //'getSeriesAt(0).name()': 'my series'
      }
    }
  };

  this.fieldsState_ = {};

  this.suspendQueue_ = 0;
};
goog.inherits(anychart.chartEditor2Module.EditorModel, goog.events.EventTarget);


/**
 * @typedef {Array.<(Array|String)>}
 */
anychart.chartEditor2Module.EditorModel.Key;


// region Structures
anychart.chartEditor2Module.EditorModel.chartTypes = {
  'line': {
    'value': 'line',
    'name': 'Line',
    'icon': 'line-chart-1.svg', // 'http://www.anychart.com/_design/img/upload/charts/types/'
    'series': ['line', 'spline', 'column', 'area', 'ohlc'], // first value is default
    'dataSetCtor': 'set'
  },
  'area': {
    'value': 'area',
    'name': 'Area',
    'icon': 'area-chart.svg',
    'series': ['area', 'line', 'spline', 'column', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'area-stacked-value': {
    'value': 'area',
    'stackMode': 'value',
    'name': 'Area stacked (value)',
    'icon': 'stacked-area-chart.svg',
    'series': ['area', 'line', 'spline', 'column', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'area-stacked-percent': {
    'value': 'area',
    'stackMode': 'percent',
    'name': 'Area stacked (percent)',
    'icon': 'percent-stacked-area-chart.svg',
    'series': ['area', 'line', 'spline', 'column', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'bar': {
    'value': 'bar',
    'name': 'Bar',
    'icon': 'bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'bar-stacked-value': {
    'value': 'bar',
    'stackMode': 'value',
    'name': 'Bar stacked (value)',
    'icon': 'stacked-bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'bar-stacked-percent': {
    'value': 'bar',
    'stackMode': 'percent',
    'name': 'Bar stacked (percent)',
    'icon': 'percent-stacked-bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'column': {
    'value': 'column',
    'name': 'Column',
    'icon': 'column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'column-stacked-value': {
    'value': 'column',
    'stackMode': 'value',
    'name': 'Column stacked (value)',
    'icon': 'stacked-column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'column-stacked-percent': {
    'value': 'column',
    'stackMode': 'percent',
    'name': 'Column stacked (percent)',
    'icon': 'percent-stacked-step-line-area-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'ohlc'],
    'dataSetCtor': 'set'
  },
  'scatter': {
    'value': 'scatter',
    'name': 'Scatter',
    'icon': 'scatter-chart.svg',
    'series': ['marker', 'bubble', 'line'],
    'dataSetCtor': 'set'
  },
  'pie': {
    'value': 'pie',
    'name': 'Pie',
    'icon': 'pie-chart.svg',
    'series': ['pie'],
    'dataSetCtor': 'set'
  },
  'map': {
    'value': 'map',
    'name': 'Map',
    'icon': 'choropleth-map.svg',
    'series': ['marker-by-id', 'marker-by-coordinates', 'bubble-by-id', 'bubble-by-coordinates', 'choropleth'],
    'dataSetCtor': 'set'
  },
  'stock': {
    'value': 'stock',
    'name': 'Stock',
    'icon': 'stock-chart.svg',
    'series': ['ohlc', 'candlestick', 'line', 'spline', 'column', 'area'],
    'dataSetCtor': 'table'
  }
};


anychart.chartEditor2Module.EditorModel.series = {
  'line': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'spline': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'column': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'bar': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'area': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'ohlc': {
    'fields': [
      {'field': 'open'},
      {'field': 'high'},
      {'field': 'low'},
      {'field': 'close'}]
  },
  'candlestick': {
    'fields': [
      {'field': 'open'},
      {'field': 'high'},
      {'field': 'low'},
      {'field': 'close'}]
  },
  'pie': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'marker': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'bubble': {
    'fields': [
      {'field': 'value', 'name': 'Value'},
      {'field': 'size', 'name': 'Size'}]
  },
  // map series
  'marker-by-id': {
    'name': 'Marker (by geoId field)',
    'fields': [
      {'field': 'geoIdField', 'name': 'GeoId Field'},
      {'field': 'value', 'name': 'Value'}
    ]
  },
  'marker-by-coordinates': {
    'name': 'Marker (by coordinates)',
    'fields': [
      {'field': 'lat', 'name': 'Latitude'},
      {'field': 'long', 'name': 'Longitude'},
      {'field': 'value', 'name': 'Value'}
    ]
  },
  'bubble-by-id': {
    'name': 'Bubble (by geoId field)',
    'fields': [
      {'field': 'geoIdField', 'name': 'GeoId Field'},
      {'field': 'size', 'name': 'Size'}
      // {'field': 'value', 'name': 'Value'}
    ]
  },
  'bubble-by-coordinates': {
    'name': 'Bubble (by coordinates)',
    'fields': [
      {'field': 'lat', 'name': 'Latitude'},
      {'field': 'long', 'name': 'Longitude'},
      {'field': 'size', 'name': 'Size'}
      // {'field': 'value', 'name': 'Value'}
    ]
  },
  'choropleth': {
    'fields': [
      {'field': 'geoIdField', 'name': 'GeoId Field'},
      {'field': 'value', 'name': 'Value'}
    ]
  },
  // 'connector': {'fields': [{'field': 'value', 'name': 'Y Value'}]}
};


anychart.chartEditor2Module.EditorModel.consistencyObject = {
  'chart': {
    'ctor': ''
  },
  'plot': [{
    'mapping': {'x': ''},

    'series': [{
      'ctor': '',
      'mapping': {}
    }]
  }]
};
// endregion


// region Model initialization
anychart.chartEditor2Module.EditorModel.prototype.chooseActiveGeo = function(opt_activeGeo) {
  var activeGeo = null;

  if (goog.isDefAndNotNull(opt_activeGeo)) {
    activeGeo = opt_activeGeo;
  } else {
    for (var i in this.data_) {
      if (this.data_[i]['type'] == anychart.chartEditor2Module.EditorModel.dataType.GEO) {
        activeGeo = this.data_[i]['setFullId'];
        break;
      }
    }
  }

  this.model_.dataSettings.activeGeo = activeGeo;
};


anychart.chartEditor2Module.EditorModel.prototype.chooseActiveAndField = function(opt_active, opt_field) {
  this.dropChartSettings();

  var preparedData = this.getPreparedData();
  var active = goog.isDefAndNotNull(opt_active) ? opt_active : preparedData[0]['setFullId'];
  var field = goog.isDefAndNotNull(opt_field) ? opt_field : preparedData[0]['fields'][0]['key'];

  this.model_.dataSettings.active = active;
  this.model_.dataSettings.field = field;

  this.fieldsState_ = {
    'count': 0,
    'stringsCount': 0,
    'numbersCount': 0,
    'coordinates': [],
    'strings': [],
    'numbers': []
  };

  var rawData = this.getRawData();
  var dataRow = rawData[0];
  var fieldValue;
  var numberValue;

  for (var i in dataRow) {
    fieldValue = dataRow[i];
    numberValue = NaN;

    if (goog.isString(fieldValue)) {
      numberValue = this.fieldsState_['count'] > 0 ? goog.string.toNumber(fieldValue) : NaN;

      if (!this.fieldsState_['date'] && new Date(fieldValue).getTime()) {
        this.fieldsState_['date'] = [i, fieldValue];
        this.model_.dataSettings.field = i;
      }

      if (this.model_.dataSettings.activeGeo &&
          new RegExp(/^(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)$/).exec(fieldValue)) {
        this.fieldsState_['geoIdField'] = [i, fieldValue];
      }

      this.fieldsState_['strings'].push([i, fieldValue]);
      this.fieldsState_['stringsCount']++;

    } else if (goog.isNumber(fieldValue) || !isNaN(numberValue)) {
      var usedAsCoordinate = false;
      if (this.model_.dataSettings.activeGeo) {
        if (this.fieldsState_['coordinates'].length < 2 && new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).exec(fieldValue)) {
          this.fieldsState_['coordinates'].push(i);
          usedAsCoordinate = true;
        }
      }

      if (!usedAsCoordinate) {
        this.fieldsState_['numbers'].push([i, fieldValue]);
        this.fieldsState_['numbersCount']++;
      }
    }
    this.fieldsState_['count']++;
  }
};


anychart.chartEditor2Module.EditorModel.prototype.chooseDefaultChartType = function() {
  var chartType = 'line';
  var rawData = this.getRawData();

  if (this.model_.dataSettings.activeGeo) {
    chartType = 'map';
  } else {
    if (this.fieldsState_['date']) {
      var fieldValue = this.fieldsState_['date'][1];
      if (fieldValue.length > 4)
        chartType = 'stock';
      else if (this.fieldsState_['numbersCount'] <= 3)
        chartType = 'column';
      else if (this.fieldsState_['numbersCount'] <= 5) {
        chartType = 'column';
        this.setStackMode('value');
      }

    } else if (this.fieldsState_['strings'][0]) {
      if (rawData.length <= 5 && this.fieldsState_['numbersCount'] == 1)
        chartType = 'pie';
      else if (this.fieldsState_['numbersCount'] <= 3)
        chartType = 'bar';
      else if (this.fieldsState_['numbersCount'] <= 5) {
        chartType = 'bar';
        this.setStackMode('value');
      }

    } else
      chartType = 'scatter';
  }

  this.model_.chart.type = chartType;
};


anychart.chartEditor2Module.EditorModel.prototype.chooseDefaultSeriesType = function() {
  var seriesType = anychart.chartEditor2Module.EditorModel.chartTypes[this.model_.chart.type]['series'][0];

  switch (this.model_.chart.type) {
    case 'map':
      if (this.fieldsState_['coordinates'].length == 2) {
        if (!(this.fieldsState_['numbersCount'] % 2))
          seriesType = 'bubble-by-coordinates';
        else
          seriesType = 'marker-by-coordinates';

      } else if (this.fieldsState_['geoIdField']) {
        if (!(this.fieldsState_['numbersCount'] % 2))
          seriesType = 'bubble-by-id';
        else
          seriesType = 'marker-by-id';
      }
      break;

    case 'stock':
      if (this.fieldsState_['numbersCount'] < 4 || this.fieldsState_['numbersCount'] > 5)
        seriesType = 'line';
      break;

    case 'scatter':
      if (!(this.fieldsState_['numbersCount'] % 3)) {
        seriesType = 'bubble';
      } else if (!(this.fieldsState_['numbersCount'] % 2)) {
        seriesType = 'marker';
      }
      break;
  }

  this.model_.chart.seriesType = seriesType;
};


anychart.chartEditor2Module.EditorModel.prototype.createDefaultMappings = function() {
  this.model_.dataSettings.mappings = [];

  if (this.model_.chart.type == 'stock') {
    this.model_.dataSettings.mappings = [this.createPlotMapping()];

    if (this.model_.chart.seriesType == 'ohlc' && this.fieldsState_['numbersCount'] == 5) {
      this.model_.chart.seriesType = 'column';
      this.model_.dataSettings.mappings.push(this.createPlotMapping());
      this.model_.chart.seriesType = 'ohlc';
    }
  }
  else
    this.model_.dataSettings.mappings = [this.createPlotMapping()];
};


/**
 * Creates plot mapping. Need active dataset and default series type to be chosen.
 * @return {[*]}
 */
anychart.chartEditor2Module.EditorModel.prototype.createPlotMapping = function() {
  var result = [];

  var rawData = this.getRawData();
  var dataRow = rawData[0];
  //console.log(dataRow, this.fieldsState_, this.model_.chart.type, this.model_.chart.seriesType);

  var numValues = 1;
  if (this.model_.chart.seriesType == 'bubble')
    numValues = 2;
  else if (this.model_.chart.seriesType == 'ohlc')
    numValues = 4;

  var plotIndex = this.model_.dataSettings.mappings.length;
  var numSeries;
  var fieldIndex;
  if (this.model_.chart.type == 'pie' ||
      (this.model_.chart.type == 'stock' && this.model_.chart.seriesType == 'column' && plotIndex == 1)) {
    // try to ser volume second plot
    numSeries = 1;
    fieldIndex = 4;
  } else
    numSeries = Math.floor(this.fieldsState_['numbersCount'] / numValues);

  for (var i = 0; i < numSeries; i += numValues) {
    var seriesConfig = this.createSeriesConfig(i, this.model_.chart.seriesType, void 0, fieldIndex);
    result.push(seriesConfig);
  }

  return result;
};


/**
 * Creates series config.
 * @param {number} index
 * @param {String} type Series type.
 * @param {String=} opt_id Series id.
 * @param {number=} opt_startFieldIndex Index of number to start from.
 * @return {{ctor: *, mapping: {}}}
 */
anychart.chartEditor2Module.EditorModel.prototype.createSeriesConfig = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  if (goog.isDef(opt_id))
    config['id'] = opt_id;

  var numbers = goog.array.clone(this.fieldsState_['numbers']);
  if (this.model_.chart.type == 'scatter')
    goog.array.splice(numbers, 0, 1); // remove x field for scatter

  var fields = anychart.chartEditor2Module.EditorModel.series[type]['fields'];
  for (var i = 0; i < fields.length; i++) {
    if (this.fieldsState_['geoIdField'] && fields[i]['field'] == 'geoIdField') {
      config['mapping'][fields[i]['field']] = this.fieldsState_['geoIdField'][0];

    } else if (this.fieldsState_['coordinates'] && (fields[i]['field'] == 'lat' || fields[i]['field'] == 'long')) {
      config['mapping'][fields[i]['field']] = (fields[i]['field'] == 'lat') ?
          this.fieldsState_['coordinates'][0] :
          this.fieldsState_['coordinates'][1];

    } else {
      var j = index + i + (goog.isNumber(opt_startFieldIndex) ? opt_startFieldIndex : 0);
      var numberIndex = numbers.length > j ? j : j % numbers.length;
      config['mapping'][fields[i]['field']] = numbers[numberIndex][0];
    }
  }
  return config;
};


anychart.chartEditor2Module.EditorModel.prototype.dropChartSettings = function(opt_pattern) {
  if (goog.isDef(opt_pattern)) {
    for (var key in this.model_.chart.settings) {
      if (key.indexOf(opt_pattern) >= 0) {
        delete this.model_.chart.settings[key];
      }
    }
  } else
    this.model_.chart.settings = {};
};
// endregion


// region Controls callback functions
anychart.chartEditor2Module.EditorModel.prototype.setActiveField = function(input) {
  var field = input.getValue();
  var active = input.getValue2();

  this.suspendDispatch();

  if (active != this.model_.dataSettings.active) {
    this.chooseActiveAndField(active, field);
    this.createDefaultMappings();

    this.dropChartSettings('getSeries');
    this.dispatchUpdate();

  } else if (field != this.model_.dataSettings.field) {
    this.model_.dataSettings.field = field;
    this.dispatchUpdate();
  }

  this.resumeDispatch();
};


anychart.chartEditor2Module.EditorModel.prototype.setActiveGeo = function(input) {
  var activeGeo = input.getValue();

  if (activeGeo != this.model_.dataSettings.activeGeo) {
    // this.dropChartSettings('getSeries');
    this.chooseActiveGeo(activeGeo);

    this.dispatchUpdate();
  }
};


anychart.chartEditor2Module.EditorModel.prototype.onChangeView = function() {
  if (this.generateInitialMappingsOnChangeView_) {
    this.generateInitialMappingsOnChangeView_ = false;
    this.getPreparedData();

    if (this.preparedData_.length > 0) {
      this.dropChartSettings();

      this.chooseActiveGeo();
      this.chooseActiveAndField();
      this.chooseDefaultChartType();
      this.chooseDefaultSeriesType();
      this.createDefaultMappings();
    } else {
      console.log("NO DATA");
    }
  }
};


anychart.chartEditor2Module.EditorModel.prototype.addPlot = function() {
  var mapping = this.createPlotMapping();
  this.model_.dataSettings.mappings.push(mapping);
  this.dispatchUpdate();
};


anychart.chartEditor2Module.EditorModel.prototype.dropPlot = function(index) {
  if (index > 0 && this.model_.dataSettings.mappings.length > index) {
    this.dropChartSettings('plot(');
    goog.array.splice(this.model_.dataSettings.mappings, index, 1);
    this.dispatchUpdate();
  }
};


anychart.chartEditor2Module.EditorModel.prototype.addSeries = function(plotIndex) {
  var mapping = this.createSeriesConfig(this.model_.dataSettings.mappings[plotIndex].length, this.model_.chart.seriesType);
  this.model_.dataSettings.mappings[plotIndex].push(mapping);
  this.dispatchUpdate();
};


anychart.chartEditor2Module.EditorModel.prototype.dropSeries = function(plotIndex, seriesIndex) {
  if (this.model_.dataSettings.mappings.length > plotIndex && this.model_.dataSettings.mappings[plotIndex].length > seriesIndex) {
    var removedSeries = goog.array.splice(this.model_.dataSettings.mappings[plotIndex], seriesIndex, 1);
    this.dropChartSettings('getSeries(' + removedSeries[0]['id'] + ')');
    this.dispatchUpdate();
  }
};


anychart.chartEditor2Module.EditorModel.prototype.setChartType = function(input) {
  var prevChartType = this.model_.chart.type;
  var prevDefaultSeriesType = this.model_.chart.seriesType;
// TODO: start from here
  // 1. Задать третий датасет - получится Column stacked
  // 2. Переключиться на Bar stacked
  // 3. Слетит стекирование

  this.model_.chart.type = input.getValue();
  this.chooseDefaultSeriesType();

  if (this.needResetMappings(prevChartType, prevDefaultSeriesType)) {
    this.dropChartSettings();
    this.createDefaultMappings();

  } else {
    // Update default series
    for (var i = 0; i < this.model_.dataSettings.mappings.length; i++) {
      for (var j = 0; j < this.model_.dataSettings.mappings[i].length; j++) {
        var seriesConfig = this.model_.dataSettings.mappings[i][j];
        if (prevDefaultSeriesType == seriesConfig['ctor']) {
          if (this.checkSeriesFieldsCompatible(prevDefaultSeriesType, this.model_.chart.seriesType)) {
            this.model_.dataSettings.mappings[i][j]['ctor'] = this.model_.chart.seriesType;
          }
        }
      }
    }
  }

  this.setStackMode(input.getValue2());

  this.dispatchUpdate();
};


anychart.chartEditor2Module.EditorModel.prototype.setStackMode = function(opt_stackMode) {
  this.dropChartSettings("stackMode(");
  if (opt_stackMode) {
    if (this.model_.chart.type != 'stock') {
      this.setValue([['chart'], ['settings'], 'yScale().stackMode()'], opt_stackMode, true);
    }
  }
};


anychart.chartEditor2Module.EditorModel.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  if (goog.array.indexOf(anychart.chartEditor2Module.EditorModel.chartTypes[this.model_.chart.type]['series'], prevSeriesType) == -1)
    return true;

  return (prevChartType == 'stock' || this.model_.chart.type == 'stock') ||
      (prevChartType == 'map' || this.model_.chart.type == 'map') ||
      this.model_.chart.type == 'pie';
};


anychart.chartEditor2Module.EditorModel.prototype.checkSeriesFieldsCompatible = function(seriesType1, seriesType2) {
  var fields1 = anychart.chartEditor2Module.EditorModel.series[seriesType1]['fields'];
  var fields2 = anychart.chartEditor2Module.EditorModel.series[seriesType2]['fields'];
  var compatible = true;
  if (fields1.length == fields2.length) {
    for (var i = fields1.length; i--;) {
      if (fields1[i]['field'] != fields2[i]['field']) {
        compatible = false;
        break;
      }
    }
  } else
    compatible = false;

  return compatible;
};


anychart.chartEditor2Module.EditorModel.prototype.setSeriesType = function(input) {
  var key = input.getKey();
  var type = input.getValue();
  var plotIndex = key[1][1]; // see SeriesPanel.getKey()
  var seriesIndex = key[2][0];

  if (this.model_.dataSettings.mappings[plotIndex][seriesIndex].ctor != type) {
    var oldConfig = this.model_.dataSettings.mappings[plotIndex][seriesIndex];
    this.model_.dataSettings.mappings[plotIndex][seriesIndex] = this.createSeriesConfig(seriesIndex, type, oldConfig['id']);
    this.dispatchUpdate();
  }
};


anychart.chartEditor2Module.EditorModel.prototype.setTheme = function(input) {
  delete this.model_.chart.settings['palette()'];
  this.model_.anychart['theme()'] = input.getValue();
  this.dispatchUpdate();
};
// endregion


// region Editor Model API function
/**
 * Setter for model's field state
 * @param {Array.<*>} key
 * @param {*} value
 * @param {boolean=} opt_noDispatch
 * @param {boolean=} opt_noRebuild
 */
anychart.chartEditor2Module.EditorModel.prototype.setValue = function(key, value, opt_noDispatch, opt_noRebuild) {
  var target = this.model_;
  for (var i = 0; i < key.length; i++) {
    var level = key[i];
    if (goog.isArray(level)) {
      if (!goog.isDef(target[level[0]])) {
        if (level.length > 1)
          target[level[0]] = [];
        else
          target[level[0]] = {};
      }

      if (goog.isArray(target[level[0]]) && target[level[0]].length == level[1])
        target[level[0]].push({});

      target = goog.isArray(target[level[0]]) ? target[level[0]][level[1]] : target[level[0]];
    } else if (goog.isString(level) && target[String(level)] != value) {
      target[String(level)] = value;

      if (!opt_noDispatch)
        this.dispatchUpdate(opt_noRebuild);
    }
  }
};


/**
 * Getter for input's value
 * @param {anychart.chartEditor2Module.EditorModel.Key} key
 * @return {*} Input's value
 */
anychart.chartEditor2Module.EditorModel.prototype.getValue = function(key) {
  var target = this.model_;
  var level;

  for (var i = 0; i < key.length; i++) {
    level = key[i];
    if (i == key.length - 1) {
      // result
      if (goog.isArray(level))
        return target[level[0]][level[1]];
      else if (goog.isString(level))
        return target[level];

    } else {
      // drill down
      if (goog.isArray(level))
        target = goog.isArray(target[level[0]]) ? target[level[0]][level[1]] : target[level[0]];
      else if (goog.isString(level))
        target = target[level];

      if (!target)
        return void 0;
    }
  }
};


/**
 * @param {Array} key
 */
anychart.chartEditor2Module.EditorModel.prototype.removeByKey = function(key) {
  var target = this.model_;
  var level;
  for (var i = 0; i < key.length; i++) {
    level = key[i];
    if (i == key.length - 1) {
      // remove
      if (goog.isArray(level)) {
        goog.array.splice(target[level[0]], level[1], 1);
      }
      else if (goog.isString(level)) {
        delete target[level];
      }

    } else {
      // drill down
      if (goog.isArray(level))
        target = goog.isArray(target[level[0]]) ? target[level[0]][level[1]] : target[level[0]];
      else if (goog.isString(level))
        target = target[level];

      if (!target)
        break;
    }
  }
  this.dispatchUpdate();
};


/**
 * Checks if available data is enough to build chart
 * @return {boolean} true if available data is enough
 */
anychart.chartEditor2Module.EditorModel.prototype.checkConsistency_ = function() {
  // console.log(this.inputs_);

  // Check by consistencyObject
  if (!this.checkConsistencyByObject_(this.model_, anychart.chartEditor2Module.EditorModel.consistencyObject))
    return false;

  // Check series fields
  /*for (var i = this.inputs_['plot'].length; i--;) {
   for (var j = this.inputs_['plot'][i]['series'].length; j--;) {
   var series = this.inputs_['plot'][i]['series'][j];
   var mapping = series['mapping'];
   var fields = /!** @type {Array.<String>} *!/(goog.object.getKeys(mapping));
   var seriesFields = goog.array.map(anychart.chartEditor2Module.EditorModel.series[series['ctor']]['fields'],
   function(item) {
   return item['field']
   });

   if (goog.array.compare3(fields, seriesFields) != 0)
   return false;
   }
   }*/

  return true;
};


anychart.chartEditor2Module.EditorModel.prototype.checkConsistencyByObject_ = function(opt_target, opt_object) {
  if (goog.typeOf(opt_target) != goog.typeOf(opt_object))
    return false;

  if (goog.isObject(opt_object)) {
    for (var i in opt_object) {
      if (opt_object.hasOwnProperty(i)) {
        if (!opt_target.hasOwnProperty(i) || !this.checkConsistencyByObject_(opt_target[i], opt_object[i]))
          return false;
      }
    }
  }

  return true;
};


/**
 *
 * @param {Boolean=} opt_noRebuild
 */
anychart.chartEditor2Module.EditorModel.prototype.dispatchUpdate = function(opt_noRebuild) {
  if (this.suspendQueue_ > 0) {
    this.needDispatch_ = true;
    return;
  }

  // console.log(this.model_);

  this.dispatchEvent({
    type: anychart.chartEditor2Module.events.EventType.EDITOR_MODEL_UPDATE,
    rebuild: !opt_noRebuild
  });

  this.needDispatch_ = false;
};


anychart.chartEditor2Module.EditorModel.prototype.suspendDispatch = function() {
  this.suspendQueue_++;
};


anychart.chartEditor2Module.EditorModel.prototype.resumeDispatch = function() {
  this.suspendQueue_--;
  if (this.suspendQueue_ == 0 && this.needDispatch_)
    this.dispatchUpdate();
};


/**
 * Converts string to valid model key.
 * @param {anychart.chartEditor2Module.EditorModel.Key} key
 * @return {String} key as a string
 */
anychart.chartEditor2Module.EditorModel.getStringKey = function(key) {
  // var stringKey = '';

  // for (var i = 0; i < key.length; i++) {
  //   var level = key[i];
  //   if (i == 0 && goog.isArray(level) && (level[0] == 'anychart' || level[0] == 'chart')) continue;
  //
  //   if (goog.isArray(level))
  //     stringKey += level[0] + '(' + level[1] + ')';
  //   else if (goog.isString(level))
  //     stringKey += level;
  //
  //   if (i < key.length - 1)
  //     stringKey += '.';
  // }

  return key[key.length - 1];
};


anychart.chartEditor2Module.EditorModel.prototype.getModel = function() {
  return this.model_;
};
// endregion


// region Data Model
/**
 * @enum {string}
 */
anychart.chartEditor2Module.EditorModel.dataType = {
  UPLOADED: 'u',
  PREDEFINED: 'p',
  GEO: 'g'
};


anychart.chartEditor2Module.EditorModel.prototype.getFullId = function(dataType, setId) {
  return dataType + setId;
};


anychart.chartEditor2Module.EditorModel.prototype.addData = function(evt) {
  var id = this.getFullId(evt['dataType'], evt['setId']);
  if (!this.data_[id]) {
    this.data_[id] = {
      'setFullId': id,
      'type': evt['dataType'],
      'setId': evt['setId'],
      'title': evt['title'],
      'data': evt['data']
    };
  }
  this.preparedData_.length = 0;

  this.generateInitialMappingsOnChangeView_ = true;
  // debug
  // this.onChangeView();

  this.dispatchUpdate();
};


anychart.chartEditor2Module.EditorModel.prototype.removeData = function(setFullId) {
  delete this.data_[setFullId];
  this.preparedData_.length = 0;

  this.generateInitialMappingsOnChangeView_ = true;
  // debug
  //this.onChangeView();

  if (setFullId == this.model_.dataSettings.active || setFullId == this.model_.dataSettings.activeGeo) {
    this.onChangeView();
  }

  this.dispatchUpdate();
};


anychart.chartEditor2Module.EditorModel.prototype.getDataKeys = function() {
  return goog.object.getKeys(this.data_);
};


/**
 * @return {?Object} Prepared active dataset.
 */
anychart.chartEditor2Module.EditorModel.prototype.getPreparedDataActive = function() {
  var data = this.getPreparedData();
  var active = this.model_.dataSettings.active;
  data = goog.array.filter(data, function(item) {
    return item['setFullId'] == active;
  });

  return data.length ? data[0] : null
};


/**
 * @return {!Array.<*>}
 */
anychart.chartEditor2Module.EditorModel.prototype.getPreparedData = function() {
  return this.isDirty() ? this.prepareData_() : this.preparedData_;
};


/**
 * @return {?String}
 */
anychart.chartEditor2Module.EditorModel.prototype.getActive = function() {
  return this.model_.dataSettings.active;
};


anychart.chartEditor2Module.EditorModel.prototype.getActiveGeo = function() {
  return this.model_.dataSettings.activeGeo;
};


anychart.chartEditor2Module.EditorModel.prototype.getRawData = function(opt_activeGeo) {
  var dataSet = this.data_[opt_activeGeo ? this.getActiveGeo() : this.getActive()];
  return dataSet ? dataSet['data'] : null;
};


anychart.chartEditor2Module.EditorModel.prototype.getGeoData = function() {
  var result = goog.object.filter(this.data_, function(item) {
    return item['type'] == anychart.chartEditor2Module.EditorModel.dataType.GEO;
  });
  return result;
};


anychart.chartEditor2Module.EditorModel.prototype.isDirty = function() {
  return !this.preparedData_.length;
};


anychart.chartEditor2Module.EditorModel.prototype.prepareData_ = function() {
  var joinedSets = [];
  var singleSets = [];
  var geoSets = [];
  var dataSet;

  for (var i in this.data_) {
    if (this.data_.hasOwnProperty(i)) {
      dataSet = this.prepareDataSet_(this.data_[i]);

      var joined = false;
      if (dataSet['join']) {
        /*
         * todo: process join
         */
        joined = true;
      }

      if (joined) {
        dataSet['title'] = 'Joined set ' + (joinedSets.length + 1);
        joinedSets.push(dataSet);
      } else if (dataSet.type == anychart.chartEditor2Module.EditorModel.dataType.GEO) {
        geoSets.push(dataSet);
      } else {
        dataSet['title'] = 'Data set ' + (singleSets.length + 1);
        singleSets.push(dataSet);
      }
    }
  }

  this.preparedData_ = goog.array.concat(joinedSets, singleSets, geoSets);

  return this.preparedData_;
};


anychart.chartEditor2Module.EditorModel.prototype.prepareDataSet_ = function(dataSet) {
  var result = {
    type: dataSet['type'],
    setId: dataSet['setId'],
    setFullId: dataSet['setFullId'],
    title: dataSet['title']
  };

  var row = dataSet['type'] == anychart.chartEditor2Module.EditorModel.dataType.GEO ?
      dataSet['data']['features'][0]['properties'] :
      dataSet['data'][0];

  var settings = new goog.format.JsonPrettyPrinter.SafeHtmlDelimiters();
  settings.lineBreak = '';
  settings.objectStart = '\n{';
  settings.arrayStart = '\n[';
  settings.space = '';
  settings.propertySeparator = ', ';
  settings.nameValueSeparator = ': ';

  var f = new goog.format.JsonPrettyPrinter(settings);
  result['sample'] = f.format(row);

  var fields = [];
  var i;
  var field;

  for (i in row) {
    field = {
      'name': goog.isArray(row) ? 'Field ' + i : i,
      'type': typeof(row[i]),
      'key': i
    };
    fields.push(field);
  }
  result['fields'] = fields;

  return result;
};
// endregion