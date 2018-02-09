#!/bin/sh
echo $ORIENTDB_NAME 
echo $ORIENTDB_ROOT_PASSWORD
echo $ORIENTDB_PROXY_PASSWORD
/orientdb/bin/console.sh <<EOF
SET echo TRUE
CREATE DATABASE plocal:/orientdb/databases/$ORIENTDB_NAME root $ORIENTDB_ROOT_PASSWORD;
CREATE CLASS _NDMOBJECT EXTENDS V ABSTRACT;
create property _NDMOBJECT.createdBy STRING;
create property _NDMOBJECT.creationTime STRING;
create property _NDMOBJECT.guid STRING;

alter property  _NDMOBJECT.createdBy default 'GetUser()';
alter property  _NDMOBJECT.creationTime default 'sysdate()';
alter property  _NDMOBJECT.guid default 'uuid()';

CREATE CLASS Person EXTENDS V;

create property Person.createdBy STRING;
create property Person.creationTime STRING;
create property Person.guid STRING;

alter property  Person.creationTime default 'sysdate()';
alter property  Person.guid default 'uuid()';


create property Person.firstname STRING;
create property Person.lastname STRING;
create property Person.email STRING;
create property Person.phone STRING;
create property Person.comment STRING;
create property Person.dbname STRING;

alter property Person.firstname MANDATORY true;
alter property Person.lastname MANDATORY true;
alter property Person.email MANDATORY true;

alter property Person.firstname NOTNULL true;
alter property Person.lastname NOTNULL true;
alter property Person.email NOTNULL true;

CREATE USER Proxy IDENTIFIED BY $ORIENTDB_PROXY_PASSWORD ROLE admin;

CREATE LINK ouser TYPE LINK FROM Person.dbname TO OUser.name;
CREATE LINK person TYPE LINK FROM Person.dbname TO OUser.name INVERSE;

CREATE FUNCTION GetUser "//Get the user from an HTTP query\nvar g = orient.getGraph();\n\n  try{\n      var user = request.getUser();\n\n\n      var edge = 'select ?';\n      var v = g.command('sql', edge, [user]);\n  \n      g.commit();\n\n      v = g.command('sql', 'select from Person where dbname=?',[user]);\n      g.commit();\n    \n      if (v.length > 0) {\n        return v[0].getRecord().field('@rid').toString(); //without toString() ODB helpfully pulls the full record for the @rid\n      } else { //this command will work if the user has read permissions on OUser, eg an admin\n          v = g.command('sql', 'select from OUser where name=?',[user]);\n          g.commit();\n	  if v.length>0 {\n              return v[0].getRecord().field('@rid').toString();\n	  } else { return user;} // final fallback is to return the name if  not found in either Person or OUser classes\n      }\n        \n   }\n   catch(err){\n     g.rollback();\n     response.send(500, 'Error on creating new user', 'text/plain', err.toString() ); \n   }\n\n" LANGUAGE javascript

CREATE FUNCTION AddUser "var gdb = orient.getGraph();\n\n//var v=gdb.addVertex('class:Person',{\"firstname\":firstname,\"lastname\":lastname}); //shouldn't this work? Where is API defined?!\ntry{\nvar newPerson = {\"firstname\":firstname,\"lastname\":lastname,\"email\":email,\"phone\":phone,\"comment\":comment};\nvar cmd = 'create vertex Person CONTENT ' + JSON.stringify(newPerson);\nprint('try '+cmd);\nvar v = gdb.command(\"sql\",cmd);\n\n\nif (password != null && password.length>0){\n  print('found password: '+password+password.length);\n//if password, fill in dbname, create oUser record with default role of reader    \n  var dbname = firstname.concat(\"_\",lastname);\n  v.setProperty('dbname',dbname);\n  \n  cmd = \"CREATE USER \"+dbname+\" IDENTIFIED by \"+password+\" ROLE reader\";\n  print('try '+cmd);\n  var v1 = gdb.command(\"sql\",cmd);\n  //create link does not work in functions to create new links\n  //since the property is already there, can we fill it with the @rid of the record v?\n  \n}\n\n//Commit\ngdb.commit();\n} catch ( err ) {\n    gdb.rollback();\n    response.send(501, \"Error on creating new Person\", \"text/plain\", err.toString() );\n}\n\nif (v1 != null){\n  print(\"DEBUG AddUser: \"+v.getProperty(\"@rid\")+\"  \"+v1.getProperty(\"@rid\") );\n  cmd = \"UPDATE Person set ouser=\"+v1.getProperty(\"@rid\")+\" WHERE @rid=\"+v.getRecord().field('@rid');\n  print('try '+cmd);\n  gdb.command(\"sql\",cmd);\n  cmd = \"UPDATE OUser set person=\"+v.getRecord().field('@rid')+\" WHERE @rid=\"+v1.getProperty(\"@rid\");\n  print('try '+cmd);\n  gdb.command(\"sql\",cmd);\n}\n\nreturn [v,v1];\n" PARAMETERS [firstname, lastname, email, phone, comment, password] LANGUAGE javascript
exit
EOF
