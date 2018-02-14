# NDM
Navigational Data Management

A set of tools for expressing and navigating relationships in scientific data.

The system is currently 3 dockers which talk to each other and expose a public
facing web server on port 80.

To begin:

Logins are handled by auth0 https://auth0.com/  
and configured by creating your own copy of

```
Client/src/auth/auth0-variables.js 
export const AUTH_CONFIG = {
  clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  domain: 'xxx.auth0.com',
  callbackUrl: 'http://localhost:8080/callback/',
  apiUrl: 'API_IDENTIFIER'
}
```

If you have already run the system, and want to start with a clean database

```
rm -rf orientdb/databases/Magnet_orders
rm -rf Proxy/db/user.db
```
Build and run the server
```
docker-compose build
docker-compose up
```

To load the example HTS magnet testing schema
```
cd orientdb/functions
npm install --save
./loadSchema.sh
```
If things are working you should be able to then browse to localhost:80/some-thing

Browse to http://localhost and you should see the initial page.

Click login (upper right) and authenticate

Then browse to http://localhost/users
- you should see your details
 
You can inspect the orientdb database by:
```
browse to http://localhost:2480
login in to ndm database as admin/admin
click the 'schema tag'
```
