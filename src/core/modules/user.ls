/**
 * @description User Controller.
 * @author Lhfcws
 * @file
 **/

require! [assert, MD5,  './user-model', '../../conf/errors']

format = (user) ->
  if not user.email or not user.username
    throw errors.dev-error.USER_NCOMPLETE

  return {
    user-id: user.email
    email: user.email  or void
    mobile: user.mobile or void
    avatar: user.avatar or void
    password: MD5 user.password
    username: user.username
    sn: void
  }


/**
 * @description user-model Controller
 * @module
 */
User =
  login: (user-obj, callback) ->
    user = {}
    user.user-id = user-obj.user-id
    user.password = user-obj.password

    user-model.find-user user, (err, result) ->
      if not result
        return callback new errors 2, 'USER_LOGIN'
      return callback null

  user-exist: (_user, callback) ->
    if typeof _user == 'string'
      condition.user-id = _user
    else if typeof _user == 'object'
      condition = _user

    user-model.find-user condition, (err, result) ->
      if not not result
        return callback null, true
      return callback null, false

  register: (user-obj, callback) ->
    user = format user-obj
    User.user-exist user.user-id, (err, exist) ->
      if exist
        return callback new errors 2, 'USER_DUPLICATE'
      user-model.insert-user user, (err) ->
        return callback null

  set-avatar: (user-obj, callback) ->
    assert not not user-obj.avatar
    user = {user-id: user-obj.user-id, avatar: user-obj.avatar}
    User.user-exist user.user-id, (err, exist) ->
      if not exist
        return callback new errors 1, 'USER_NEXIST'
    user-model.update-user user, (err) ->
      return callback null

  update-user-info: (user-obj, callback) ->
    user = format user-obj
    User.user-exist user.user-id, (err, exist) ->
      if not exist
        return callback new errors 1, 'USER_NEXIST'
      user-model.update-user user, (err) ->
        return callback null

  delete-user: (user-id, callback) ->
    user-model.delete-user {user-id: user-id}, (err) ->
      return callback null

  change-password: (user-obj, callback) ->
    user = {}
    user.password = MD5 user-obj.password
    user.user-id = user-obj.user-id

    user-model.user-exist user, (err, exist) ->
      if not exist
        return callback new errors 1, 'USER_NEXIST'

      delete user.user-id
      user.password = MD5 user-obj.new-password
      user-model.update-user user, (err) ->
        return callback null

  get-a-user: (user-obj, callback) ->
    user-model.find-user user-obj, (err, result) ->
      if err
        throw err
      if not result
        return callback new errors 1, 'USER_NEXIST'
      return callback null, result

  get-users: (user-obj, callback) ->
    user-model.select-user user-obj, (err, result) ->
      if err
        throw err
      if not result
        return callback new errors 1, 'USER_NEXIST'
      return callback null, result
