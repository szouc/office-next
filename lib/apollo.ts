import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import createApolloClient from './apolloClient';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  const _apolloClient: ApolloClient<NormalizedCacheObject> =
    apolloClient ?? createApolloClient();
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

