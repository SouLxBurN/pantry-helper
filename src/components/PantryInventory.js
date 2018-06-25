import React from 'react'
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo'
import { ALL_NON_ZERO_PANTRY_ITEMS_QUERY } from '../graphql/PantryItemql'
import { EmptyTableHeaderMessage } from '../util/displayUtils'

class PantryInventory extends React.Component {
  render() {
    if (this.props.allPantryItemsQuery && this.props.allPantryItemsQuery.loading) {
      return <EmptyTableHeaderMessage message='Loading' />
    }

    if (this.props.allPantryItemsQuery && this.props.allPantryItemsQuery.error) {
      console.log(this.props.allPantryItemsQuery.error);
      return <EmptyTableHeaderMessage message='An Error Occured Loading Your Pantry.' />
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

export default graphql(ALL_NON_ZERO_PANTRY_ITEMS_QUERY, { name: 'allPantryItemsQuery' })(PantryInventory)

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
