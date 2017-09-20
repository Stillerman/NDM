load csv with headers from "file:///new_runs.csv" as row
CREATE (r:Run {r: toInt(row.RUN), entered: trim(row.ENTERED), brief: trim(row.BREIF), dbkey: toInt(row.dbkey)})
RETURN r
