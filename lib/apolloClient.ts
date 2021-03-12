import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
  });
}

export default createApolloClient;
