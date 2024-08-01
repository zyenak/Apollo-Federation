## Passing headers to context using Apollo Gateway
https://www.apollographql.com/blog/setting-up-authentication-and-authorization-apollo-federation

## Passing headers to context using Apollo Router
https://www.apollographql.com/docs/router/configuration/header-propagation/


## Gateway commands
cd user-service
npx ts-node src/index.ts

cd task-service
npx ts-node src/index.ts

cd apollo-gateway
npx ts-node src/index.ts


## Router Commands
iwr 'https://rover.apollo.dev/win/latest' -UseBasicParsing | iex
(copy exe router file in apollo router)
rover supergraph compose --config ./supergraph.yaml
router-v1.51.0.exe --supergraph supergraph-schema.graphql


### Note: Ensure to run npm install first

## Test Query
test query on 4000:
query GetUserPosts {
  user(id: "1") {
    posts {
      id
      title
      content
    }
  }
}
