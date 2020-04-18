"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Describes the current state of a component to the user of an assistive technology.
 * @author JP Driver
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const validKeys = ['disabled', 'selected', 'checked', 'busy', 'expanded'];
module.exports = {
  meta: {
    docs: {},
    schema: [(0, _schemas.generateObjSchema)()]
  },
  create: context => ({
    JSXAttribute: node => {
      const attrName = (0, _jsxAstUtils.elementType)(node);

      if (attrName === 'accessibilityState') {
        const attrValue = (0, _jsxAstUtils.getPropValue)(node);

        const error = message => context.report({
          node,
          message
        });

        if (typeof attrValue !== 'object' || Array.isArray(attrValue)) {
          error('accessibilityState must be an object');
        } else {
          Object.entries(attrValue).map(([key, value]) => {
            if (validKeys.indexOf(key) < 0) {
              error(`accessibilityState object: "${key}" is not a valid key`);
            } else if (key === 'checked' && !(typeof value === 'boolean' || value === 'mixed')) {
              error(`accessibilityState object: "checked" value is not either a boolean or 'mixed'`);
            } else if (key !== 'checked' && typeof value !== 'boolean') {
              // $FlowFixMe
              const astObjectProp = node.value.expression.properties.find( // $FlowFixMe
              f => f.key.name === key); // we can't determine the associated value type of an Identifier expression
              // treat these cases as though they are valid
              // $FlowFixMe

              if (astObjectProp && astObjectProp.value.type !== 'Identifier') {
                error(`accessibilityState object: "${key}" value is not a boolean`);
              }
            }
          });
        }
      }
    }
  })
};