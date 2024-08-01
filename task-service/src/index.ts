import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import fs from 'fs';

// Read posts/tasks data from JSON file
const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));

const typeDefs = gql`
  type Post @key(fields: "id") {
    id: ID!
    title: String!
    content: String!
    userId: ID!
  }

  extend type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_: any, { id }: {id: string}) => posts.find((post: { id: string; }) => post.id === id),
  },
  Post: {
    user(post: { userId: string; }) {
      return { __typename: 'User', id: post.userId };
    },
  },
  User: {
    posts(user: { id: string; }) {
      return posts.filter((post: { userId: string; }) => post.userId === user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
  });
  console.log(`🚀 Post/Task service ready at ${url}`);
};

startServer();
