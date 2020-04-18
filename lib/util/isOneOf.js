"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isOneOf;

/**
 * Returns boolean indicating whether a value to check
 * is one of a given set of values.
 * 
 */
// should be expanded to work with more than just strings
// as and when it's needed
function isOneOf(toCheck = '', values = []) {
  return values.includes(toCheck);
}