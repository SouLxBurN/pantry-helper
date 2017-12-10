import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { ALL_PANTRY_ITEMS_QUERY } from './PantryInventory'
import ListSelect from './ListSelect'

class CreatePantryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      upcInput: '',
      qty: 1,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onNameSelect = this.onNameSelect.bind(this);
  }

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

  onFinish = () => {
    this.props.history.push(`/`);
  }

  _createPantryItem = async () => {
    let selectedItem = this.state.item;
    // If state does no contain an item object,
    // create a new Item with the name input.
    if (!this.state.nameInput || this.state.nameInput.length <= 0
      || this.state.qty <= 0) {
      return
    }
    if (!selectedItem) {
      const name = this.state.nameInput;
      await this.props.createItemMutation({
        variables: {
          name
        },
        update: (store, { data: { createItem } }) => {
          const data = store.readQuery({ query: ALL_ITEMS_QUERY })
          selectedItem = createItem;
          data.allItems.splice(0,0,createItem)
          store.writeQuery({
            query: ALL_ITEMS_QUERY,
            data
          })
        }
      });
    }

    // Checking if an existing PantryItem exists,
    // if so, we'll update the qty instead.
    let existingPantryItem;
    this.props.allPantryItemsQuery.allPantryItems.forEach((pantryItem) => {
      if (pantryItem.item.id === selectedItem.id) {
        existingPantryItem = pantryItem;
      }
    })

    // Update If PantryItem exists
    if (existingPantryItem) {
      let id = existingPantryItem.id;
      let qty = existingPantryItem.qty + parseInt(this.state.qty, 10);
      await this.props.updatePantryItemMutation({
        variables: {
          id,
          qty
        }
      });
    }
    else {
      // Create a new Pantry Item
      let itemId = selectedItem.id;
      let qty = parseInt(this.state.qty, 10);
      await this.props.createPantryItemMutation({
        variables: {
          qty,
          itemId
        },
        update: (store, { data: { createPantryItem } }) => {
          const data = store.readQuery({ query: ALL_PANTRY_ITEMS_QUERY })
          data.allPantryItems.push(createPantryItem);
          store.writeQuery({
            query: ALL_PANTRY_ITEMS_QUERY,
            data
          })
        }
      });
    }

    // Reinitialize the page's state
    this.setState({
      nameInput: '',
      upcInput: '',
      qty: 1,
    });
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
            <h2>Add Item to Pantry</h2>
            <div className='form-group'>
              <label htmlFor='upcInput'>UPC</label>
              <input type='text' id='upcInput' className='form-control' value={this.state.upcInput}
                  onChange={(e) => this.setState({ upcInput: e.target.value })} />
            </div>
            <ListSelect items={autoCompleteItems} onChange={this.onNameChange} onSelect={this.onNameSelect}
              value={this.state.nameInput}/>
            <div className='form-group'>
              <label htmlFor='qtyInput'>Quantity</label>
              <input type='number' id='qtyInput' className='form-control' value={this.state.qty}
                  onChange={(e) => this.setState({ qty: e.target.value })} />
            </div>
            <button type='button' className='btn btn-primary float-left' onClick={this.onFinish}> Done </button>
            <button type='button' className='btn btn-primary float-right' onClick={this._createPantryItem}> Add </button>
          </div>
        </div>
      </div>
    )
  }
}

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($name: String!) {
    createItem(name: $name) {
      id
      name
      upc
    }
  }
`
export const ALL_ITEMS_QUERY = gql`
  query AllItemsQuery {
    allItems {
      id
      name
    }
  }
`
const CREATE_PANTRY_ITEM_MUTATION = gql`
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


export default compose (
  graphql(CREATE_ITEM_MUTATION, { name: 'createItemMutation' }),
  graphql(ALL_ITEMS_QUERY, { name: 'allItemsQuery' }),
  graphql(ALL_PANTRY_ITEMS_QUERY, { name: 'allPantryItemsQuery' }),
  graphql(CREATE_PANTRY_ITEM_MUTATION, { name: 'createPantryItemMutation' }),
  graphql(UPDATE_PANTRY_ITEM_MUTATION, { name: 'updatePantryItemMutation' })
)(CreatePantryItem)
