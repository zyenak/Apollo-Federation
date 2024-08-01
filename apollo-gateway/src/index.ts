import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'user', url: 'http://localhost:4001' },
    { name: 'post', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Gateway (Apollo Gateway) ready at ${url}`);
};

startServer();
