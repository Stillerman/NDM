# Setting up database and functions for tracking procurement in the magnet group
 
In this initial phase, set up a schema with Persons and OUsers. Persons is for tracking people and OUsers are database users with 
a username and password. There can be standalone entries for each and entries that are LINKed through the properites person and ouser in OUser 
Person respectively. For example, below we create a Proxy database user for the proxy to relay db queries. It has no associated Person entry.

### Setup
These instructions assume that you have an orientdb server up and running using the instructions in the README.md file.

Using Studio. Select 'New database' using server user and
password. Name it Magnet_orders. Note that there is a default
db user/pass of admin/admin.

Enter the following commands in the console:
```
CREATE VERTEX Person EXTENDS V

CREATE USER Proxy IDENTIFIED BY serverpw ROLE admin

CREATE LINK ouser TYPE LINK FROM Person.dbname TO OUser.name
CREATE LINK person TYPE LINK FROM Person.dbname TO OUser.name INVERSE
```

Go to Schema tab and create a new vertex class, Person. Note
that the db user class is =ouser=. Click on the new Person
class and use the =New Property= button to fill out a schema
for it: firstname, lastname, email, phone, comment,
dbname.


In the Studio, go to Functions tab. Create a new function, AddUser.

Add the six arguments: firstname, lastname, email, phone, comment, password

Paste in the contents of [AddUser](functions/AddUser.js)

Test with Postman:

     GET http://localhost:2480/function/Magnet_orders/AddUser/Josh/Sillerman/jms@psfc.mit.edu/empty/empty/changeme77/

Will create a Person, Josh Stillerman, with an OUser name, Josh_Stillerman and link the two. If the password field is omitted, 
no OUser linked record is created. Presently, the function uses positional fields, we could provide all the arguments in a JSON
payload if preferred.


TODO: Wrap this all up in a dockerfile to instantiate easily.

