"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not apparent from the accessibility label.
 * @author JP Driver
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {},
    schema: [schema]
  },
  create: context => ({
    JSXOpeningElement: node => {
      if ((0, _jsxAstUtils.hasProp)(node.attributes, 'accessibilityLabel') && !(0, _jsxAstUtils.hasProp)(node.attributes, 'accessibilityHint')) {
        context.report({
          node,
          message: 'has accessibilityLabel prop but no accessibilityHint'
        });
      }
    }
  })
};