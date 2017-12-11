import React from 'react';
import { graphql, compose } from 'react-apollo';
import {
  ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
  ALL_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
  UPDATE_SHOPPING_LIST_ITEM_COMPLETENESS
} from '../graphql/ShoppingListql';

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
  handleFinished(event) {
    event.preventDefault();

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
  graphql(UPDATE_SHOPPING_LIST_ITEM_COMPLETENESS, { name: 'updateShoppingListItemComplete' })
) (ShoppingList)
