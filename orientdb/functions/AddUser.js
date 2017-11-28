var gdb = orient.getGraph();

//var v=gdb.addVertex('class:Person',{"firstname":firstname,"lastname":lastname}); //shouldn't this work? Where is API defined?!
try{
var newPerson = {"firstname":firstname,"lastname":lastname,"email":email,"phone":phone,"comment":comment};
var cmd = 'create vertex Person CONTENT ' + JSON.stringify(newPerson);
print('try '+cmd);
var v = gdb.command("sql",cmd);


if (password != null && password.length>0){
  print('found password: '+password+password.length);
//if password, fill in dbname, create oUser record with default role of reader    
  var dbname = firstname.concat("_",lastname);
  v.setProperty('dbname',dbname);
  
  cmd = "CREATE USER "+dbname+" IDENTIFIED by "+password+" ROLE reader";
  print('try '+cmd);
  var v1 = gdb.command("sql",cmd);
  //create link does not work in functions to create new links
  //since the property is already there, can we fill it with the @rid of the record v?
  
}

//Commit
gdb.commit();
} catch ( err ) {
    gdb.rollback();
    response.send(501, "Error on creating new Person", "text/plain", err.toString() );
}

if (v1 != null){
  print("DEBUG AddUser: "+v.getProperty("@rid")+"  "+v1.getProperty("@rid") );
  cmd = "UPDATE Person set ouser="+v1.getProperty("@rid")+" WHERE @rid="+v.getRecord().field('@rid');
  print('try '+cmd);
  gdb.command("sql",cmd);
  cmd = "UPDATE OUser set person="+v.getRecord().field('@rid')+" WHERE @rid="+v1.getProperty("@rid");
  print('try '+cmd);
  gdb.command("sql",cmd);
}

return [v,v1];
