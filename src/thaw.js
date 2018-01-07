//private variables
let thawing = false;
let thaws = [];

/**
 * thaw an array of items
 * @param {Array} items
 * @param {Object} [options]
 * @constructor
 */
export default class Thaw {
  /**
   *
   * @type {{each: null, done: null}}
   */
  static get defaultSettings() {
    return {
      each: null,
      done: null
    };
  }

  /**
   * returns if Thaw.js is thawing
   * @returns {boolean}
   */
  static get isThawing() {
    return thawing;
  }

  /**
   * Stops all Thaw instances
   */
  static stopAll() {
    for(let i = 0;i< thaws.length; i++) {
      thaws[i].stop();
    }
  }

  constructor(items, options = {}) {
    const { each, done } = {...this.constructor.defaultSettings, ...options};
    this.items = items;
    this.i = 0;
    this.options = options;
    const tick = this.tick = () => {
      if (this.i < 0) return;

      this.timeout = setTimeout(tick, 0);

      if (thawing) return;
      const item = items[this.i];
      if (this.i >= items.length) {
        if (done !== null) {
          thawing = true;
          done(item, this.i);
          thawing = false;
        }

        this.i = -1;
        clearTimeout(this.timeout);
        return;
      }
      if (each !== null) {
        thawing = true;
        each(item, this.i);
        thawing = false;
      } else if (item !== undefined) {
        item();
      }
      this.i++;
    };

    thaws.push(this);
    if (!options.delay) {
      tick();
    }
  }

  /**
   * readies thaw to continue
   * @returns {boolean} if had to get ready
   */
  makeReady() {
    if (this.i < 0) {
      this.i = this.items.length;
      return true;
    }
    return false;
  }

  /**
   * Adds an item to the end of this instance of Thaw and readies Thaw to process it
   * @param item
   * @returns {Thaw}
   */
  add(item) {
    const doTick = this.makeReady();

    this.items.push(item);

    if (doTick) {
      this.tick();
    }
    return this;
  }

  /**
   * Inserts an item just after the current item being processed in Thaw and readies Thaw to process it
   * @param item
   * @returns {Thaw}
   */
  insert(item) {
    const doTick = this.makeReady();

    this.items.splice(this.i, 0, item);

    if (doTick) {
      this.tick();
    }

    return this;
  }

  /**
   * Adds an Array to the end of this instance of Thaw and readies Thaw to process it
   * @param {Array} items
   * @returns {Thaw}
   */
  addArray(items) {
    const doTick = this.makeReady();

    this.items = this.items.concat(items);

    if (doTick) {
      this.tick();
    }

    return this;
  }

  /**
   * Inserts an Array just after the current item being processed in Thaw and readies Thaw to process them
   * @param {Array} items
   * @returns {Thaw}
   */
  insertArray(items) {
    const doTick = this.makeReady();
    const left = this.items;
    const middle = items;
    const right = this.items.splice(this.i, (this.items.length - this.i) + 1);

    this.items = left.concat(middle, right);

    if (doTick) {
      this.tick();
    }
    return this;
  }

  /**
   * Stops this instance of Thaw
   * @returns {Thaw}
   */
  stop() {
    this.i = -1;
    clearTimeout(this.timeout);
    if (this.options.done) {
      this.options.done();
    }
    return this;
  }
}

/**
 * simple thaw
 * @param {Array} items
 * @param {Object} [options]
 * @returns Thaw
 */
export function thaw(items, options = {}) {
  return new Thaw(items, options);
}