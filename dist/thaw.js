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
//# sourceMappingURL=thaw.js.map