"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Allow an assistive technology to programmatically invoke the actions of a component.
 * @author JP Driver
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const standardActions = ['magicTap', // iOS only
'escape', // iOS only
'activate', 'increment', 'decrement', 'longpress' // Android only
];
module.exports = {
  meta: {
    docs: {},
    schema: [(0, _schemas.generateObjSchema)()]
  },
  create: context => ({
    JSXOpeningElement: node => {
      const error = message => context.report({
        node,
        message
      });

      if ((0, _jsxAstUtils.hasProp)(node.attributes, 'accessibilityActions')) {
        if (typeof (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'onAccessibilityAction')) !== 'function') {
          error('accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function');
        }

        const attrValue = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'accessibilityActions'));

        if (!Array.isArray(attrValue)) {
          error('accessibilityActions: value must be an Array');
        } else if (attrValue.length === 0) {
          error('accessibilityActions: Array cannot be empty');
        } else {
          attrValue.forEach(action => {
            if (!action.name) {
              error('accessibilityActions: action missing name');
            } else if (standardActions.indexOf(action.name) < 0 && !action.label) {
              error(`accessibilityActions: custom action "${action.name}" missing label`);
            }

            if (Object.keys(action).filter(f => f !== 'name' && f !== 'label').length > 0) {
              error(`accessibilityActions: action "${action.name}" contains unrecognised keys`);
            }
          });
        }
      } else if ((0, _jsxAstUtils.hasProp)(node.attributes, 'onAccessibilityAction')) {
        error('accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array');
      }
    }
  })
};