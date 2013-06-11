/**
 * @description Error message map file.
 * @author Lhfcws
 * @file
 */

error-level = [
  fatal-error,
  dev-error ,
  user-error,
  warning
]


fatal-error =
  \SELECT_ERROR : 'Database select failed.'
  \FIND_ERROR : 'Database find failed.'
  \INSERT_ERROR : 'Database insert failed.'
  \UPDATE_ERROR : 'Database update failed.'
  \DELETE_ERROR : 'Database delete failed.'
  \COUNT_ERROR : 'Database count failed.'

dev-error =
  \USER_NCOMPLETE : 'User object is not complete, something vital like `email` or `username` or `password`'
  \USER_NEXIST : 'User does not existed.'

user-error =
  \USER_DUPLICATE : 'User with the same email has existed, please change another one.'

warning = {}

get-error-level = (errmsg) ->
  for err, lvl in error-level
    for key, msg of err
      if msg == errmsg
        return lvl

Error-obj =
  error-level : error-level
  get-error-level : get-error-level
  fatal-error : fatal-error
  dev-error : dev-error
  user-error : user-error
  warning : warning
