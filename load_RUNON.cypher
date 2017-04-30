load csv with headers from "file:///run_list.csv" as row
MATCH (m:MiniProp {id: toInt(row.mp)}), (r:Run {r: toInt(row.run)})
MERGE (m)-[:RUNON]->(r) return m,r;
