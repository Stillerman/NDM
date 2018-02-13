// Using a json schema, create a class in the database. Data driven schema
/*
  Need to recognize abstract scheme.

CREATE CLASS <class> [IF NOT EXISTS] [EXTENDS <super-class>] [CLUSTER <cluster-id>*] [CLUSTERS <total-cluster-number>] [ABSTRACT]

TODO : handle subtypes

Approach: use HTTP API for class creation
See http://orientdb.com/docs/last/OrientDB-REST.html


Command to add properties:

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

Command to create class:
http://<server>:[<port>]/class/<database>/<class-name>

eg:
POST http://localhost:2480/class/Magnet_orders/new_class

but cannot extend.

This works:

POST http://localhost:2480/batch/Magnet_orders/sql/
{ "transaction" : false,
  "operations" : [
    {
      "type" : "cmd",
      "language" : "sql",
      "command" : "create class demo7 extends V"
    }, {
      "type" : "cmd",
      "language" : "sql",
      "command" : "create property demo7.id string"
    }, 
  ]
}

or

POST http://localhost:2480/command/Magnet_orders/sql/create class ndmObject extends V abstract 
------

To create property link is sql:
CREATE PROPERTY <class>.<property> <type> [<linked-type>|<linked-class>] [UNSAFE]
eg

insert into demo3 set firstName = 'Alex' , email = #12:9


Upload or retrieve schema document from database:

HTTP GET request: http://localhost:2480/documentbyclass/demo/Profile/0

Args: host, json payload
*/

// print process.argv
//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//});


//--------------------------------------------------------------------------------------------------



//Required modules
var request = require('request'); //
var fs = require('fs');
var Ajv = require('ajv');


//Get JSON payload from file. This block could be replaced by an argument
var data; //holds json payload from file
var filePath = process.argv[2]; //json payload in file

try {
   data = JSON.parse(fs.readFileSync(filePath));
} catch ( err ) {
   // handle your file not found (or other error) here
   console.log('File not found'+err); // logic to exit or throw for node or webpage
}
// Validate and transform json

var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
try {
    var validate = ajv.compile(data);
} catch ( err ) {
    console.log('Invalid json schema: ',err)
}

//----------------------------------------------------------------
//construct json payload.
//Make json objects and convert to payload strings
//POST http://<server>:[<port>]/property/<database>/<class-name>/
//----------------------------------------------------------------




//recursively find keys in json
var jsonschema = "";
var defstr = "#/definitions/";
var ldefstr = defstr.length;
function printValues(obj) {
    var jsonschema = "";    
    for (var key in obj) {
	if(obj.hasOwnProperty(key)){
	if (typeof obj[key] === "object") {
	    console.log("\n");
	    console.log('nested key: '+key);
	    jsonschema+=JSON.stringify(obj[key])+":"+key;
	    printValues(obj[key]);
	} else {
	    switch (key) { //handle special cases
  	    case "$ref":
		console.log('reference keyword '+ obj[key]);
		if (obj[key].substring(0,14) ==='#/definitions/'){
		    console.log(obj[key].substring(14)+' should be in database schema');}
		break;
 	    case "defaultvalue":
		console.log('defaultvalue keyword');
		break;
	    default:
 		console.log(key + " : " + obj[key]+' type of '+ typeof obj[key]);
		break;
	    }
	}
	}
    }
    return jsonschema;
}


//Now get properties recursively
var ans=printValues(data.properties);
console.log('printvalues type ',typeof ans);
console.log('printvalues return '+ans);
console.log('-----------------------------------------------');

//We now have JSON object in a JSON-Schema
//Extract the class, determine if it is an abstract one
//and if it extends another class.
//definitions are given for completeness and schema validation
//but are not currently used, rather we expect them to already be implemented
//In the future, we may also recursively create dependencies

//Get class info to create initial class
var classname = data.title;
var abstractclass = "";
var extendsclass = [];
    
if (classname.substring(0,1) === "_") {
    console.log("ABSTRACT class detected");
    abstractclass = " ABSTRACT ";
    // classname = classname.substring(1); //keep underscore for abstract class name
}

/* nonstandard and redundant if cleaner
if(data.extends){
    extendsclass = " extends " + data.extends;
}
*/

// Get list superclasses

if(data.allOf){ //enumerating a list gives index numbers instead of keys
    if (data.allOf.length>=1){
	for (var item in data.allOf) {
	    for (var key in data.allOf[item]){
		if (key==="$ref")
		{
		    var obj=data.allOf[item];
		    console.log('reference keyword '+ obj[key]);
		    var fdef=obj[key].search(defstr);
		    if (fdef != -1)
		    {
			fdef=fdef+ldefstr;
			console.log('found it ???',fdef,obj[key].substring(fdef));
			var defstring=obj[key].substring(fdef);
		    } else {var defstring=obj[key];}
		    console.log("    "+defstring+' should be in database schema');
		    extendsclass.push(defstring);//make list
		}
	    }
	    console.log('data.allOf '+ JSON.stringify(data.allOf[item])+" " + typeof item);}}}

if (extendsclass!=''){  
    extendsclass=' extends ' + extendsclass;
}

console.log("Detected class ", classname);
console.log("Inheritance: ", extendsclass);


//POST http://localhost:2480/batch/Magnet_orders/sql/
var makeclassTemplate = 
    { transaction : false,
      operations : [
	  {
	      type : "cmd",
	      language : "sql",
	      command : "create class " //+ ${this.classname} ${this.baseclass}"
	  }
      ]
    }


const alterPropertyTemplate = 
    { transaction : false,
      operations : [
	  {
	      type : "cmd",
	      language : "sql",
	      command : "alter property "
	  }
      ]
    }

var makeclass=JSON.parse(JSON.stringify(makeclassTemplate));

makeclass.operations[0].command+=(classname+extendsclass+abstractclass);
console.log('makeclass :',makeclass);


var linkTemplate = 
    {
	    propertyType: "LINK",
	    linkedClass: "<theclass>"
    };

var propertyTemplate =
    {
	"propertyType": "<thetype>"
    };

var properties = {};
var alterproperties = "";
var obj, refclass;

obj = data.properties;
for (var key in obj) {  //fields
    //console.log('property name is ', key,obj[key],obj[key].type);
    for (var propertykey in obj[key]) { //properties of fields. all properties are objects. Check for this?
	switch (propertykey) { //handle each property
	case "$ref":
	    var searchstr=obj[key][propertykey];
	    
	    var fdef=searchstr.search(defstr);
	    if (fdef != -1)
	    {
		fdef=fdef+ldefstr;
		var defstring=searchstr.substring(fdef);
	    } else {var defstring=searchstr;}
	    //console.log("       "+defstring+' should be in database schema',properties);
	    properties[key]={"propertyType": defstring.toUpperCase()};
	    break;
	    
	case "type":  //add cases for handling specific to types
	    switch (obj[key].type) {
	    case "LINK":
		properties[key]=JSON.parse(JSON.stringify(linkTemplate)); //fill in linkedClass field from defaultvalue
		break;

	    case "object":
		console.log("WARNING: object type not supported in properties. Use a $ref instead.",propertykey);
		break;

	    default:
		properties[key]={"propertyType": obj[key].type}
		break;
	    }
	    break;

	case "defaultvalue":
	    //console.log(' got here for defaultvalue',obj[key][propertykey],properties[key].propertyType);
	    if (properties[key].propertyType==="LINK"){  //fill in linkedClass from defaultvalue
		properties[key].linkedClass = obj[key][propertykey]["linked-class"];
		if (obj[key][propertykey]["@rid"]) {
		    //console.log('  has rid ',obj[key][propertykey]["@rid"]);
		    if (alterproperties==="")
		    {
			alterproperties=JSON.parse(JSON.stringify(alterPropertyTemplate)); //cheap deep copy
			alterproperties.operations[0].command+= classname+"."+key+" DEFAULT " + obj[key][propertykey]["@rid"];
		    } else {
			alterproperties.operations.push(JSON.parse(JSON.stringify(alterPropertyTemplate)).operations[0]);
			alterproperties.operations[alterproperties.operations.length-1].command+= classname+"."+key+" DEFAULT " + obj[key][propertykey]["@rid"];
		    }
		}
		
	    } else {

	    if (alterproperties==="")
	    {
		alterproperties=JSON.parse(JSON.stringify(alterPropertyTemplate)); //cheap deep copy
		alterproperties.operations[0].command+= classname+"."+key+" DEFAULT " + obj[key][propertykey];
	    } else {
		alterproperties.operations.push(JSON.parse(JSON.stringify(alterPropertyTemplate)).operations[0]);
		alterproperties.operations[alterproperties.operations.length-1].command+= classname+"."+key+" DEFAULT " + obj[key][propertykey];
	    }
		}
	    break;

	case "dbprop": //non standard in JSON schema, but we seem to need this for db specific schema settings
	    if (alterproperties==="")
	    {
		alterproperties=JSON.parse(JSON.stringify(alterPropertyTemplate)); //cheap deep copy
		alterproperties.operations[0].command+= classname+"."+key+" " + obj[key][propertykey];
	    } else {
		alterproperties.operations.push(JSON.parse(JSON.stringify(alterPropertyTemplate)).operations[0]);
		alterproperties.operations[alterproperties.operations.length-1].command+= classname+"."+key+" " + obj[key][propertykey];
	    }	    
	    break;
	    
	default:
	    console.log("WARNING: Unsupported field ", propertykey);
	    break;
	}
    }
}

console.log('properties : ', JSON.stringify(properties,null,2));
console.log('alterproperties : ', JSON.stringify(alterproperties,null,2));

var username = 'admin';
var password = 'admin';
var database = 'ndm';

var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var baseurl = "http://localhost:2480/";
var url = baseurl+"query/"+database+"/sql/SELECT from Person";
//var newclass = <<content from arg>>;
var makeclassURL = baseurl+"batch/"+database+"/";
var makepropertiesURL =baseurl+"property/"+database+"/"+classname;
var alterpropertiesURL =baseurl+"batch/"+database+"/";

/*
request.get( {url : url,
	      headers : {"Authorization": auth, "content-type":"application/json"}},
	     function (error, response, body) {
		 if (!error && response.statusCode == 200) {
		     //console.log(JSON.stringify(JSON.parse(body),null,3));
		 }
	     });

*/


// chain these three requests
var options = {
    method: 'post',
    body: makeclass,
    json: true,
    headers : {"Authorization": auth, "content-type":"application/json"},
    url: makeclassURL
}
request ( options, function (err, res, body) {
    if (err) {
	console.error('error posting json: ', err)
	throw err
    }
    var headers = res.headers
    var statusCode = res.statusCode
    console.log('headers: ', headers);
    console.log('url: ', options.url);
    console.log('statusCode: ', statusCode);
    console.log('body: ', body);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');


    options.body=properties;
    options.url=makepropertiesURL;
    console.log('options body', options.body);
    request ( options, function (err, res, body) {
	if (err) {
	    console.error('error posting json: ', err)
	    throw err
	}
	var headers = res.headers
	var statusCode = res.statusCode
	console.log('headers: ', headers);
	console.log('url: ', options.url);
	console.log('statusCode: ', statusCode);
	console.log('body: ', body);
	console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	
	options.body=alterproperties;
	options.url=alterpropertiesURL;
	request ( options, function (err, res, body) {
	    if (err) {
		console.error('error posting json: ', err)
		throw err
	    }
	    var headers = res.headers
	    var statusCode = res.statusCode
	    console.log('headers: ', headers);
	    console.log('url: ', options.url);
	    console.log('statusCode: ', statusCode);
	    console.log('body: ', body);
	    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	}) //unwind
    }) //unwind
}) //unwind

//json: true,body:requestedData
//requestedData created by parsing arg
