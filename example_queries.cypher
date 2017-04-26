Find all the users whose names start with a letter or letters

  match (u:User) where u.name starts with 'wa' or u.name starts with 'l' return u;

Find all the miniproposals

  match (m:MiniProp) return m;

Find all the MiniProposals and their authors
   match (u:User)-[r:AUTHORED]->(m:MiniProp) return m,u;
