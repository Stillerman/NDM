// Using a json schema, create a class in the database. Data driven schema
/*
  Need to recognize abstract scheme.

CREATE CLASS <class> [IF NOT EXISTS] [EXTENDS <super-class>] [CLUSTER <cluster-id>*] [CLUSTERS <total-cluster-number>] [ABSTRACT]

TODO : handle subtypes

Approach: use HTTP API for class creation
See http://orientdb.com/docs/last/OrientDB-REST.html

POST http://localhost:2480/command/Magnet_orders/sql/create class demo3 extends V
POST http://<server>:[<port>]/property/<database>/<class-name>/

{
  "fieldName": {
      "propertyType": "<property-type>"
  },
  "fieldName": {
      "propertyType": "LINK",
      "linkedClass": "<linked-class>"
  },
  "fieldName": {
      "propertyType": "<LINKMAP|LINKLIST|LINKSET>",
      "linkedClass": "<linked-class>"
  },
  "fieldName": {
      "propertyType": "<LINKMAP|LINKLIST|LINKSET>",
      "linkedType": "<linked-type>"
  }
}

To create property link is sql:
CREATE PROPERTY <class>.<property> <type> [<linked-type>|<linked-class>] [UNSAFE]
eg

insert into demo3 set firstName = 'Alex' , email = #12:9


Args: host, json payload
*/

// print process.argv
//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//});

//Required modules
var request = require('request');
var fs = require('fs');
var Ajv = require('ajv');

//Get JSON payload
var data; //holds json payload
var filePath = process.argv[2]; //json payload in file

try {
   data = JSON.parse(fs.readFileSync(filePath));
} catch ( err ) {
   // handle your file not found (or other error) here
   console.log('File not found'+err);
}
// Validate and transform json

var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
try {
    var validate = ajv.compile(data);
} catch ( err ) {
    console.log('Invalid json schema: ',err)
}


var username = 'admin';
var password = 'admin';
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var url = "http://localhost:2480/query/Magnet_orders/sql/SELECT from Person"
//var newclass = <<content from arg>>;


request.get( {url : url, headers : {"Authorization": auth, "content-type":"application/json"}},
	function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
  }
});
//json: true,body:requestedData
//requestedData created by parsing arg
