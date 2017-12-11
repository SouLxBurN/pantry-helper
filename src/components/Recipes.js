import React from 'react';
import { Link } from 'react-router-dom';
import RecipeList from './RecipeList'

// Placeholder for Recipes Page
class Recipes extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2 className='float-left'>Recipes</h2>
            <Link className='btn btn-primary float-right' to="/createrecipe">
              Create Recipe
            </Link>
            <RecipeList />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Link className='btn btn-primary float-right' to="/createrecipe">
              Create Recipe
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipes;
