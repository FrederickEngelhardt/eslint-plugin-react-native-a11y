"use strict";

var _validProp = _interopRequireDefault(require("../factory/valid-prop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Enforce `accessibilityLiveRegion` property value is valid

 * @author Alex Saunders
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const errorMessage = 'accessibilityLiveRegion must be one of defined values';
const validValues = ['none', 'polite', 'assertive'];
module.exports = (0, _validProp.default)('accessibilityLiveRegion', validValues, errorMessage);