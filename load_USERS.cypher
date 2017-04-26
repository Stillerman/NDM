USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:///users.csv" AS row
CREATE (:User {name : row.name, PO : row.PO, EO : row.EO, active : row.active,	phone : row.phone,	crphone : row.crphone,	email : row.email,	address : row.address,	firstname : row.firstname,	lastname : row.lastname,	fullname : row.fullname, hidden : row.hidden,	comment : row.comment} );
