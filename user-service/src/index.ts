import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import fs from 'fs';
import { User, QueryResolvers, UserResolvers } from './types';

// Read user data from JSON file
const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'));

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find((user: { id: string; }) => user.id === id),
  },
  User: {
    __resolveReference(user: { id: string }) {
      return users.find((u: { id: string; }) => u.id === user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀 User service ready at ${url}`);
};

startServer();
