const userTypes = `

    # User - Dados do usuário
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String
        createdAt: String!
        updatedAt: String!,
        posts(first: Int, offset: Int): [ Post! ]!
    }

    type RequestUsers {
       rows: [ User! ]!
       total: Int
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!
    }

    input UserUpdatePasswordInput {
        password: String!
    }
`;

const userQueries = `
    users(first: Int, offset: Int): [ RequestUsers! ]!
    user(id: ID!): User
`;

const UserMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!): User
    updateUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
    deleteUser(id: ID!): Boolean
`;

export { userTypes, userQueries, UserMutations };
