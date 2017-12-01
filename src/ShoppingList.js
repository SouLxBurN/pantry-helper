import React from 'react';

// Placeholder for Shopping List Page
export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingList: [{
        name: 'Bread',
      },
      {
        name: 'Mountain Dew',
      },
      {
        name: 'Milk',
      },
      {
        name: 'Eggs',
      }],
      completedList: [],
    };
    this.onPendingClick = this.onPendingClick.bind(this);
    this.onCompletedClick = this.onCompletedClick.bind(this);
    this.handleFinished = this.handleFinished.bind(this);
  }

  /*
   * When a Pending Item is clicked
   * Remove it from the Pending list and into the Completed List
   */
  onPendingClick(event, item) {
    event.preventDefault();
    const pendingArray = this.state.pendingList.filter(function(i) {
      return i !== item;
    });
    const completedArray = this.state.completedList.slice();
    completedArray.push(item);
    this.setState({
      pendingList: pendingArray,
      completedList: completedArray,
    });
  }

  /*
   * When a Completed Item clicked
   * Remove it from the Completed list and into the Pending List
   */
  onCompletedClick(event, item) {
    event.preventDefault();
    const completedArray = this.state.completedList.filter(function(i) {
      return i !== item;
    });
    const pendingArray = this.state.pendingList.slice();
    pendingArray.push(item);
    this.setState({
      pendingList: pendingArray,
      completedList: completedArray,
    });
  }

  /*
   * When Complete Shopping button is Clicked
   * Remove all items from completed list and add them to the pantry.
   */
  handleFinished(event) {
    event.preventDefault();
    this.setState({
      completedList: [],
    });
  }

  render() {
    return (
      <div className='container'>
        {this.state.pendingList.length > 0 &&
          // Render Shopping List only when items exist in it.
          <div className='row'>
            <div className='col'>
              <h2>Shopping List</h2>
              <ShoppingListComponent list={this.state.pendingList} onClick={this.onPendingClick}/>
            </div>
          </div>
        }
        {this.state.completedList.length > 0 &&
          // Render Completed List only when items exist in it.
          <div className='row'>
            <div className='col'>
              <button type='button' className='btn btn-primary' onClick={this.handleFinished}>Complete Shopping</button>
              <h2>Completed List</h2>
              <ShoppingListComponent list={this.state.completedList} onClick={this.onCompletedClick}/>
            </div>
          </div>
        }
        {(this.state.pendingList.length === 0 && this.state.completedList.length === 0) &&
          // Render Empty Shopping List Messages only when both lists are empty.
          <div className='row'>
            <div className='col'>
              <h2 className='text-center'>Your Shopping List is Empty.</h2>
            </div>
          </div>
        }
      </div>
    )
  }
}

/*
 * List Component for listing items with an onClick Action
 */
function ShoppingListComponent(props) {
  return (
    <div className='list-group'>
      {props.list.map((item) => {
        return <a href='' className='list-group-item list-group-item-action'
          key={item.name} onClick={(e) => props.onClick(e,item)}>
           {item.name}
         </a>
      })}
    </div>
  )
}
