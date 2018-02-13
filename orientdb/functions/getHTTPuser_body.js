//Get the user from an HTTP query
var g = orient.getGraph();

  try{
      var user = request.getUser();


      var edge = 'select ?';
      var v = g.command('sql', edge, [user]);
  
      g.commit();

      v = g.command('sql', 'select from Person where dbname=?',[user]);
      g.commit();
    
      if (v.length > 0) {
        return v[0].getRecord().field('@rid').toString(); //without toString() ODB helpfully pulls the full record for the @rid
      } else { //this command will work if the user has read permissions on OUser, eg an admin
          v = g.command('sql', 'select from OUser where name=?',[user]);
          g.commit();
	  if v.length>0 {
              return v[0].getRecord().field('@rid').toString();
	  } else { return user;} // final fallback is to return the name if  not found in either Person or OUser classes
      }
   }
   catch(err){
     g.rollback();
     response.send(500, "Error on creating new user", "text/plain", err.toString() ); 
   }

