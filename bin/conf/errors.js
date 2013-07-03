/**
 * @description Error list file.
 * @author Lhfcws
 * @file
 */
/**
 * @description Error level index.
 */
var errorLevelIndex, errorDictionary, Errors;
errorLevelIndex = [{
  0: 'Fatal-error',
  1: 'Dev-error',
  2: 'User-error',
  4: 'Warning'
}];
/**
 * @description An object include error message list for 4 error levels. 
 */
errorDictionary = {
  'SELECT_ERROR': 'Database select failed.',
  'FIND_ERROR': 'Database find failed.',
  'INSERT_ERROR': 'Database insert failed.',
  'UPDATE_ERROR': 'Database update failed.',
  'DELETE_ERROR': 'Database delete failed.',
  'COUNT_ERROR': 'Database count failed.',
  'USER_NCOMPLETE': 'User object is not complete, something vital like `email` or `username` or `password`',
  'USER_NEXIST': 'User does not existed.',
  'USER_DUPLICATE': 'User with the same email has existed, please change another one.',
  'USER_LOGIN': 'User does not existed or password is not correct.'
};
/**
 * @description An object include error information.
 * @class
 */
Errors = (function(){
  Errors.displayName = 'Errors';
  var prototype = Errors.prototype, constructor = Errors;
  function Errors(_errorLevel, _errVal){
    this.errorLevel = _errorLevel;
    this.errVal = _errVal;
    this.errMsg = errorDictionary[this.errVal];
    this.errorLevelMsg = errorLevelIndex[this.errorLevel];
  }
  prototype.show = function(){
    console.log('!!! ERROR OCCURS!\n');
    console.log('[' + this.errorLevelMsg + ']  ' + this.errMsg + '\n');
    console.log('!!!!!!');
  };
  return Errors;
}());
import$(module.exports, Errors);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}