These are the files for a neo4j docker instance for the project.

To run
```
export NDM="$(dirname "$PWD")"
docker run     --publish=7474:7474 --publish=7687:7687     --volume=$HOME/neo4j/data:/data  --volume=$HOME/neo4j/logs:/logs --volume=$NDM/neo4j/plugins:/plugins  --volume=$NDM/neo4j/conf:/conf --privileged       neo4j
```

This will use these managed directories for /plugins /conf and /data  and create a directory $HOME/logs for the logs.

The plugins and conf enable graphaware/UUID support for neo4j [https://github.com/graphaware/neo4j-uuid]

Interesting rest queries to the database:
``` http://localhost:7474/db/data/ ```
```
{
    "extensions": {},
    "node": "http://localhost:7474/db/data/node",
    "relationship": "http://localhost:7474/db/data/relationship",
    "node_index": "http://localhost:7474/db/data/index/node",
    "relationship_index": "http://localhost:7474/db/data/index/relationship",
    "extensions_info": "http://localhost:7474/db/data/ext",
    "relationship_types": "http://localhost:7474/db/data/relationship/types",
    "batch": "http://localhost:7474/db/data/batch",
    "cypher": "http://localhost:7474/db/data/cypher",
    "indexes": "http://localhost:7474/db/data/schema/index",
    "constraints": "http://localhost:7474/db/data/schema/constraint",
    "transaction": "http://localhost:7474/db/data/transaction",
    "node_labels": "http://localhost:7474/db/data/labels",
    "neo4j_version": "3.2.2"
}
```
```http://localhost:7474/db/data/labels```
```
[
    "MiniProp",
    "User"
]
```
```http://localhost:7474/db/data/node/107706```
```
{
  "extensions" : { },
  "metadata" : {
    "id" : 107706,
    "labels" : [ "MiniProp" ]
  },
  "paged_traverse" : "http://localhost:7474/db/data/node/107706/paged/traverse/{returnType}{?pageSize,leaseTime}",
  "outgoing_relationships" : "http://localhost:7474/db/data/node/107706/relationships/out",
  "outgoing_typed_relationships" : "http://localhost:7474/db/data/node/107706/relationships/out/{-list|&|types}",
  "labels" : "http://localhost:7474/db/data/node/107706/labels",
  "create_relationship" : "http://localhost:7474/db/data/node/107706/relationships",
  "traverse" : "http://localhost:7474/db/data/node/107706/traverse/{returnType}",
  "all_relationships" : "http://localhost:7474/db/data/node/107706/relationships/all",
  "all_typed_relationships" : "http://localhost:7474/db/data/node/107706/relationships/all/{-list|&|types}",
  "property" : "http://localhost:7474/db/data/node/107706/properties/{key}",
  "self" : "http://localhost:7474/db/data/node/107706",
  "incoming_relationships" : "http://localhost:7474/db/data/node/107706/relationships/in",
  "properties" : "http://localhost:7474/db/data/node/107706/properties",
  "incoming_typed_relationships" : "http://localhost:7474/db/data/node/107706/relationships/in/{-list|&|types}",
  "data" : {
    "date_filed" : "4/5/00",
    "file_date" : "4/5/2000",
    "obj_guid" : "A7FC2E73-D951-E711-ABE8-0050568A3DF0",
    "mp" : 261,
    "guid" : "6a9caf45-6bdc-11e7-bab3-0242ac110002",
    "id" : 1638,
    "title" : "Scalings in C-Mod and DIII-D Discharges with Identical DimensionlessParameters",
    "url" : "http://www-internal.psfc.mit.edu/cmod/operations/miniproposals/261.pdf",
    "status" : "Closed"
  }
}
```
