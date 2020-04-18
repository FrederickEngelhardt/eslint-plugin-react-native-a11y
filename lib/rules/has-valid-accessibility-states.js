"use strict";

var _validProp = _interopRequireDefault(require("../factory/valid-prop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Used to tell Talkback or Voiceover the state a UI Element is in
 * @author Jen Luker
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const errorMessage = 'accessibilityStates must be one, both or neither of the defined values';
const validValues = ['selected', 'disabled', ''];
module.exports = (0, _validProp.default)('accessibilityStates', validValues, errorMessage);