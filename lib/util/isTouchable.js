"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTouchable;

var _jsxAstUtils = require("jsx-ast-utils");

/**
 * Returns boolean indicating whether a JSXOpeningElement
 * is a <Touchable*> element
 * 
 */
const defaultTouchables = {
  Touchable: true,
  TouchableOpacity: true,
  TouchableHighlight: true,
  TouchableWithoutFeedback: true,
  TouchableNativeFeedback: true,
  TouchableBounce: true
};

function isTouchable(element, context = {
  id: '',
  options: [],
  report: () => {}
}) {
  const {
    options
  } = context;
  let extraTouchables = [];

  if (options[0] && Object.prototype.hasOwnProperty.call(options[0], 'touchables')) {
    const {
      touchables
    } = options[0];
    extraTouchables = [...touchables];
  }

  const elType = (0, _jsxAstUtils.elementType)(element);
  return defaultTouchables[elType] || extraTouchables.includes(elType);
}