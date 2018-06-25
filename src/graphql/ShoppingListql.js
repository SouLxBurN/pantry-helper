import gql from 'graphql-tag'

// Queries
export const ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY = gql`
  query AllNonCompletedShoppingListItemsQuery {
    allShoppingLists(filter: {
      completed: false
    }) {
      id
      qty
      completed
      item {
        id
        name
      }
    }
  }
`
export const ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY = gql`
  query AllCompletedShoppingListItemsQuery {
    allShoppingLists(filter: {
      completed: true
    }) {
      id
      qty
      completed
      item {
        id
        name
      }
    }
  }
`

// Mutations
export const CREATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation CreateShoppingListItem($qty: Int!, $itemId: ID!) {
    createShoppingList(qty: $qty, completed: false, itemId: $itemId) {
      id
      qty
      completed
      item {
        id
        name
      }
    }
  }
`
export const UPDATE_SHOPPING_LIST_ITEM_COMPLETENESS = gql`
  mutation UpdateShoppingListItemComplete($id: ID!, $completed: Boolean!) {
    updateShoppingList(id: $id, completed: $completed) {
      id
      qty
      completed
      item {
        id
        name
      }
    }
  }
`
export const DELETE_SHOPPING_LIST_ITEM = gql`
  mutation DeleteShoppingListItem($id: ID!) {
    deleteShoppingList(id: $id) {
      id
    }
  }
`
