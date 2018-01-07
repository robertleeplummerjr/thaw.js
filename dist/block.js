'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @param {Object} [options]
 * @param {Number} [count]
 * @constructor
 */
var Block = function () {
  function Block(options, count) {
    _classCallCheck(this, Block);

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


  _createClass(Block, [{
    key: 'add',
    value: function add(item) {
      var next = this._next();
      next.add(item);

      return this;
    }

    /**
     * add an Array to the end of items
     * @param items
     * @returns {Block}
     */

  }, {
    key: 'addArray',
    value: function addArray(items) {
      var next = this._next();
      next.addArray(items);

      return this;
    }

    /**
     * insert an item into items @ current position
     * @param item
     * @returns {Block}
     */

  }, {
    key: 'insert',
    value: function insert(item) {
      var next = this._next();
      next.insert(item);

      return this;
    }

    /**
     * insert and array into items @ current position
     * @param items
     * @returns {Block}
     */

  }, {
    key: 'insertArray',
    value: function insertArray(items) {
      var next = this._next();
      next.insertArray(items);

      return this;
    }

    /**
     * Stops all thaws in this block
     * @returns {Block}
     */

  }, {
    key: 'stop',
    value: function stop() {
      for (var i = 0; i < this.thaws.length; i++) {
        this.thaws[i].stop();
      }
      return this;
    }

    /**
     * Get next available in block
     * @returns {*}
     * @private
     */

  }, {
    key: '_next',
    value: function _next() {
      var thaw = null;
      var thaws = this.thaws;

      if (thaws.length < this.count) {
        thaws.push(thaw = new _2.default([], this.options));
      } else {
        thaw = thaws[this.index];
      }
      this.index++;
      if (this.index >= this.count) {
        this.index = 0;
      }

      return thaw;
    }
  }]);

  return Block;
}();

exports.default = Block;
;
//# sourceMappingURL=block.js.map