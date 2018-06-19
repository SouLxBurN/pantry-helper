import React from 'react';
import { graphql, compose } from 'react-apollo'
import ListSelect from '../util/ListSelect'
import { ALL_ITEMS_QUERY } from '../graphql/Itemql'
import {
  ALL_PANTRY_ITEMS_QUERY,
  UPDATE_PANTRY_ITEM_MUTATION
} from '../graphql/PantryItemql'
import {
  ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
  CREATE_SHOPPING_LIST_ITEM_MUTATION
} from '../graphql/ShoppingListql'

class EditPantryItem extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNameSelect = this.onNameSelect.bind(this);
  }

  state = {
    nameInput: this.props.pantryItem.item.name,
    qtyInput: this.props.pantryItem.qty,
    item: this.props.pantryItem.item,
  };

  /*
   * onChange for Item Name field
   */
  onNameChange(event) {
    this.setState({
      nameInput: event.target.value,
    });
  }

  /*
   * When name is selected from existing Items
   */
  onNameSelect(item) {
    this.setState({
      nameInput: item.name,
      item: item,
    });
  }

  _updatePantryItem = async () => {
    if (this.state.qtyInput < 0) {
      return
    }
    console.log("Updating Item...")
    if (parseInt(this.state.qtyInput,10) === 0) {
      console.log(this.state.qtyInput);
      let qty = 1;
      let itemId = this.state.item.id;
      this.props.createShoppingListItem({
        variables: {
          qty,
          itemId
        },
        update: (store, {data: { createShoppingList } }) => {
          let data = store.readQuery({ query: ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY })
          data.allShoppingLists.push(createShoppingList);
          store.writeQuery({
            query: ALL_NON_COMPLETED_SHOPPING_LIST_ITEMS_QUERY,
            data
          })
        }
      })
    }
    let id = this.props.pantryItem.id;
    let qty = parseInt(this.state.qtyInput,10);
    this.props.updatePantryItemMutation({
      variables: {
        id,
        qty
      },
      update: (store, { data: { updatePantryItem } }) => {
        let data = store.readQuery({ query: ALL_PANTRY_ITEMS_QUERY })
        // Remove item from pantry item list if the quantity was moved to zero.
        if (updatePantryItem.qty <= 0) {
          data.allPantryItems = data.allPantryItems.filter((it) => {
            return it.id !== updatePantryItem.id;
          });
        }
        store.writeQuery({
          query: ALL_PANTRY_ITEMS_QUERY,
          data
        });
      }
    }).then(this.props.onFinish());
  }

  render() {
    // Loading All Items from Backend
    let autoCompleteItems = [];
    if (this.props.allItemsQuery
      && !this.props.allItemsQuery.loading
      && !this.props.allItemsQuery.error) {
      autoCompleteItems = this.props.allItemsQuery.allItems;
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2>Edit Pantry Item</h2>
            <ListSelect items={autoCompleteItems} onChange={this.onNameChange} onSelect={this.onNameSelect}
              value={this.state.nameInput}/>
            <div className='form-group'>
              <label htmlFor='qtyInput'>Quantity</label>
              <input type='number' id='qtyInput' className='form-control' value={this.state.qtyInput}
                  onChange={(e) => this.setState({ qtyInput: e.target.value })} />
            </div>
            <button type='button' className='btn btn-primary float-left' onClick={this.props.onFinish}>
               Cancel
            </button>
            <button type='button' className='btn btn-primary float-right' onClick={this._updatePantryItem}>
               Update
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default compose (
  graphql(ALL_ITEMS_QUERY, { name: 'allItemsQuery' }),
  graphql(UPDATE_PANTRY_ITEM_MUTATION, { name: 'updatePantryItemMutation' }),
  graphql(CREATE_SHOPPING_LIST_ITEM_MUTATION, { name: 'createShoppingListItem' })
)(EditPantryItem)
