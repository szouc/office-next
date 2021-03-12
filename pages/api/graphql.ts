import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { signup, login } from '../../resolvers/Mutation';
import { getAllUsers, getUserById } from '../../resolvers/Query';

export interface IContext {
  prisma: PrismaClient
}

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
      hello: String!
      getAllUsers: [User!]!
      getUserById(email: String!): User
  }
  type Mutation {
    signup(email: String!, password: String!, name: String!): User!
    login(email: String!, password: String!): User!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role
    created: String
  }
  enum Role {
    USER
    ADMIN
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World';
    },
    getAllUsers,
    getUserById
  },
  Mutation: {
    signup,
    login
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      ...req,
      prisma
    };
  }
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;