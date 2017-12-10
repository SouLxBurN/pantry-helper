import React from 'react';
import { Link } from 'react-router-dom';
import PantryInventory from './PantryInventory';

class Pantry extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2 className='float-left'>Pantry</h2>
            <Link className='btn btn-primary float-right' to="/createpantryitem">
              Add Item to Pantry
            </Link>
            <PantryInventory/>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Link className='btn btn-primary float-right' to="/createpantryitem">
              Add Item to Pantry
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Pantry
