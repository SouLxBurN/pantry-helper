import React from 'react';
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom';
import { ALL_RECIPES_QUERY } from '../graphql/Recipeql'
import { EmptyTableHeaderMessage } from '../util/displayUtils'


// Placeholder for Recipes Page
class RecipeList extends React.Component {
  render() {
    if (!this.props.allRecipesQuery || this.props.allRecipesQuery.loading) {
      return <EmptyTableHeaderMessage message='Loading' />
    }

    if (this.props.allRecipesQuery && this.props.allRecipesQuery.error) {
      console.log(this.props.allRecipesQuery.error);
      return <EmptyTableHeaderMessage message='An Error Occured Loading The Recipe List.' />
    }

    const recipes = this.props.allRecipesQuery.allRecipes;
    const recipeRows = recipes.map((recipe) => {
      return <RecipeTableRow key={recipe.name} recipe={recipe}/>
    })

    return (
      <table className='table table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th style={{width: '15%'}}>Name</th>
            <th style={{width: '80%'}}>Desciption</th>
            <th style={{textAlign: 'center'}}>View</th>
          </tr>
        </thead>
        <tbody>
          {recipeRows}
        </tbody>
      </table>
    )
  }
}

export default graphql(ALL_RECIPES_QUERY, { name: 'allRecipesQuery' }) (RecipeList);

/*
 * Single Table Row for Recipe List
 */
function RecipeTableRow(props) {
  return (
      <tr>
        <td>{props.recipe.name}</td>
        <td>{props.recipe.description}</td>
        <td>
          <Link className='btn btn-primary' to={`/viewRecipe/${props.recipe.id}`}>
            View
          </Link>
        </td>
      </tr>

  )
}
