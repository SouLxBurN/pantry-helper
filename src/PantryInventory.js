import React from 'react'
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PantryInventory extends React.Component {
  render() {
    if (this.props.allPantryItemsQuery && this.props.allPantryItemsQuery.loading) {
      return <EmptyTableHeaderMessage message='Loading' />
    }

    if (this.props.allPantryItemsQuery && this.props.allPantryItemsQuery.error) {
      console.log(this.props.allPantryItemsQuery.error);
      return <EmptyTableHeaderMessage message='An Error Occured Loading You Pantry.' />
    }

    const pantryItems = this.props.allPantryItemsQuery.allPantryItems;
    const inventoryItems = pantryItems.map((pantryItem) => {
      return <PantryInventoryItem key={pantryItem.item.name} pantryItem={pantryItem}/>
    })

    return (
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th style={{width: '90%'}}>Name</th>
              <th style={{textAlign: 'right'}}>Quantity</th>
              <th style={{textAlign: 'center'}}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems}
          </tbody>
        </table>
    )
  }
}

export const ALL_PANTRY_ITEMS_QUERY = gql`
  query AllPantryItemsQuery {
    allPantryItems {
      id
      qty
      item {
        id
        name
      }
    }
  }
`

export default graphql(ALL_PANTRY_ITEMS_QUERY, { name: 'allPantryItemsQuery' })(PantryInventory)

/*
 * Pantry Inventory Table Row
 */
function PantryInventoryItem(props) {
  return (
      <tr>
        <td>{props.pantryItem.item.name}</td>
        <td style={{textAlign: 'right'}}>{props.pantryItem.qty}</td>
        <td>
          <Link className='btn btn-primary' to={`/editpantryitem/${props.pantryItem.id}`}>
            Edit
          </Link>
        </td>
      </tr>

  )
}

function EmptyTableHeaderMessage(props) {
  return (
    <table className='table table-striped'>
      <thead className='thead-dark'>
        <tr>
          <th>{props.message}</th>
        </tr>
      </thead>
    </table>
  );
}
