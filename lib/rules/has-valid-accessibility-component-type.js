"use strict";

var _validProp = _interopRequireDefault(require("../factory/valid-prop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Enforce accessibilityComponentType property value is valid
 * @author Alex Saunders
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const errorMessage = 'accessibilityComponentType must be one of defined values';
const validValues = ['none', 'button', 'radiobutton_checked', 'radiobutton_unchecked'];
module.exports = (0, _validProp.default)('accessibilityComponentType', validValues, errorMessage);