Proxy server to change auth0 tokens into username password basic auth header for orientdb

This web server stands between the user facing SPA and the orientdb database.
All queries from the SPA will have an 'authorization' 'bearer ' header with a token.

This token can be exchanged with AUTH0 for a user profile.
A database of usernames and passwords is kept (for now in sqlite).
If the user does not have an entry in the database, that means that they do not have an
account in orientdb. 

If there is no token in memory:
  If there is no record for this user in the database:
    create account with random passord for this user
    store record in database
    create token in memory for this user, password, token
  if there is a token in memory:
    create authorization header
  else
    return unauthorized
  proxy with authorization header

To do:
 1 - should it use promises ?
 2 - have it create the account in the database
     - not it will have to have admin access to the database to do this
     - limit connections to the database, to only this proxy server.
 3 - change to a database service  - maybe just use the orient ?

