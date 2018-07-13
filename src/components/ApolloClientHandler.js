import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

class ApolloClientHandler {

  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjaqsv9be27go0121pb3lc503' }),
      cache: new InMemoryCache()
    })
  }
}

export default new ApolloClientHandler()
