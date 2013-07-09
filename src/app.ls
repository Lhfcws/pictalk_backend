/**
 * @description Express app interface.
 * @author Lhfcws
 * @version 0.1
 */

require! [express, assert, datetime, http, path]

app = express!

# Configuration
app.configure !->
  app.set \port, process.env.PORT || 3000
  app.use app.router

app.configure \development , !->
  app.use express.errorHandler!

# Server
http.createServer app .listen app.get \port , !->
  console.log 'Express server listening on port' + app.get \port
