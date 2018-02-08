# NDM
Navigational Data Management

A set of tools for expressing and navigating relationships in scientific data.

The system is currently 3 dockers which talk to each other and expose a public
facing web server on port 80.

To begin
```
rm -rf orientdb/databases/Magnet_orders
rm -rf Proxy/db/user.db
docker-compose up
```
If things are working you should be able to then browse to localhost:80/some-thing

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
Browse to http://localhost and you should see the initial page.

Click login (upper right) and authenticate

Then browse to http://localhost/users
- you should see your details
 
