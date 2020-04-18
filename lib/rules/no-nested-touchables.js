"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _isTouchable = _interopRequireDefault(require("../util/isTouchable"));

var _findChild = _interopRequireDefault(require("../util/findChild"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Enforce if a view has accessible={true}, that there are no clickable elements inside
 * @author Alex Saunders
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const errorMessage = 'Elements with accessible={true} must not have any clickable elements inside';
const schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {},
    schema: [schema]
  },
  create: context => ({
    JSXOpeningElement: node => {
      const {
        parent
      } = node;
      const accessibleProp = (0, _jsxAstUtils.getProp)(node.attributes, 'accessible');
      const accessible = (0, _jsxAstUtils.getPropValue)(accessibleProp);

      if (accessible) {
        const clickableChild = (0, _findChild.default)(parent, child => (0, _isTouchable.default)(child, context) || (0, _jsxAstUtils.elementType)(child) === 'Button');

        if (clickableChild) {
          context.report({
            node,
            message: errorMessage
          });
        }
      }
    }
  })
};