load csv with headers from "file:///run_list.csv" as row
MATCH (m:MiniProp {mp: row.mp}), (r:Run {r: row.run})
MERGE (m)-[:RUNON]->(r) return m,r;
