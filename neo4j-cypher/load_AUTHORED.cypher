MATCH (u:User), (m:MiniProp) where m.name = u.name
 MERGE (u)-[r:AUTHORED]->(m) return m, u;
