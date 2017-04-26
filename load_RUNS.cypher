load csv with headers from "file:///runs.csv" as row
CREATE (r:Run {r: row.RUN, entered: trim(row.ENTERED), brief: trim(row.BREIF), dbkey: row.dbkey})
RETURN r
