goog.provide('anychart.data.Iterator');



/**
 * Класс <b>anychart.data.Iterator</b> предназначен для работы с данными View.<br/>
 * Итератор позволяет извлекать данные из {@link anychart.data.View} с помощью курсора по rows. Итератор может быть
 * получен с помощью метода {@link anychart.data.View#getIterator} и содержит методы, управляющие положением курсора и
 * методы извлечения значений полей и метаданных из row на которую указывает курсор.
 * @param {!anychart.data.View} view A view to iterate.
 * @constructor
 */
anychart.data.Iterator = function(view) {
  /**
   * @type {anychart.data.View}
   * @private
   */
  this.view_ = view;

  this.reset();
};


/**
 * Current item index in iteration.
 * @type {number}
 * @private
 */
anychart.data.Iterator.prototype.currentIndex_;


/**
 * Current item in iteration.
 * @type {*}
 * @private
 */
anychart.data.Iterator.prototype.currentRow_;


/**
 * Sets passed index as current index and returns if it was successful.
 * Can be used to make the iterator point to the particular index and than fetch values using it.
 * @example <t>listingOnly</t>
 * // Данные в каком-то рабочем состоянии.
 * // Текущее положение курсора обозначено как '=()='
 * [ =(17.22)=, 31.23, 12.2141, 123.3231, 0.123, 34141.1, 2332.0, 12148.91]
 * // После вызова iterator.select(4), курсор сместится на индекс 4.
 * [17.22, 31.23, 12.2141, 123.3231, =(0.123)=, 34141.1, 2332.0, 12148.91]
 * @param {number} index The index to try to select.
 * @return {boolean} <b>True</b> Если значение переданного индекса будет находиться в диапазоне от 0 до количества
 * элементов в данных, иначе вернется <b>False</b>.
 */
anychart.data.Iterator.prototype.select = function(index) {
  this.currentIndex_ = index - 1;
  return this.advance();
};


/**
 * Resets data iterator to its zero state (before the first item of the view).
 * @example <t>listingOnly</t>
 * // Данные в каком-то рабочем состоянии.
 * // Текущее положение курсора обозначено как '=()='.
 * [17.22, 31.23, 12.2141, 123.3231, =(0.123)=, 34141.1, 2332.0, 12148.91]
 * // После вызова Iterator.reset(), курсор сместится на индекс -1.
 * =()= [17.22, 31.23, 12.2141, 123.3231, 0.123, 34141.1, 2332.0, 12148.91]
 * @return {anychart.data.Iterator} Экземпляр класса {@link anychart.data.Iterator} для цепочного вызова.
 */
anychart.data.Iterator.prototype.reset = function() {
  this.currentIndex_ = -1;
  this.currentRow_ = undefined;
  return this;
};


/**
 * Advances the iterator to the next item.
 * @example <c>Пример использования в коде</c><t>listingOnly</t>
 * // пробегаемся по всем строкам данных:
 * iterator.reset();
 * while(iterator.advance()){
 *    // do something
 * }
 * @return {boolean} <b>True</b> Если итератор сместился на существующий элемент, иначе <b>False</b>.
 */
anychart.data.Iterator.prototype.advance = function() {
  this.currentRow_ = this.view_.row(++this.currentIndex_);
  return this.currentIndex_ < this.getRowsCount();
};


/**
 * Gets field value of the current row by its field name.<br/>
 * <b>Note:</b> Returns <b>undefined</b>, if no matching field found.
 * @example <t>listingOnly</t>
 * // Данные
 * [
 *    {name: 'Katy', age: 27, contact: 6597439},
 *    {name: 'Billy', age: 31, contact: 6597789},
 *    {name: 'Margaret', age: 24, contact: 6597522},
 *    {name: 'John', age: 39, contact: 6597001},
 * ]
 * // Вернет в currentName значение 'Margaret'
 * if (iterator.select(2)){
 *   var currentName = iterator.get('name');
 * }
 * @param {string} fieldName The name of the field to fetch from the current row.
 * @return {*} The field value or undefined, if not found.
 */
anychart.data.Iterator.prototype.get = function(fieldName) {
  return this.view_.getRowMapping(this.currentIndex_).get(this.currentRow_, this.currentIndex_, fieldName);
};


/**
 * Returns the index of the item iterator points to.
 * @example <t>listingOnly</t>
 * // Данные в каком-то рабочем состоянии.
 * // Текущее положение курсора обозначено как '=()='.
 * [17.22, 31.23, 12.2141, 123.3231, =(0.123)=, 34141.1, 2332.0, 12148.91]
 * // iterator.getIndex() вернет индекс 4.
 * @return {number} Current index of iterator position.
 */
anychart.data.Iterator.prototype.getIndex = function() {
  return this.currentIndex_;
};


/**
 * Returns the number of rows in the view.
 * @example <t>listingOnly</t>
 * // Данные
 * [
 *    {name: 'Katy', age: 27, contact: 6597439},
 *    {name: 'Billy', age: 31, contact: 6597789},
 *    {name: 'Margaret', age: 24, contact: 6597522},
 *    {name: 'John', age: 39, contact: 6597001},
 * ]
 * // iterator.getRowsCount() вернет 4.
 * @return {number} Number of rows in the set.
 */
anychart.data.Iterator.prototype.getRowsCount = function() {
  return this.view_.getRowsCount();
};


/**
 * Get meta data value by field name.<br/>
 * <b>Note:</b> MetaData отделена от пользовательских данных, то есть она существует отдельно, но полностью
 * соответствует им.
 * @example <t>listingOnly</t>
 * // Данные                                              Мета-данные
 * [                                                     [
 *    {name: 'Katy', age: 27, contact: 6597439},            {},
 *    {name: 'Billy', age: 31, contact: 6597789},           {},
 *    {name: 'Margaret', age: 24, contact: 6597522},        {},
 *    {name: 'John', age: 39, contact: 6597001},            {}
 * ]                                                     ]
 * iterator.select(2);
 * iterator.meta('name'); // вернет undefined.
 * @param {string} name Name of metadata field.
 * @return {*} Current field value.
 *//**
 * Set meta data value by field name.<br/>
 * <b>Note:</b> MetaData отделена от пользовательских данных, то есть она существует отдельно, но полностью
 * соответствует им.
 * @example <t>listingOnly</t>
 * iterator.select(2);
 * iterator.meta('name', 'SampleText');
 * // После этого
 * // Данные                                              Мета-данные
 * [                                                     [
 *    {name: 'Katy', age: 27, contact: 6597439},            {},
 *    {name: 'Billy', age: 31, contact: 6597789},           {},
 *    {name: 'Margaret', age: 24, contact: 6597522},        {'name': 'SampleText'},
 *    {name: 'John', age: 39, contact: 6597001},            {}
 * ]                                                     ]
 * @param {string} name Name of metadata field.
 * @param {*=} opt_value Value to set.
 * @return {!anychart.data.Iterator} Экземпляр класса {@link anychart.data.Iterator} для цепочного вызова.
 *//**
 * @ignoreDoc
 * @param {string} name .
 * @param {*=} opt_value .
 * @return {!anychart.data.Iterator|*} .
 */
anychart.data.Iterator.prototype.meta = function(name, opt_value) {
  if (arguments.length > 1) {
    this.view_.meta(this.currentIndex_, name, opt_value);
    return this;
  } else
    return this.view_.meta(this.currentIndex_, name);
};

