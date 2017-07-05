# Logbook Docker
This repo contains a docker image for:
  * DJANGO
  * DJANGO-REST-API
  * DJANGO-ADMIN
  * DJANGO-GRAPHENE
  * DJANGO-GRAPHIQL
  * Attached to Dummy MSSQL database which is a copy of the logbook + GUIDs
There are no real foreign keys in the database, or in the django models for the
tables.  Foreign keys are dealt with in the graphql schema by explicit queries.

This Docker was cribbed from [ https://www.caktusgroup.com/blog/2017/03/14/production-ready-dockerfile-your-python-django-app/ ]
and modified to use freetds, and graphene

## Building
```shell
docker build -t logbook .
```
## Running
```shell
docker run -i -p 8000:8000 -e DB_NAME=newlogbook -e DB_HOST=alcdb2 -e DB_USER=jas -e DB_PASS=xxx -t logbook 
```
To get an interactive prompt and run by hand:
```shell
run -i -p 8000:8000 -e DB_NAME=newlogbook -e DB_HOST=alcdb2 -e DB_USER=jas -e DB_PASS=xxx -t logbook /bin/#!/bin/sh
# . /venv/bin/activate
# ./manage.py runserver
```
Once the docker is running you can browse to localhost:8000.  You will probably need the browser to send an authentication header.  Do this by visiting http://localhost:8000/admin
and logging in as testing/trygql


``` Question to slack 

I am trying to add schema to a django-graphene server I have set up.  The existing schema has one class which subclasses DjangoObjectType for each class in the django model.  Now I want to add a new class that does not have a corresponding model.  it works if the members of that class are scalars. (i.e. (edited)

[4:33] 
 ```class Entry(graphene.ObjectType):
    name = 'Entry'
    description = 'A logbok Entry'

    id = graphene.ID()
```
(edited)

[4:35] 
if i want to nest a structure as part of this, lets say
```class Entry(graphene.ObjectType):
    name = 'Entry'
    description = 'A logbok Entry'

    id = graphene.ID()
   header = myType()
```
where myType is:
```class myType(graphene.ObjectType):
    name = 'MyType'
    description = 'The text of the entry'

    text = graphene.String()
```
how do I declare this ?
where do I put the resolver for this part ? (edited)

bazaglia [4:57 PM] 
joined #general

josh.stillerman [4:58 PM] 
so to re-interate I would like to make a query like:
```{
    entries {
        id
        header {
            text
        }
    }
}
```
which does NOT correspond to the shape of my Django models (edited)
```
