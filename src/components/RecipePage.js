import React from 'react';
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import ViewRecipe from './ViewRecipe'
import { SINGLE_RECIPE_QUERY } from '../graphql/Recipeql'

export class RecipePage extends React.Component {

  onFinish = () => {
    this.props.history.push(`/recipes`);
  }

  render() {
    if (this.props.data && this.props.data.loading) {
      return <div>Loading</div>
    }
    if (this.props.data && this.props.data.error) {
      console.log(this.props.data.error)
      return <div>Error</div>
    }

    let view = null;
    if (this.props.data) {
      view = <ViewRecipe recipe={this.props.data.Recipe} onFinish={this.onFinish}/>;
    } else {
      view = <ViewRecipe onFinish={this.onFinish}/>;
    }

    return (
      <div>
        {view}
      </div>
    )
  }
}

export const RecipePageWithQuery = graphql(SINGLE_RECIPE_QUERY, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
})(withRouter(RecipePage))
