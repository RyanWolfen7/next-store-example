import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://strapi.next-store-example.tech/graphql',
  cache: new InMemoryCache()
})

export default client
