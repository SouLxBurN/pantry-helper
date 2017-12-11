import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Navigation from './Navigation';
import Pantry from './Pantry';
import CreatePantryItem from './CreatePantryItem';
import EditPantryItemPageWithQuery from './EditPantryItemPage';
import ShoppingList from './ShoppingList';
import Recipes from './Recipes';
import Settings from './Settings';


/*
 * Parent Application Component
 */
class App extends React.Component {
  render() {
    return (
        <div style={{paddingBottom: '50px'}}>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Pantry} />
            <Route path="/createpantryitem" component={CreatePantryItem} />
            <Route path="/editpantryitem/:id" component={EditPantryItemPageWithQuery} />
            <Route path="/shoppinglist" component={ShoppingList} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
    )
  }
}
export default App
