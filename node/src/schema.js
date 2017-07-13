import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLOjbectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import fetch frfom 'node-fetch';

const BASE_URL = 'http://localhost:8000'


const UserType = new GraphQLObjectType({
    name: 'Person',
    description: 'This is a person type',

    fields() => ({
      id: {type: GraphQLID},
      username: {type: GraphQLString},
      phone: {type: GraphQLString},
      crphone: {type: GraphQLString},
      email: {type: GraphQLString},
      address: {type: GraphQLString},
      firstname: {type: GraphQLString},
      lastname: {type: GraphQLString},
      fullname: {type: GraphQLString},
      comment: {type: GraphQLString},
      eo: {type: GraphQLBoolean},
      po: {type: GraphQLBoolean},
      active: {type: GraphQLBoolean},
    })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'xxx',

  fields() => ({
    user: {
      type: UserType,
      args: {type: GraphQLString}
      resolve: (root, args) =>
        fetch(`${BASE_URL})/user/${args.id}`, {method: 'GET', headers:{ Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw=='}})
          .then(res => res.json())
          .then(json => json.user)
    },
  })
})
