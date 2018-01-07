import Thaw from './';

/**
 *
 * @param {Object} [options]
 * @param {Number} [count]
 * @constructor
 */
export default class Block {
  constructor(options, count) {
    this.index = 0;
    this.thaws = [];
    this.count = count || 200;
    this.options = options;
  }

  /**
   * add an item to the end of items
   * @param item
   * @returns {Block}
   */
  add(item) {
    const next = this._next();
    next.add(item);

    return this;
  }

  /**
   * add an Array to the end of items
   * @param items
   * @returns {Block}
   */
  addArray(items) {
    const next = this._next();
    next.addArray(items);

    return this;
  }

  /**
   * insert an item into items @ current position
   * @param item
   * @returns {Block}
   */
  insert(item) {
    const next = this._next();
    next.insert(item);

    return this;
  }

  /**
   * insert and array into items @ current position
   * @param items
   * @returns {Block}
   */
  insertArray(items) {
    const next = this._next();
    next.insertArray(items);

    return this;
  }

  /**
   * Stops all thaws in this block
   * @returns {Block}
   */
  stop() {
    for (let i = 0;i < this.thaws.length;i++) {
      this.thaws[i].stop();
    }
    return this;
  }

  /**
   * Get next available in block
   * @returns {*}
   * @private
   */
  _next() {
    let thaw = null;
    const thaws = this.thaws;

    if (thaws.length < this.count) {
      thaws.push(thaw = new Thaw([], this.options));
    } else {
      thaw = thaws[this.index];
    }
    this.index++;
    if (this.index >= this.count) {
      this.index = 0;
    }

    return thaw;
  }
};