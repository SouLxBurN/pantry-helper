import gql from 'graphql-tag'

// Queries
export const SINGLE_PANTRY_ITEM_QUERY = gql`
  query SinglePantryItemQuery($id: ID!) {
    PantryItem(id: $id) {
      id
      qty
      item {
        id
        name
      }
    }
  }
`
export const ALL_PANTRY_ITEMS_QUERY = gql`
  query AllPantryItemsQuery {
    allPantryItems(filter: {
      qty_gt: 0
    }) {
      id
      qty
      item {
        id
        name
      }
    }
  }
`

// Mutations
export const CREATE_PANTRY_ITEM_MUTATION = gql`
  mutation CreatePantryItemMutation($qty: Int!, $itemId: ID!) {
    createPantryItem(qty: $qty, itemId: $itemId) {
      id
      qty
      item {
        id
        name
      }
    }
  }
`
export const UPDATE_PANTRY_ITEM_MUTATION = gql`
  mutation UpdatePantryItemMutation($id: ID!, $qty: Int!) {
    updatePantryItem(id: $id, qty: $qty) {
      id
      qty
      item {
        id
        name
      }
    }
  }
`
