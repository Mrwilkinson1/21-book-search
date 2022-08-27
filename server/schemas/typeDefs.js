const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
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
        addUser(username: String!,email:String!,password:String!):Auth
        saveBook(authors:[String!],description:String!,bookId:String!,image:String,link:String,title:String!):User
        deleteBook(bookId:ID!):User
        login(email:String!,password:String!):Auth
    }`;

module.exports = typeDefs;