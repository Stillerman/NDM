var g = orient.getGraph();
try{
var db = orient.getDatabase();
var user= db.getUser()+"";
var cmd = "select from OUser where name='"+user+"'";
var v = g.command("sql",cmd);
g.commit();
v = g.command('sql', 'select from Person where dbname=?',[user]);
g.commit();
return v[0].getRecord().field('@rid').toString();
}
catch(err){
g.rollback();
response.send(500, "Error on creating new user. This function only works for HTTP requests.", "text/plain", err.toString() );
}
