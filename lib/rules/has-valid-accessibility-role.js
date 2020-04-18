"use strict";

var _validProp = _interopRequireDefault(require("../factory/valid-prop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Used to tell Talkback or Voiceover the role of a UI Element
 * @author Jen Luker
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const errorMessage = 'accessibilityRole must be one of defined values';
const validValues = ['adjustable', 'alert', 'button', 'checkbox', 'combobox', 'header', 'image', 'imagebutton', 'keyboardkey', 'link', 'menu', 'menubar', 'menuitem', 'none', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'search', 'spinbutton', 'summary', 'switch', 'tab', 'tablist', 'text', 'timer', 'toolbar'];
module.exports = (0, _validProp.default)('accessibilityRole', validValues, errorMessage);