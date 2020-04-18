"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findChild;

/**
 * Recursively searches for an child element within a
 * JSXOpeningElement that matches the condition specificed in
 * `callback`
 */
function findChild(node, callback) {
  const {
    children
  } = node;

  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      // $FlowFixMe
      const child = children[i];

      if (child.openingElement && child.openingElement.name) {
        if (callback(child.openingElement)) {
          return child.openingElement;
        }
      }

      const foundChild = findChild(child, callback);

      if (foundChild) {
        return foundChild;
      }
    }
  }

  return null;
}