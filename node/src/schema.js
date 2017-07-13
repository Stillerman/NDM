/**
 * GraphQL Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import Viewer from './types/Viewer';
import User from './types/User';

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
        resolve() {
          return {
            email: "jason.t.stillerman@gmail.com"
          }
        }
      }
    },
  }),
});
