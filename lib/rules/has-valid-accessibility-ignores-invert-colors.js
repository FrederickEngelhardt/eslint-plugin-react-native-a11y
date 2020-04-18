"use strict";

var _schemas = require("../util/schemas");

var _jsxAstUtils = require("jsx-ast-utils");

var _isNodePropValueBoolean = _interopRequireDefault(require("../util/isNodePropValueBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Enforce accessibilityIgnoresInvertColors property value is a boolean.
 * @author Dominic Coelho
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const propName = 'accessibilityIgnoresInvertColors';
const schema = (0, _schemas.generateObjSchema)();
const defaultInvertableComponents = ['Image'];

const hasValidIgnoresInvertColorsProp = ({
  attributes
}) => (0, _jsxAstUtils.hasProp)(attributes, propName) && (0, _isNodePropValueBoolean.default)((0, _jsxAstUtils.getProp)(attributes, propName));

const checkParent = ({
  openingElement,
  parent
}) => {
  if (hasValidIgnoresInvertColorsProp(openingElement)) {
    return false;
  } else if (parent.openingElement) {
    return checkParent(parent);
  }

  return true;
};
/**
 * @description varifies that the Image asset is imported from 'react-native' otherwise exits linting
 */


const verifyReactNativeImage = text => {
  const invertibleOptions = defaultInvertableComponents.map((c, index) => {
    if (index < defaultInvertableComponents.length - 1) {
      return `${c}|`;
    }

    return c;
  }).join('');
  const imageSourceReactNativeRegExp = new RegExp(`(?=import)(.*)(?={)(.*)(?<=${invertibleOptions})(.*)(.})(.*)(?=from)(.*)(?='react-native')`, 's');
  const hasReactNativeImage = text.match(imageSourceReactNativeRegExp);
  return hasReactNativeImage ? true : false;
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema]
  },
  create: ({
    options,
    report,
    getSourceCode
  }) => {
    // Checks to see if there are valid imports and if so verifies that those imports related to 'react-native' or if a custom module exists
    const {
      text
    } = getSourceCode();
    let hasCustomImage = false;

    if (text.match(new RegExp(/import/, 'g'))) {
      const hasReactNativeImage = verifyReactNativeImage(text);

      if (!hasReactNativeImage) {
        hasCustomImage = true;
      }
    } // avoid directly mutating a constant as it ends up stacking up duplicate strings


    const elementsToCheck = !hasCustomImage ? [...defaultInvertableComponents] : [];

    if (options.length > 0) {
      const {
        invertableComponents
      } = options[0];

      if (invertableComponents) {
        elementsToCheck.push(...invertableComponents);
      }
    } else if (hasCustomImage) {// Exit process if there is nothing to check
      // return {};
    }

    return {
      JSXElement: node => {
        /**
         * @description RegExp to select single or multiline 'Image' component and determine if the import origin path is 'react-native' or a custom module
         *  */
        // $FlowFixMe
        const {
          children,
          openingElement,
          parent
        } = node;

        if (!hasCustomImage && (0, _jsxAstUtils.hasProp)(openingElement.attributes, propName) && !(0, _isNodePropValueBoolean.default)((0, _jsxAstUtils.getProp)(openingElement.attributes, propName))) {
          report({
            node,
            message: 'accessibilityIgnoresInvertColors prop is not a boolean value'
          });
        } else {
          const type = (0, _jsxAstUtils.elementType)(openingElement);

          if (elementsToCheck.indexOf(type) > -1 && !hasValidIgnoresInvertColorsProp(openingElement) && children.length === 0) {
            let shouldReport = true;

            if (parent.openingElement) {
              shouldReport = checkParent(parent);
            }

            if (shouldReport) {
              report({
                node,
                message: 'Found an element which will be inverted. Add the accessibilityIgnoresInvertColors prop'
              });
            }
          }
        }
      }
    };
  }
};