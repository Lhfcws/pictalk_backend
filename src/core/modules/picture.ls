/**
 * @description Picture Controller.
 * @author Lhfcws
 * @file
 **/

require! [assert, './picture-model', '../../conf/errors']


format = (ptobject) ->
  return ptobject

basedir = (url) ->
  a = url.split('/')
  a[a.length - 1] = ''
  return a.join('/')

basename = (url) ->
  a = url.match /\/[\w|.]+$/
  a = a[0].slice(1)
  return a

mimetype = (url) ->
  a = basename url
  a = a.split('.')
  return a[a.length - 1]


/**
 * @description picture-model Controller
 * @module
 */
Picture =
  
