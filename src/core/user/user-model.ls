/**
 * @description User model.
 * @author Lhfcws
 * @file
 **/

_path = '../'
require! [_path+'database', _path+'model',  async]
db = database.sync-db!
/**
 * @description Include some methods to visit user data.
 * @module
 **/
User-model =
  insert-user: (user, callback)->
    model.insert \user, user, (err) ->
      if err
        throw err
      return callback null

  delete-user: (user, callback)->
    model.delete \user, user, (err) ->
      if err
        throw err
      return callback null

  
