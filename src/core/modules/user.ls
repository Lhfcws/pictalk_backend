/**
 * @description User Controller.
 * @author Lhfcws
 * @file
 **/

_path = '../'
require! [assert, './user-model', _path+'../conf/errors']

format = (user) ->
  if not user.email or not user.username
    throw errors.dev-error.USER_NCOMPLETE

  return {
    user-id: user.email
    email: user.email  or void
    mobile: user.mobile or void
    avatar: user.avatar or void
    password: user.password
    username: user.username
    sn: void
  }


/**
 * @description user-model Controller
 * @module
 */
User =
  user-exist: (user-id, callback) ->
    user-model.find-user {user-id: user-id}, (err, result) ->
      if not not result
        return callback null, true
      return callback null, false

  register: (user-obj, callback) ->
    user = format user-obj
    User.user-exist user.user-id, (err, exist) ->
      if exist
        return callback errors.user-error.USER_DUPLICATE
      user-model.insert-user user, (err) ->
        return callback null

  set-avatar: (user-obj, callback) ->
    assert not not user-obj.avatar
    user = {user-id: user-obj.user-id, avatar: user-obj.avatar}
    User.user-exist user.user-id, (err, exist) ->
      if not exist
        return callback errors.dev-error.USER_NEXIST
    user-model.update-user user, (err) ->
      return callback null

  update-user-information: (user-obj, callback) ->
    user = format user-obj
    User.user-exist user.user-id, (err, exist) ->
      if not exist
        return callback errors.dev-error.USER_NEXIST
      user-model.update-user user, (err) ->
        return callback null

  delete-user: (user-id, callback) ->
    user-model.delete-user {user-id: user-id}, (err) ->
      return callback null
