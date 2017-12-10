import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import EditPantryItem from './EditPantryItem'

class EditPantryItemPage extends React.Component {

  onFinish = () => {
    this.props.history.push(`/`);
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    if (this.props.data.error) {
      console.log(this.props.data.error)
      return <div>Error</div>
    }

    return (
      <EditPantryItem pantryItem={this.props.data.PantryItem} onFinish={this.onFinish}/>
    )
  }
}

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

const EditPantryItemPageWithQuery = graphql(SINGLE_PANTRY_ITEM_QUERY, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
})(withRouter(EditPantryItemPage))

export default EditPantryItemPageWithQuery
