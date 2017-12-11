import React from 'react';
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import EditPantryItem from './EditPantryItem'
import { SINGLE_PANTRY_ITEM_QUERY } from '../graphql/PantryItemql'

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

const EditPantryItemPageWithQuery = graphql(SINGLE_PANTRY_ITEM_QUERY, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
})(withRouter(EditPantryItemPage))

export default EditPantryItemPageWithQuery
