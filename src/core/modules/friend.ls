/**
 * @description Friend Controller.
 * @author Lhfcws
 * @file
 **/

require! [async, assert, './friend-model', '../../conf/errors']

reverse_frd = (_frd) ->
  return {
    user-id: _frd.friend-id
    friend-id: _frd.user-id
  }

/**
 * @description friend-model Controller
 * @module
 */
friend =
  add-friend: (_friend, callback) ->
    condition = {}
    condition =
      user-id: _friend.user-id
      friend-id: _friend.friend-id
    condition1 = reverse_frd condition

    friend-model.friend-exist condition, (err, result) ->
      if not not result
        return callback 'Friend exist'

      condition.friend-nickname = _friend.friend-name
      condition1.friend-nickname = _friend.user-name

      async.series [
          (err, cb1)->
           friend-model.insert-friend condition, (err) ->
             return cb1 null
          ,
          (err, cb2) ->
            friend-model.insert-friend condition1, (err) ->
             return cb2 null
        ],
        (err) ->
          return callback null


  friend-exist: (_friend, callback) ->
    condition =
      user-id: _friend.user-id
      friend-id: _friend.friend-id

    friend-model.find-friend condition, (err, result) ->
      if not result
        return callback null, false
      return callback null, true

  update-friend-nickname: (_friend, callback) ->
    condition =
      user-id: _friend.user-id
      friend-id: _friend.friend-id

    friend.friend-exist condition, (err, exist) ->
      if not exist
        return callback errors.dev-error.friend_NEXIST

      condition.friend-nickname = _friend.nickname

      friend-model.update-friend condition, (err) ->
        return callback null
  
  get-friends-by-user: (_condition, callback) ->
    condition = { user-id:_condition.user-id }
    friend-model.get-friends condition, (err, result) ->
      return callback null, result

  delete-friend: (_condition, callback) ->
    condition = condition1 = {}
    fllag = false

    condition.user-id = _condition.user-id
    c
    if typeof _condition.friend-id == 'string'
      flag = true
      condition.friend-id = _condition.friend-id
      condition1 = reverse_frd condition

    async.series
      [ 
        (err, cb1)->
        if flag
          friend-model.delete-friend condition1, (err) ->
            return cb1 null
        else
          iterator = (frd, cb11)->
            _frd = reverse_frd frd
            friend-model.delete-friend _frd, (err0) ->
              if err0
                throw err0

          friend.get-friends condition, (err0, result) ->
            async.each result, iterator, (err1) ->
              return cb1 null
        ,
        (err, cb2) ->
        friend-model.delete-friend condition, (err) ->
          return cb2 null
      ],
      (err) ->
        return callback null


