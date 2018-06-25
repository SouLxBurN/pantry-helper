import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './components/App'

// Apollo Graphcool Connection Info
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjaqsv9be27go0121pb3lc503' })
export const client = new ApolloClient({ // TODO Create a ApolloClientProvider Singleton class for this.
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
);
