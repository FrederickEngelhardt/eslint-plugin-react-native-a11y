"use strict";

var _validProp = _interopRequireDefault(require("../factory/valid-prop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Enforce importantForAccessibility property value is valid
 * @author Alex Saunders
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const errorMessage = 'importantForAccessibility must be one of defined values';
const validValues = ['auto', 'yes', 'no', 'no-hide-descendants'];
module.exports = (0, _validProp.default)('importantForAccessibility', validValues, errorMessage);