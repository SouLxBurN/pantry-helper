import React from 'react';
import { graphql, compose } from 'react-apollo';
import {
  ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
  ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
  UPDATE_SHOPPING_LIST_ITEM_COMPLETENESS,
  DELETE_SHOPPING_LIST_ITEM
} from '../graphql/ShoppingListql';
import {
  ALL_PANTRY_ITEMS_QUERY,
  ALL_NON_ZERO_PANTRY_ITEMS_QUERY,
  CREATE_PANTRY_ITEM_MUTATION,
  UPDATE_PANTRY_ITEM_MUTATION
} from '../graphql/PantryItemql';
import ApolloClientHandler from './ApolloClientHandler';
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.onPendingClick = this.onPendingClick.bind(this);
    this.onCompletedClick = this.onCompletedClick.bind(this);
    this.handleFinished = this.handleFinished.bind(this);
  }

  /*
   * When a Pending Item is clicked
   * Remove it from the Pending list and into the Completed List
   */
  async onPendingClick(event, item) {
    event.preventDefault();
    let id = item.id;
    let completed = true;
    await this.props.updateShoppingListItemComplete({
      variables: {
        id,
        completed
      },
      update:  (store, { data: { updateShoppingList } }) => {
        let data = store.readQuery({ query: ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY })
        data.allShoppingLists.push(updateShoppingList);
        store.writeQuery({
          query: ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
          data
        });

        data = store.readQuery({ query: ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY })
        data.allShoppingLists = data.allShoppingLists.filter((it) => {
          return it.id !== updateShoppingList.id;
        });
        store.writeQuery({
          query: ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
          data
        });
      }
    })
  }

  /*
   * When a Completed Item clicked
   * Remove it from the Completed list and into the Pending List
   */
  async onCompletedClick(event, item) {
    event.preventDefault();
    let id = item.id;
    let completed = false;
    await this.props.updateShoppingListItemComplete({
      variables: {
        id,
        completed
      },
      update:  (store, { data: { updateShoppingList } }) => {
        let data = store.readQuery({ query: ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY })
        data.allShoppingLists.push(updateShoppingList);
        store.writeQuery({
          query: ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
          data
        });

        data = store.readQuery({ query: ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY })
        data.allShoppingLists = data.allShoppingLists.filter((it) => {
          return it.id !== updateShoppingList.id;
        });
        store.writeQuery({
          query: ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
          data
        });
      }
    })
  }

  /*
   * When Complete Shopping button is Clicked
   * Remove all items from completed list and add them to the pantry.
   */
  async handleFinished(event) {
    event.preventDefault();
    this.props.allCompletedShoppingListItemsQuery.allShoppingLists.forEach((listItem) => {
      let matchedPantry = false
      this.props.allPantryItemsQuery.allPantryItems.forEach((pantryItem) => {
        // Updating if a matching PantryItem is found for the shopping list item
        if (pantryItem.item.id === listItem.item.id) {
          console.log("Matched Pantry Item: " + listItem.item.name)
          matchedPantry = true
          let id = pantryItem.id
          let qty = pantryItem.qty + listItem.qty

          this.props.updatePantryItemMutation({
            variables: {
              id,
              qty
            },
            update: (store, { data: { updatePantryItem } }) => {
              let update = false
              let data = store.readQuery({ query: ALL_NON_ZERO_PANTRY_ITEMS_QUERY })
              data.allPantryItems.forEach((pantryItem) => {
                // If item is qty=0, it will not be present in the NON_ZERO query
                if (pantryItem.id === updatePantryItem.id) {
                  pantryItem.qty = updatePantryItem.qty
                  update = true
                }
              })
              if (!update) {
                data.allPantryItems.push(updatePantryItem)
              }
              store.writeQuery({
                query: ALL_NON_ZERO_PANTRY_ITEMS_QUERY,
                data
              })
            }
          })

        }
      })
      // Creating a new Pantry Item if item is not already in PantryItems
      if (!matchedPantry) {
        let itemId = listItem.item.id;
        let qty = listItem.qty;
        this.props.createPantryItemMutation({
          variables: {
            qty,
            itemId
          },
          update: (store, { data: { createPantryItem } }) => {
            const data = store.readQuery({ query: ALL_NON_ZERO_PANTRY_ITEMS_QUERY })
            data.allPantryItems.push(createPantryItem);
            store.writeQuery({
              query: ALL_NON_ZERO_PANTRY_ITEMS_QUERY,
              data
            })
          }
        })
      }
      // Deleting the shopping list items
      let id = listItem.id
      this.props.deleteShoppingList({
        variables: {
          id
        }
      })
    })
    // Manually updating Completed list to an empty array here, instead after each transaction
   let data = ApolloClientHandler.client.readQuery({ query: ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY })
    data.allShoppingLists = []
    ApolloClientHandler.client.writeQuery({
      query: ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
      data
    })
  }

  render() {
    if ((this.props.allCompletedShoppingListItemsQuery
      && this.props.allCompletedShoppingListItemsQuery.loading)
      || (this.props.allNonCompletedShoppingListItemsQuery
        && this.props.allNonCompletedShoppingListItemsQuery.loading)) {
      return <div>Loading</div>
    }

    if ((this.props.allCompletedShoppingListItemsQuery
      && this.props.allCompletedShoppingListItemsQuery.error)
      || (this.props.allNonCompletedShoppingListItemsQuery
        && this.props.allNonCompletedShoppingListItemsQuery.error)) {
      console.log(this.props.allNonCompletedShoppingListItemsQuery.error);
      return <div>An Error Occured with loading your Shopping List.</div>
    }

    const pendingList = sortItems(this.props.allNonCompletedShoppingListItemsQuery.allShoppingLists);
    const completedList = sortItems(this.props.allCompletedShoppingListItemsQuery.allShoppingLists);

    return (
      <div className='container'>
        {pendingList.length > 0 &&
          // Render Shopping List only when items exist in it.
          <div className='row'>
            <div className='col'>
              <h2>Shopping List</h2>
              <ShoppingListComponent list={pendingList} onClick={this.onPendingClick}/>
            </div>
          </div>
        }
        {completedList.length > 0 &&
          // Render Completed List only when items exist in it.
          <div className='row'>
            <div className='col'>
              <h2>Completed List</h2>
              <ShoppingListComponent list={completedList} onClick={this.onCompletedClick}/>
              <button type='button' className='btn btn-primary float-right' onClick={this.handleFinished}>
                Complete Shopping
              </button>
            </div>
          </div>
        }
        {(pendingList.length === 0 && completedList.length === 0) &&
          // Render Empty Shopping List Messages only when both lists are empty.
          <div className='row'>
            <div className='col'>
              <h2 className='text-center'>Your Shopping List is Empty.</h2>
            </div>
          </div>
        }
      </div>
    )
  }
}

/*
 * List Component for listing items with an onClick Action
 */
function ShoppingListComponent(props) {
  return (
    <div className='list-group pb-3'>
      {props.list.map((listItem) => {
        return <a href='' className='list-group-item list-group-item-action'
          key={listItem.item.name} onClick={(e) => props.onClick(e,listItem)}>
           <span className='float-left'>{listItem.item.name}</span>
           <span className='float-right'>{listItem.qty}</span>
         </a>
      })}
    </div>
  )
}

function sortItems(items) {
  let itemsCopy = items.slice().sort((a,b) => {
    if (a.item.name < b.item.name) {
      return -1;
    }
    if (a.item.name > b.item.name) {
      return 1;
    }
    return 0;
  });

  return itemsCopy;
}

export default compose (
  graphql(ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY, { name: 'allCompletedShoppingListItemsQuery' }),
  graphql(ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY, { name: 'allNonCompletedShoppingListItemsQuery' }),
  graphql(UPDATE_SHOPPING_LIST_ITEM_COMPLETENESS, { name: 'updateShoppingListItemComplete' }),
  graphql(DELETE_SHOPPING_LIST_ITEM, { name: 'deleteShoppingList' }),
  graphql(CREATE_PANTRY_ITEM_MUTATION, { name: 'createPantryItemMutation' }),
  graphql(UPDATE_PANTRY_ITEM_MUTATION, { name: 'updatePantryItemMutation' }),
  graphql(ALL_PANTRY_ITEMS_QUERY, { name: 'allPantryItemsQuery' })
) (ShoppingList)
