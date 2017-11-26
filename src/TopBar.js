import React from 'react';

// Navigation Bar at the top of the page.
export default class TopBar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='#'>
          <img src='/favicon.ico' className='d-inline-block align-top' width='30' height='30'/>
          Pantry Helper
        </a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent'
           aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'><a className='nav-link' href='#'>Home</a></li>
            <li className='nav-item'><a className='nav-link' href='#'>Inventory</a></li>
            <li className='nav-item'><a className='nav-link' href='#'>Recipes</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}
