This directory contains json schema encoded definitions for classes.

Schema may be validated with ajv (npm install -g ajv-cli):

    ajv compile -s NDMobject.json -s exampleschema.json

NDMobject.json - an abstract class intended to be the base class for NDM objects
Superclasses of ORestricted to enable access control and role
awareness. (Symbolic links `exampleschema` and `_NDMobject` are
present to allow `ajv` to follow the `$ref` in the schema files. I'm
not totally sure of the final path on ndm.mit.edu for the references.)

`NDMobject` specifies:

- creationTime : filled by sysdate() function on creation.
- createdBy : a link to the Person who created it. Note the database user
			is available through Person.ouser to admins. Link is 
			filled on creation by serverside function getHTTPuser().
- guid : a globally unique ID filled by default by uuid() on creation.

`exampleschema` servers as a template for new schema entries.  The
important things to change are the `title`, the end of the `id` string
(same as title), all of the entries under `properties`, and the required
field.  The `allof` field is used for inheritance, so just add to that
list when building the hierarchy. In the example, `allof` inherits the
NDMobject properties of guid, who, and when as well as being a
vertex. NDMobject itself is not a vertex allowing edges or plain
documents to also have it as a superclass.
