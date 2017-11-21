var http = require('http');
// Should this all be done with promises instead of synchronously
// Do I need to finialize the get before insert in the database
//

var rp = require('request-promise')

var httpProxy = require('http-proxy');
var sqlite3 = require('sqlite3').verbose();
var proxy = httpProxy.createProxyServer({});
var tokens = {};
//
// hook up a database optonally creating it
// for now use sqlite - have to think about what to do with this
//
let db = new sqlite3.Database('./db/user.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
  var query = 'CREATE TABLE IF NOT EXISTS users (sub varchar(32) PRIMARY KEY, username varchar(32) NOT NULL,password varchar(32) NOT NULL, table_constraint);'
  db.run(query);
  console.log('table created');
});
//  Database holds users
//     sub - returned by auth0
//     username - nickname returned by auth0
//     password - generated and used to create acount
//     token - stored in database for now
// figure out the username and password
// if there is no authorization header then
//   reject this request
// if the token is already associated then
//   use its username, password (verify it )?
// else if the user has a record (already has a db account)
//   associate its token
//   use its username and password
// else
//   make them a database account
//   make them a record of username and password
//   associate this token
//   use this username and password
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  var username;
  var password;
  if (tok in tokens) {
    username = tokens[tok].username;
    password = tokens[tok].password;
    proxyReq.setHeader('Authorization', 'Basic ' + new Buffer(username + ':' + password).toString('base64'));
  }
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  var username;
  var password;
  if ('authorization' in req.headers) {
    tok = req.headers.authorization.split(" ")[1]
    if (!(tok in tokens)) {
      console.log("token for " + req.headers.authorization + " not stored");
      rp({
        method: 'POST',
        url: "https://mit-psfc.auth0.com/userinfo",
        headers: {
          'content-type': 'application/json',
          'authorization': req.headers.authorization,
        }
      })
      .then((body) => {
        console.log(body);
        if (body.startsWith('Unauthorized')) {
          res.statusCode = 401
          res.end = 'Authentication service returned an error ' + error;
        }
        else {
          bd = JSON.parse(body);
          db.get('select username, password from users where sub = ?', [bd.sub], function(err, row) {
            if (err || !(row)) {
              console.log('row is not in database');
              username = bd.nickname;
              password = Math.random().toString(36).substring(2);
              // createAccount(username, password);
              tokens[tok] = {
                'username': username,
                'password': password
              };
              console.log('username: ' + username, '  password: '+ password);
              db.run("insert into users (sub, username, password) values(?, ?, ?)", [bd.sub, username, password], function(err){ console.log(err)});
              console.log("inserted");
            } else {
              tokens[tok] = {
                'username': row.username,
                'password': row.password
              };
            }
          })
        }
      })
      .catch(err => {
        console.log('Authentication service returned an error '+ error);
        res.statusCode = 500
        res.end = 'Authentication service returned an error ' + error;
      })
    }
  }
  proxy.web(req, res, {
    target: 'http://127.0.0.1:8080'
  });
});

console.log("listening on port 5050");
server.listen(5050);
