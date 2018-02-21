"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const users = [
    {
        id: 1,
        name: 'Michael',
        email: 'michael.douglas@atitude.com.br'
    },
    {
        id: 2,
        name: 'Douglas',
        email: 'douglas@atitude.com.br'
    }
];
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
    }
`;
const resolvers = {
    /*User: {
        id: (user) => user.id,
        name: (user) => `Nome: ${user.name}`,
        email: (user) => user.email,
    },*/
    Query: {
        allUsers: () => users
    },
    Mutation: {
        createUser: (parent, params) => {
            const newUser = Object.assign({ id: users.length + 1 }, params);
            users.push(newUser);
            return newUser;
        }
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
