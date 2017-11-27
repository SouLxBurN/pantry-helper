import React from 'react';
import { Link } from 'react-router-dom';

/*
 * Navigation Component
 */
function Navigation(props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to="/">
        <img alt='Pantry Helper Logo' src='/favicon.ico' className='d-inline-block align-top' width='30' height='30'/>
        Pantry Helper
      </Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent'
         aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'><Link className='nav-link' to="/shoppinglist">Shopping List</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/recipes">Recipes</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/settings">Settings</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
