/**
 * @description Express app interface.
 * @author Lhfcws
 * @version 0.1
 */
var express, assert, datetime, http, path, app;
express = require('express');
assert = require('assert');
datetime = require('datetime');
http = require('http');
path = require('path');
app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(app.router);
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
http.createServer(app).listen(app.get('port', function(){
  console.log('Express server listening on port' + app.get('port'));
}));