
#Notes from Meeting 4/5/2017
1. Decided to try:
  * Server
    * Neo4j + Node.js
  * Client
    * Vue.js
2. Talked about
```<header>
  <fixed>
     who
     what
     when
     voided (date + reference ?)
   </fixed>
   <what specific section> ?<what>
   </what>
   e.g.
   <shot-log>
      topic
      run
      shot
   </shot-log>
</header>
<body>
  text with embedded refs to things
</body>
```
3. Navigational Discovery
  1. Given a `thing`
    * What Query qualifiers do you have
    * What relationships are you a member of
    * For Each Relationship
      * What adjacency relationships does this relationship have
      * For Each adjacency
        * What neighbors do you have
     * Stuff under ‘thing’ could be answered by ontology
  2. Example
    * MDSplus
      * Parent
      * Sibling
      * Children
    * Shot-Log
      * Shot Order
        * Next
        * Previous
      * Thread Order
      * Qualified by rest of entry metadata
        * Topic
        * User
        * ...
4. Application Navigation

  Given the kind of an object need to be able to move to an object type specific application.

