"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateObjSchema = exports.enumArraySchema = exports.arraySchema = void 0;

/**
 * JSON schema to accept an array of unique strings
 */
const arraySchema = {
  type: 'array',
  items: {
    type: 'string'
  },
  uniqueItems: true,
  additionalItems: false
};
/**
 * JSON schema to accept an array of unique strings from an enumerated list.
 */

exports.arraySchema = arraySchema;

const enumArraySchema = (enumeratedList = [], minItems = 0) => Object.assign({}, arraySchema, {
  items: {
    type: 'string',
    enum: enumeratedList
  },
  minItems
});
/**
 * Factory function to generate an object schema
 * with specified properties object
 */


exports.enumArraySchema = enumArraySchema;

const generateObjSchema = (properties = {}, required) => ({
  type: 'object',
  properties,
  required
});

exports.generateObjSchema = generateObjSchema;