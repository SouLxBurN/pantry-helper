import gql from 'graphql-tag'

// Queries
export const ALL_ITEMS_QUERY = gql`
  query AllItemsQuery {
    allItems {
      id
      name
    }
  }
`

// Mutations
export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($name: String!) {
    createItem(name: $name) {
      id
      name
      upc
    }
  }
`
