/**
 * @description Common functions.
 * @author Lhfcws
 * @module
 */

/**
 * @description Shallow copy of an object.
 */
exports.copy = (_obj) ->
  obj = {}
  for key in Object.keys _obj
    obj[key] = _obj[key]
  return obj
