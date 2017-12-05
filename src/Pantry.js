import React from 'react';
import { Link } from 'react-router-dom';

import PantryInventory from './PantryInventory';

class Pantry extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2>Pantry</h2>
            <PantryInventory />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Link className='nav-link' to="/createpantryitem">
              <button type='button' className='btn btn-primary'> Add Item to Pantry </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Pantry
