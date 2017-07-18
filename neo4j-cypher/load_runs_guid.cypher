load csv with headers from "file:///runs_guid.csv" as row 
CREATE (r:Run {
    run: toInteger(row.RUN), 
    entered: trim(row.ENTERED), 
    brief: trim(row.BREIF), 
    dbkey: toInteger(row.dbkey),
    obj_guid: right(left(row.GUID,37),36)
})
