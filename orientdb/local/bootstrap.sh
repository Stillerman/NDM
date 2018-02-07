#!/orientdb/bin/console.sh
CREATE DATABASE plocal:/orientdb/databases/Magnet_orders root ankmyx;
CREATE CLASS Person EXTENDS V;
create property Person.firstname STRING;
create property Person. lastname STRING;
create property Person.email STRING;
create property Person.phone STRING;
create property Person.comment STRING;
create property Person.dbname STRING;

alter property Person.firstname MANDATORY true;
alter property Person. lastname MANDATORY true;
alter property Person.email MANDATORY true;

alter property Person.firstname NOTNULL true;
alter property Person. lastname NOTNULL true;
alter property Person.email NOTNULL true;

CREATE USER Proxy IDENTIFIED BY serverpw ROLE admin;

CREATE LINK ouser TYPE LINK FROM Person.dbname TO OUser.name;
CREATE LINK person TYPE LINK FROM Person.dbname TO OUser.name INVERSE;

CREATE FUNCTION whoAmI "return db.getUser()+'';" LANGUAGE javascript

CREATE FUNCTION AddUser "var gdb = orient.getGraph();\n\n//var v=gdb.addVertex('class:Person',{\"firstname\":firstname,\"lastname\":lastname}); //shouldn't this work? Where is API defined?!\ntry{\nvar newPerson = {\"firstname\":firstname,\"lastname\":lastname,\"email\":email,\"phone\":phone,\"comment\":comment};\nvar cmd = 'create vertex Person CONTENT ' + JSON.stringify(newPerson);\nprint('try '+cmd);\nvar v = gdb.command(\"sql\",cmd);\n\n\nif (password != null && password.length>0){\n  print('found password: '+password+password.length);\n//if password, fill in dbname, create oUser record with default role of reader    \n  var dbname = firstname.concat(\"_\",lastname);\n  v.setProperty('dbname',dbname);\n  \n  cmd = \"CREATE USER \"+dbname+\" IDENTIFIED by \"+password+\" ROLE reader\";\n  print('try '+cmd);\n  var v1 = gdb.command(\"sql\",cmd);\n  //create link does not work in functions to create new links\n  //since the property is already there, can we fill it with the @rid of the record v?\n  \n}\n\n//Commit\ngdb.commit();\n} catch ( err ) {\n    gdb.rollback();\n    response.send(501, \"Error on creating new Person\", \"text/plain\", err.toString() );\n}\n\nif (v1 != null){\n  print(\"DEBUG AddUser: \"+v.getProperty(\"@rid\")+\"  \"+v1.getProperty(\"@rid\") );\n  cmd = \"UPDATE Person set ouser=\"+v1.getProperty(\"@rid\")+\" WHERE @rid=\"+v.getRecord().field('@rid');\n  print('try '+cmd);\n  gdb.command(\"sql\",cmd);\n  cmd = \"UPDATE OUser set person=\"+v.getRecord().field('@rid')+\" WHERE @rid=\"+v1.getProperty(\"@rid\");\n  print('try '+cmd);\n  gdb.command(\"sql\",cmd);\n}\n\nreturn [v,v1];\n" PARAMETERS [firstname, lastname, email, phone, comment, password] LANGUAGE javascript

