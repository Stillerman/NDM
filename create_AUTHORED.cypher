MATCH (u:User), (m:MiniProp) where m.fullname = u.fullname
MERGE (u)-[r:AUTHORED]->(m) return r;
