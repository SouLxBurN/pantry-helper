import gql from 'graphql-tag'

// Queries
export const ALL_RECIPES_QUERY = gql`
  query AllRecipes {
    allRecipes {
      id
      name
      description
      instructions
      ingredients {
        id
        name
      }
    }
  }
`
export const SINGLE_RECIPE_QUERY = gql`
  query AllRecipes($id: ID!) {
    Recipe(id: $id) {
      id
      name
      description
      instructions
      ingredients {
        id
        name
      }
    }
  }
`

// Mutations
export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($name: String!, $description: String!, $instructions: String!, $ingredients: [ID!]) {
    createRecipe(name: $name, description: $description, instructions: $instructions, ingredientsIds: $ingredients) {
      id
      name
      description
      instructions
      ingredients {
        id
        name
      }
    }
  }
`
export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipeMutation($id: ID!, $name: String!, $description: String!,
    $instructions: String!, $ingredients: [ID!]) {
      updateShoppingList(id: $id, name: $name, description: $description,
        instructions: $instructions, ingredientsIds: $ingredients) {
        id
        qty
        completed
        item {
          id
          name
        }
      }
  }
`
