USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:///mp_short.csv" AS row
CREATE (:MiniProp {mp: toInt(row.id), id: toInt(row.mp), date_filed: row.date_filed, title: trim(row.title), url: trim(row.url), status : trim(row.status), fullname : trim(row.fullname), file_date : trim(row.file_date)});
