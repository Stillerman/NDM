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
  GraphQLInt
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

const MiniProposal = new GraphQLObjectType({
  name: 'MiniProposal',
  description: 'This is a miniproposal type',

  fields() {
    return {
    mp: {type: GraphQLInt},
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    username: {type: GraphQLString},
    url: {type: GraphQLString},
    status: {type: GraphQLString},
    file_date: {type: GraphQLString},
    icrf_80_mhz: {type: GraphQLInt},
    icrf_70_mhz: {type: GraphQLInt},
    icrf_50_mhz: {type: GraphQLInt},
    cryopump: {type: GraphQLInt},
    dnb: {type: GraphQLInt},
    rev_b: {type: GraphQLInt},
    high_b: {type: GraphQLInt},
    boronize_overnight: {type: GraphQLInt},
    boronize_shots: {type: GraphQLInt},
    comment: {type: GraphQLString},
    date_filed: {type: GraphQLString},
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
      },
      miniproposal: {
        type: MiniProposal,
        args: {id: {type: GraphQLString}},
        resolve: (root, args) =>
        fetch(`${BASE_URL}/miniproposals/${args.id}/`, {method: 'GET', headers:{ Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw=='}})
        .then(res => res.json())
        .then(json => {
          console.log(json)
          return json
        })
        .then(json => json)
      },
      miniproposals: {
        type: new GraphQLList(MiniProposal),
        resolve: (root, args) => {
          return fetch(`${BASE_URL}/miniproposals/`, {method: 'GET', headers:{ Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw=='}})
          .then(res => res.json())
          .then(json => {
            console.log(json.results)
            return json
          })
          .then(json => json.results)
        }
      },

    },
  }),
});
