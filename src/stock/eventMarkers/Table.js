goog.provide('anychart.stockModule.eventMarkers.Table');
goog.require('anychart.data.IIterator');
goog.require('anychart.data.IRowInfo');
goog.require('anychart.format');
goog.require('anychart.stockModule.data.TableIterator.ICoIterator');
goog.require('anychart.utils');
goog.require('goog.array');



/**
 * Event markers data table.
 * @constructor
 */
anychart.stockModule.eventMarkers.Table = function() {
  this.dataReducer_ = goog.bind(this.dataReducer_, this);
};


/**
 * @typedef {{
 *    key: number,
 *    index: number,
 *    data: (*|undefined),
 *    meta: (Object|undefined)
 * }}
 */
anychart.stockModule.eventMarkers.Table.DataItem;


/**
 * @typedef {{
 *    key: number,
 *    index: number,
 *    items: Array.<anychart.stockModule.eventMarkers.Table.DataItem>,
 *    count: number
 * }}
 */
anychart.stockModule.eventMarkers.Table.DataItemAggregate;



/**
 * Sets data to the table.
 * @param {Array} value
 * @param {?string=} opt_dateTimePattern Key column parsing pattern. Null means default behaviour, undefined - default pattern.
 * @param {number=} opt_timeOffset Shifts all input dates timeOffset hours forward. Defaults to zero.
 * @param {?(number|Date)=} opt_baseDate Base date for the key column.
 * @param {?(string|anychart.format.Locale)=} opt_locale Locale for the key column parsing.
 */
anychart.stockModule.eventMarkers.Table.prototype.setData = function(value, opt_dateTimePattern, opt_timeOffset, opt_baseDate, opt_locale) {
  /**
   * Key column parsing pattern.
   * @type {string|null|undefined}
   * @private
   */
  this.dtPattern_ = opt_dateTimePattern;

  /**
   * Offset for all parsed dates.
   * @type {number}
   * @private
   */
  this.timeOffset_ = anychart.utils.toNumber(opt_timeOffset) || 0;

  /**
   * Base date for the key column.
   * @type {number}
   * @private
   */
  this.baseDate_ = goog.isDateLike(opt_baseDate) ?
      opt_baseDate.getTime() :
      anychart.utils.toNumber(opt_baseDate);

  /**
   * Key column parsing locale.
   * @type {?(string|anychart.format.Locale)}
   * @private
   */
  this.locale_ = opt_locale || null;

  /**
   * Cache of the last selection.
    * @type {?{fromIndex: number, toIndex: number, data: Array.<anychart.stockModule.eventMarkers.Table.DataItemAggregate>}}
   * @private
   */
  this.lastDataCache_ = null;

  /**
   * @type {Array.<anychart.stockModule.eventMarkers.Table.DataItem>}
   * @private
   */
  this.data_ = goog.array.reduce(value, this.dataReducer_, []);
  this.data_.sort(anychart.stockModule.eventMarkers.Table.DATA_ITEMS_COMPARATOR);
};


/**
 * Getter for data array.
 * @return {Array}
 */
anychart.stockModule.eventMarkers.Table.prototype.getData = function() {
  return goog.array.map(this.data_ || [], function(item) {
    return item.data;
  });
};


/**
 * Returns a new iterator for passed range of keys and a coIterator for a keys grid.
 * @param {number} from
 * @param {number} to
 * @param {anychart.stockModule.data.TableIterator.ICoIterator} coIterator
 * @return {anychart.stockModule.eventMarkers.Table.Iterator}
 */
anychart.stockModule.eventMarkers.Table.prototype.getIterator = function(from, to, coIterator) {
  var fromIndex = ~goog.array.binarySearch(this.data_, {key: from, index: -1}, anychart.stockModule.eventMarkers.Table.DATA_ITEMS_COMPARATOR);
  var toIndex = ~goog.array.binarySearch(this.data_, {key: to, index: -Infinity}, anychart.stockModule.eventMarkers.Table.DATA_ITEMS_COMPARATOR);

  var data, count;
  if (this.lastDataCache_ && this.lastDataCache_.fromIndex == fromIndex && this.lastDataCache_.toIndex == toIndex && this.lastDataCache_.pointsCount == coIterator.getRowsCount()) {
    data = this.lastDataCache_.data;
    count = this.lastDataCache_.count || 0;
  } else {
    data = [];
    count = 0;
    var i = fromIndex;
    var prevIterKey = NaN;
    var prevIterIndex = NaN;
    var items = [];
    coIterator.reset();
    while (coIterator.advance() && i < toIndex) {
      var currItem;
      while (i < toIndex && (currItem = this.data_[i]).key < coIterator.currentKey()) {
        items.push(currItem);
        i++;
      }
      if (items.length) {
        if (isNaN(prevIterKey)) {
          items.length = 0;
        } else {
          data.push({
            key: prevIterKey,
            index: prevIterIndex,
            items: items
          });
          count += items.length;
          items = [];
        }
      }
      prevIterKey = coIterator.currentKey();
      prevIterIndex = coIterator.currentIndex();
    }
    if (!isNaN(prevIterKey)) {
      while (i < toIndex) {
        items.push(currItem);
        i++;
      }
      if (items.length) {
        data.push({
          key: prevIterKey,
          index: prevIterIndex,
          items: items
        });
        count += items.length;
      }
    }
    this.lastDataCache_ = {
      fromIndex: fromIndex,
      toIndex: toIndex,
      data: data,
      count: count,
      pointsCount: coIterator.getRowsCount()
    };
  }

  return new anychart.stockModule.eventMarkers.Table.Iterator(data, count);
};


/**
 * A reducer function for a setData method.
 * @param {Array.<anychart.stockModule.eventMarkers.Table.DataItem>} data
 * @param {*} row
 * @param {number} index
 * @return {Array.<anychart.stockModule.eventMarkers.Table.DataItem>}
 * @private
 */
anychart.stockModule.eventMarkers.Table.prototype.dataReducer_ = function(data, row, index) {
  var key = anychart.format.parseDateTime(
      ((row instanceof Date) || !goog.isObject(row)) ? row : row['date'],
      this.dtPattern_,
      isNaN(this.baseDate_) ? null : new Date(this.baseDate_),
      this.locale_);
  if (key) {
    data.push({
      index: index,
      key: +key,
      data: row,
      meta: {}
    });
  }
  return data;
};


/**
 * Data items comparison function
 * @param {anychart.stockModule.eventMarkers.Table.DataItem} a
 * @param {anychart.stockModule.eventMarkers.Table.DataItem} b
 * @return {number}
 * @private
 */
anychart.stockModule.eventMarkers.Table.DATA_ITEMS_COMPARATOR = function(a, b) {
  return (a.key - b.key) || (a.index - b.index);
};



//region --- anychart.stockModule.eventMarkers.Table.Iterator
//------------------------------------------------------------------------------
//
//  anychart.stockModule.eventMarkers.Table.Iterator
//
//------------------------------------------------------------------------------
/**
 * Iterator class.
 * @param {Array.<anychart.stockModule.eventMarkers.Table.DataItemAggregate>} data
 * @param {number} count
 * @constructor
 * @implements {anychart.data.IRowInfo}
 * @implements {anychart.data.IIterator}
 */
anychart.stockModule.eventMarkers.Table.Iterator = function(data, count) {
  /**
   * Data items array.
   * @type {Array.<anychart.stockModule.eventMarkers.Table.DataItemAggregate>}
   * @private
   */
  this.data_ = data;

  /**
   * Total rows count.
   * @type {number}
   * @private
   */
  this.rowsCount_ = count;

  this.reset();
};


/**
 * Selects an item by passed params.
 * @param {number} groupIndex
 * @param {number} subIndex
 * @return {boolean}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.select = function(groupIndex, subIndex) {
  var itemLength;
  var res = 0 <= groupIndex && groupIndex < this.data_.length &&
      0 <= subIndex && subIndex < (itemLength = this.data_[groupIndex].items.length);
  if (res) {
    this.currentItemIndex_ = groupIndex;
    this.currentSubIndex_ = subIndex;
    this.currentItemLength_ = itemLength;
  } else {
    this.currentItemLength_ = 0;
    this.currentItemIndex_ = this.data_.length;
    this.currentSubIndex_ = 0;
  }
  return res;
};


/**
 * Resets the data iterator to its zero state (before the first item of the view).
 * @return {anychart.stockModule.eventMarkers.Table.Iterator}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.reset = function() {
  this.currentItemIndex_ = -1;
  this.currentSubIndex_ = this.currentItemLength_ = 0;
  return this;
};


/**
 * Advances the iterator to the next position.
 * @return {boolean}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.advance = function() {
  if (++this.currentSubIndex_ >= this.currentItemLength_) {
    this.currentSubIndex_ = 0;
    this.currentItemIndex_++;
    this.currentItemLength_ = (this.currentItemIndex_ < this.data_.length) ?
        this.data_[this.currentItemIndex_].items.length : 0;
  }
  return this.currentSubIndex_ < this.currentItemLength_;
};


/**
 * Returns rows count.
 * @return {number}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.getRowsCount = function() {
  return this.rowsCount_;
};


/**
 * Returns current row data index. It is not bound to the rows count.
 * @return {number}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.getIndex = function() {
  return this.currentItemIndex_ < this.data_.length ? this.data_[this.currentItemIndex_].index : NaN;
};


/**
 * Returns current key.
 * @return {number}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.getX = function() {
  return this.currentItemIndex_ < this.data_.length ? this.data_[this.currentItemIndex_].key : NaN;
};


/**
 * Item getter.
 * @param {string} name
 * @return {*}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.get = function(name) {
  var data = this.data_[this.currentItemIndex_].items[this.currentSubIndex_].data;
  return goog.isObject(data) ? data[name] : void 0;
};


/**
 * Dummy.
 * @param {number|string} index
 * @return {*}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.getColumn = function(index) {
  return void 0;
};


/**
 * Returns true, if current item is the first in group.
 * @return {boolean}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.isFirstInGroup = function() {
  return !this.currentSubIndex_;
};


/**
 * @return {number}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.getGroupIndex = function() {
  return this.currentItemIndex_ < this.data_.length ? this.currentItemIndex_ : NaN;
};


/**
 * @return {number}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.getSubIndex = function() {
  return this.currentItemIndex_ < this.data_.length ? this.currentSubIndex_ : NaN;
};


/**
 * Meta getter-setter.
 * @param {string} name
 * @param {*=} opt_value
 * @return {*}
 */
anychart.stockModule.eventMarkers.Table.Iterator.prototype.meta = function(name, opt_value) {
  var obj = this.data_[this.currentItemIndex_].items[this.currentSubIndex_].meta;
  if (goog.isDef(opt_value)) {
    obj[name] = opt_value;
    return this;
  }
  return obj[name];
};


//endregion