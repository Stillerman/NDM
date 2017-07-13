1. Martin provided  a suggested collection of MPs and runs to use as an initial data set
2. Metric for properties vs connections:
  * If you are unlikely to follow a connection, because it is either not interesting, or too branchy then it should be a property
  * roughly if there are more than 50 connections then it probably should be a property
3. Initial implimentation - schema may(will) not be data driven however, whatever we do needs to fit into a meta-schema we define
  * when we encounter things that do not, we need to rethink the meta schema
  * For example
    * Thing
      * Property
      * Relation
    * relation
      * Propperty
      * subject 
      * object
4. Directions for getting started on object modeling from: https://neo4j.com/developer/guide-data-modeling/ suggest to start really
small and simple.  To that end thinking of just:
  * Users
    * FirstName
    * Lastname
    * Username
    * Active
    * comment
  * MiniProposals
    * Number (actually a string)
    * Title
    * URL
    * FirstAuthor (R)
    * Co-Author (R)
  * as things they will also have:
    * TimeInserted
    * IntsertedBy
    * GUID
      
