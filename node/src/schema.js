/**
* GraphQL Starter Kit (https://www.reactstarterkit.com/)
*
* Copyright © 2016-present Kriasoft, LLC. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE.txt file in the root directory of this source tree.
*/

/* @flow */

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Viewer from './types/Viewer';
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8000'

const User = new GraphQLObjectType({
  name: 'Person',
  description: 'This is a person type',

  fields() {
    return {
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
    }
  }
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: {
        type: Viewer,
        resolve() {
          return Object.create(null);
        },
      },
      user: {
        type: User,
        args: {id: {type: GraphQLString}},
        resolve: (root, args) =>
        fetch(`${BASE_URL}/users/${args.id}/`, {method: 'GET', headers:{ Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw=='}})
        .then(res => res.json())
        .then(json => json)
      },
      users: {
        type: new GraphQLList(User),
        resolve: (root, args) => {
          return fetch(`${BASE_URL}/users/`, {method: 'GET', headers:{ Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw=='}})
          .then(res => res.json())
          .then(json => {
            console.log(json.results)
            return json
          })
          .then(json => json.results)
        }
      }
    },
  }),
});
