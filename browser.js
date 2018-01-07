(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = undefined;

var _thaw = require('./thaw');

var _thaw2 = _interopRequireDefault(_thaw);

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _thaw2.default;
exports.Block = _block2.default;


if (typeof window !== 'undefined') {
  window.Thaw = _thaw2.default;
  window.Thaw.Block = _block2.default;
}

},{"./block":1,"./thaw":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.thaw = thaw;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//private variables
var thawing = false;
var thaws = [];

/**
 * thaw an array of items
 * @param {Array} items
 * @param {Object} [options]
 * @constructor
 */

var Thaw = function () {
  _createClass(Thaw, null, [{
    key: "stopAll",


    /**
     * Stops all Thaw instances
     */
    value: function stopAll() {
      for (var i = 0; i < thaws.length; i++) {
        thaws[i].stop();
      }
    }
  }, {
    key: "defaultSettings",

    /**
     *
     * @type {{each: null, done: null}}
     */
    get: function get() {
      return {
        each: null,
        done: null
      };
    }

    /**
     * returns if Thaw.js is thawing
     * @returns {boolean}
     */

  }, {
    key: "isThawing",
    get: function get() {
      return thawing;
    }
  }]);

  function Thaw(items) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Thaw);

    var _constructor$defaultS = _extends({}, this.constructor.defaultSettings, options),
        each = _constructor$defaultS.each,
        done = _constructor$defaultS.done;

    this.items = items;
    this.i = 0;
    this.options = options;
    var tick = this.tick = function () {
      if (_this.i < 0) return;

      _this.timeout = setTimeout(tick, 0);

      if (thawing) return;
      var item = items[_this.i];
      if (_this.i >= items.length) {
        if (done !== null) {
          thawing = true;
          done(item, _this.i);
          thawing = false;
        }

        _this.i = -1;
        clearTimeout(_this.timeout);
        return;
      }
      if (each !== null) {
        thawing = true;
        each(item, _this.i);
        thawing = false;
      } else if (item !== undefined) {
        item();
      }
      _this.i++;
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


  _createClass(Thaw, [{
    key: "makeReady",
    value: function makeReady() {
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

  }, {
    key: "add",
    value: function add(item) {
      var doTick = this.makeReady();

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

  }, {
    key: "insert",
    value: function insert(item) {
      var doTick = this.makeReady();

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

  }, {
    key: "addArray",
    value: function addArray(items) {
      var doTick = this.makeReady();

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

  }, {
    key: "insertArray",
    value: function insertArray(items) {
      var doTick = this.makeReady();
      var left = this.items;
      var middle = items;
      var right = this.items.splice(this.i, this.items.length - this.i + 1);

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

  }, {
    key: "stop",
    value: function stop() {
      this.i = -1;
      clearTimeout(this.timeout);
      if (this.options.done) {
        this.options.done();
      }
      return this;
    }
  }]);

  return Thaw;
}();

/**
 * simple thaw
 * @param {Array} items
 * @param {Object} [options]
 * @returns Thaw
 */


exports.default = Thaw;
function thaw(items) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Thaw(items, options);
}

},{}]},{},[2]);
