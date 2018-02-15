#!/bin/bash
node AddClass.js ../../Schema/annotation.json
curl --basic -u admin:admin -X POST http://localhost:2480/command/ndm/sql -d "insert into _schemaMetadata (name, template) values ('annotation','{\"title\":[\"name\"], \"brief\":[\"summary\"], \"body\":[\"body\"], \"links\":[\"target\"]}' )"
node AddClass.js ../../Schema/externalReference.json
node AddClass.js ../../Schema/reel.json
curl --basic -u admin:admin -X POST http://localhost:2480/command/ndm/sql -d "insert into _schemaMetadata (name, template) values ('reel', '{\"title\":[\"@class\", \"manufacturer\", \"manufacturerDesignation\"], \"brief\":[\"datePurchased\"], \"body\":[\"startPosition\", \"endPosition\"], \"links\":[\"tapestarData\"]}')"
node AddClass.js ../../Schema/tape.json
curl --basic -u admin:admin -X POST http://localhost:2480/command/ndm/sql -d "insert into _schemaMetadata (name, template) values ('tape', '{\"title\":[\"@class\", \"name\"], \"brief\":[\"processingConditions\"], \"body\":[\"startPosition\", \"endPosition\"], \"links\":[\"reel\", \"tapestarData\"]}')"
node AddClass.js ../../Schema/runDay.json
curl --basic -u admin:admin -X POST http://localhost:2480/command/ndm/sql -d "insert into _schemaMetadata (name, template) values ('runDay', '{\"title\":[\"@class\", \"rundDate\"], \"brief\":[\"operators\"], \"body\":[\"shortDescription\"], \"links\":[]}')"
node AddClass.js ../../Schema/shot.json
curl --basic -u admin:admin -X POST http://localhost:2480/command/ndm/sql -d "insert into _schemaMetadata (name, template) values ('shot', '{\"title\":[\"@class\", \"shotNumber\"], \"brief\":[\"operators\", \"measurementTemperature\"], \"body\":[\"measurementAppliedField\", \"measurementAngle\"], \"links\":[]}' )"
node AddClass.js ../../Schema/MDSplus.json
curl --basic -u admin:admin -X POST http://localhost:2480/command/ndm/sql -d "insert into _schemaMetadata (name, template) values ('MDSplus','{\"title\":[\"@class\"], \"brief\":[\"tree\", \"shot\",\"expression\"], \"body\":[\"URI\"], \"links\":[]}' )"
