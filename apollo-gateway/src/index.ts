import { ApolloServer } from '@apollo/server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'user', url: 'http://localhost:4001' },
        { name: 'post', url: 'http://localhost:4002' },
    ],
    buildService({ name, url }) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
                // Forward the authorization header to the downstream services
                request.http?.headers.set("Authorization", context.token || "");
            }
        });
    }
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
