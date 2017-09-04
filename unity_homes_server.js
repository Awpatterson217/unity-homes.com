const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
/**
 * Initializations
 */
const port = 3000;
const host = '127.0.0.4';
const app  = express();
//        OPTIONS
const defaultGetOptions = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
}
const redisOptions = {
  port: 6379
}
/**
 * Middleware
 */
app.use(helmet());
app.use(
  session({
    store: new RedisStore(redisOptions),
    secret: 'keyboard cat'
  })
);
//app.use('/', express.static(__dirname + 'public/static/css/'));
//app.use('/', express.static(__dirname + 'public/static/img/'));
//app.use('/', express.static(__dirname + 'public/static/js/'));
//app.use('/', express.static(__dirname + 'public/static/external/'));
//        ROUTES
app.get('/unity-homes', function (req, res, next) {
  let target = req.params.name;
  res.sendFile('views/index.html', defaultGetOptions, function (err) {
    if (err)
      next(err);  
    else
      console.log('Sent:', target);
  });
});
/**
 * Server
 */
const server = app.listen(port, host, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});