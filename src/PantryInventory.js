import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PantryInventory extends React.Component {
  render() {

    if (this.props.allPantryItemsQuery && this.props.allPantryItemsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allPantryItemsQuery && this.props.allPantryItemsQuery.error) {
      return <div>Error</div>
    }

    const pantryItems = this.props.allPantryItemsQuery.allPantryItems;
    const inventoryItems = pantryItems.map((item) => {
      return <PantryInventoryItem key={item.item.name} item={item}/>
    })

    return (
      <table className='table table-hover'>
        <thead className='thead-light'>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
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
      qty
      item {
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
  // TODO OnClick should navigate to a View Item Page
  return (
    <tr onClick={() => alert(props.item.item.name)}>
      <td>{props.item.item.name}</td>
      <td>{props.item.qty}</td>
    </tr>
  )
}
