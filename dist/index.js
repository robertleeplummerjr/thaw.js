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
//# sourceMappingURL=index.js.map