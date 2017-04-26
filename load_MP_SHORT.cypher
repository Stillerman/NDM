USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:///mp_short.csv" AS row
CREATE (:MiniProp {mp: row.mp, id: row.id, date_filed: row.date_filed, title: row.title, url: row.url, status : row.status, fullname : row.fullname, file_date : row.file_date});
