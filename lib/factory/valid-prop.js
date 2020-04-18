"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _isOneOf = _interopRequireDefault(require("../util/isOneOf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Produces an ESLint rule that validates a prop against an array of acceptable values
 *
 * @param {string} propName Name of prop to validate
 * @param {Array<string>} validValues Array of possible valid values
 * @param {string} errorMessage Error message to present if prop is not a valid value
 */
const createValidPropRule = (propName, validValues, errorMessage, meta, create) => ({
  meta: {
    docs: {},
    schema: [(0, _schemas.generateObjSchema)()],
    ...meta
  },
  create: context => ({
    JSXAttribute: node => {
      const attrName = (0, _jsxAstUtils.elementType)(node);

      if (attrName === propName) {
        // ensure we are only checking literal prop values
        const attrValue = (0, _jsxAstUtils.getLiteralPropValue)(node);
        let invalid = false;

        if (Array.isArray(attrValue)) {
          const validate = attrValue.map(strValue => (0, _isOneOf.default)(strValue, validValues));
          invalid = validate.indexOf(false) > -1;
        } else {
          invalid = !(0, _isOneOf.default)(attrValue, validValues);
        }

        if (invalid) {
          context.report({
            node,
            message: errorMessage
          });
        }
      }
    },
    ...create
  })
});

var _default = createValidPropRule;
exports.default = _default;