Find all the users whose names start with a letter or letters

  match (u:User) where u.name starts with 'wa' or u.name starts with 'l' return u;

Find all the miniproposals

  match (m:MiniProp) return m;

Find all the MiniProposals and their authors
   match (u:User)-[r:AUTHORED]->(m:MiniProp) return m,u;

Delete relationships with range of IDs
   match ()-[n]->() where (ID(n) >=260 and ID(n) <= 263) delete (n)

Find all MiniProps (or other things) that shiraiwa wrote
  $MATCH (u:User {name: 'shiraiwa'} ) - [:AUTHORED] -> (m) return u, m
