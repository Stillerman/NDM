LOAD CSV WITH HEADERS FROM "file:///miniprops_guid.csv" AS row 
CREATE (:MiniProp {
   mp: toInteger(row.id), 
   id: toInteger(row.mp), 
   date_filed: row.date_filed, 
   title: trim(row.title), 
   url: trim(row.url), 
   status : trim(row.status), 
   name : trim(row.name), 
   file_date : trim(row.file_date), 
   obj_guid: right(left(row.GUID,37),36)});
