var http = require('http');
var axios = require('axios')
var httpProxy = require('http-proxy');
var sqlite3 = require('sqlite3').verbose();

//
// hook up a database optonally creating it
// for now use sqlite - have to think about what to do with this
//
let db = new sqlite3.Database('./db/user.db', (err) => {
    if (err) console.error(err.message)

    console.log('Connected to the users database.')
    var query = 'CREATE TABLE IF NOT EXISTS users (sub varchar(32) PRIMARY KEY, username varchar(32) NOT NULL,password varchar(32) NOT NULL, table_constraint);'
    db.run(query)
    console.log('table created')
})

var tokens = {};
var proxy = httpProxy.createProxyServer({});

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
proxy.on('proxyReq', (proxyReq, req, res, options) => {
    if ('authorization' in req.headers) {
        tok = req.headers.authorization.split(" ")[1]; //Get the first auth tok

        if (!(tok in tokens)) {
            console.log("token for " + req.headers.authorization + " not stored");

            axios.post('https://mit-psfc.auth0.com/userinfo', {headers: {'content-type': 'application/json','authorization': req.headers.authorization}})
            .then(page => page.data)
            .then(JSON.parse)
            .then((bd) => {
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

            })
            .then(() => {
              if (tok in tokens) {
                  return {
                    username: tokens[tok].username,
                    password: tokens[tok].password
                  }
              }
              throw new Error('tok not in tokens!')
            })
            .then((usr, pass) => {
              proxyReq.setHeader('Authorization', 'Basic ' + new Buffer(username + ':' + password).toString('base64'));

            })
        }
    }
});

var server = http.createServer(function(req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:8080'
    });
});

console.log("listening on port 5050");
server.listen(5050);
