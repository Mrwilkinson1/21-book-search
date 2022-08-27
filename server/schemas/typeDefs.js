const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Books]
    }
    type Book {
        bookId: ID!
        author: [String!]
        description: String
        image: String
        link: String
        title: String
    }

    type Query {
            me: User
    }
    type Auth {
    token: ID!
    user: User
    }
    input SavedBookInput {
        authors: [ String]
        description: String
        bookId: String
        forSale: String
        link: String
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    };

    module.export = typeDef;