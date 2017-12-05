import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import ListSelect from './ListSelect'

class CreatePantryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      upcInput: '',
      qty: 1,
    };
    this.onNameSelect = this.onNameSelect.bind(this);
  }

  onNameSelect(item) {
    this.setState({
      nameInput: item.name,
      itemId: item.id,
    })
  }

  _createPantryItem = async () => {
    if (!this.state.itemId) {
      const name = this.state.nameInput;
      console.log(name);
      await this.props.createItemMutation({
        variables: {
          name
        },
        update: (store, { data: { createItem } }) => {
          const data = store.readQuery({ query: ALL_ITEMS_QUERY })
          this.setState({
            itemId: createItem.id
          })
          data.allItems.splice(0,0,createItem)
          store.writeQuery({
            query: ALL_ITEMS_QUERY,
            data
          })
        }
      });
    }

    const itemId = this.state.itemId;
    const qty = parseInt(this.state.qty, 10);
    await this.props.createPantryItemMutation({
      variables: {
        qty,
        itemId
      }
    });
    this.props.history.push(`/createpantryitem`)
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
            <div className='form-group'>
              <label htmlFor='nameInput'>Name</label>
              <input type='text' id='nameInput' className='form-control' value={this.state.nameInput}
                  onChange={(e) => this.setState({ nameInput: e.target.value })} />
              {autoCompleteItems.length > 0 && <ListSelect items={autoCompleteItems} onSelect={this.onNameSelect}/> }
            </div>
            <div className='form-group'>
              <label htmlFor='qtyInput'>Quantity</label>
              <input type='number' id='qtyInput' className='form-control' value={this.state.qty}
                  onChange={(e) => this.setState({ qty: e.target.value })} />
            </div>
            <button type='button' className='btn btn-primary' onClick={this._createPantryItem}> Add </button>
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
      }
    }
  }
`

export default compose (
  graphql(CREATE_ITEM_MUTATION, { name: 'createItemMutation' }),
  graphql(ALL_ITEMS_QUERY, { name: 'allItemsQuery' }),
  graphql(CREATE_PANTRY_ITEM_MUTATION, { name: 'createPantryItemMutation' })
)(CreatePantryItem)
