# NDM
Navigational Data Management

A set of tools for expressing and navigating relationships in scientific data.

The system is currently 3 dockers which talk to each other and expose a public
facing web server on port 80.

to begin
```
    rm -rf Proxy/db/user.db  orientdb/databases/*
    docker-compose build --force-rm
    docker-compose up
    browse to localhost
    click login
    provide psfc credentials
        (say yes for profile access)
    browse to local/host/users

    cd orientdb/functions/
    npm install --save
    ./loadSchema.sh
    Browse to localhost:2480
        login admin/admin
    click schema tab
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
