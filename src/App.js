import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navigation from './Navigation';
import Pantry from './Pantry';
import ShoppingList from './ShoppingList';
import Recipes from './Recipes';
import Settings from './Settings';

/*
 * Parent Application Component
 */
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={Pantry} />
          <Route path="/shoppinglist" component={ShoppingList} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/settings" component={Settings} />
        </div>
      </Router>
    )
  }
}
