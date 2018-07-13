import React from 'react';
import { graphql, compose } from 'react-apollo'
import { EmptyTableHeaderMessage } from '../util/displayUtils'
import { ALL_ITEMS_QUERY } from '../graphql/Itemql'
import { ALL_RECIPES_QUERY, CREATE_RECIPE_MUTATION, UPDATE_RECIPE_MUTATION } from '../graphql/Recipeql'

class ViewRecipe extends React.Component {
  constructor(props) {
    super(props);

    let itemIds = [];
    if (this.props.recipe) {
      itemIds = this.props.recipe.ingredients.map(item => item.id);
    }

    this.state = {
      nameInput: this.props.recipe ? this.props.recipe.name : '',
      descriptionInput: this.props.recipe ? this.props.recipe.description : '',
      instructionsInput: this.props.recipe ? this.props.recipe.instructions : '',
      ingredientsInput: this.props.recipe ? itemIds : [],
    };
    console.log(itemIds);
  }

  _saveRecipeItem = async() => {
    let id = this.props.recipe.id;
    let name = this.state.nameInput;
    let description = this.state.descriptionInput;
    let instructions = this.state.instructionsInput;
    let ingredients = this.state.ingredientsInput;

    if (id) {
      console.log(id)
      await this.props.updateRecipe({
        variables : {
          id,
          name,
          description,
          instructions,
          ingredients
        },
        update: (store, { data: updateRecipe }) => {
          let data = store.readQuery({ query: ALL_RECIPES_QUERY })
          store.writeQuery({
             query: ALL_RECIPES_QUERY,
             data
          })
        }
      })
    } else {
      await this.props.createRecipe({
        variables : {
          name,
          description,
          instructions,
          ingredients
        },
        update: (store, { data: createRecipe }) => {
          let data = store.readQuery({ query: ALL_RECIPES_QUERY })
          data.allRecipes.push(createRecipe);
          store.writeQuery({
             query: ALL_RECIPES_QUERY,
             data
          })
        }
      })
    }
    this.props.onFinish();
  }

  handleMultiChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      ingredientsInput: value,
    });
    console.log(value);
  }

  render() {

    if (!this.props.allItemsQuery || this.props.allItemsQuery.loading) {
      return <EmptyTableHeaderMessage message='Loading' />
    }

    if (this.props.allItemsQuery && this.props.allItemsQuery.error) {
      console.log(this.props.allRecipesQuery.error);
      return <EmptyTableHeaderMessage message='An Error Occured Loading The Recipe List.' />
    }

    const items = this.props.allItemsQuery.allItems;
    const ItemOptions = items.map((item) => {
      return <option key={item.name} item={item} value={item.id}>{item.name}</option>
    })

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2>{this.props.recipe ? 'View' : 'Create'} Recipe</h2>
            <div className='form-group'>
              <label htmlFor='nameInput'>Name</label>
              <input type='text' id='nameInput' className='form-control' value={this.state.nameInput}
                  onChange={(e) => this.setState({ nameInput: e.target.value })} />
            </div>
            <div className='form-group'>
              <label htmlFor='descriptionInput'>Description</label>
              <input type='text' id='descriptionInput' className='form-control' value={this.state.descriptionInput}
                  onChange={(e) => this.setState({ descriptionInput: e.target.value })} />
            </div>
            <div className='form-group'>
              <label htmlFor='instructionsInput'>Instructions</label>
              <textarea id='instructionsInput' className='form-control' value={this.state.instructionsInput}
                  onChange={(e) => this.setState({ instructionsInput: e.target.value })} />
            </div>
            <div className='form-group'>
              <label htmlFor='ingredientsInput'>Ingredients</label>
              <select multiple id='ingredientsInput' className='form-control' value={this.state.ingredientsInput}
                  onChange={(e) => this.handleMultiChange(e)}>
                {ItemOptions}
                </select>
            </div>
            <button type='button' className='btn btn-primary float-left' onClick={this.props.onFinish}>
               Cancel
            </button>
            <button type='button' className='btn btn-primary float-right' onClick={this._saveRecipeItem}>
               Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default compose (
  graphql( ALL_ITEMS_QUERY, { name: 'allItemsQuery' }),
  graphql( CREATE_RECIPE_MUTATION, { name: 'createRecipe' }),
  graphql( UPDATE_RECIPE_MUTATION, { name: 'updateRecipe' })
)(ViewRecipe)
