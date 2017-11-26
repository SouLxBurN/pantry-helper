import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './TopBar'
//import './index.css';

class UPCScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcValue: '',
      hide: {visibility: 'hidden'},
      itemName: '',
      itemDescription: '',
      itemQuantity: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Store input changes
  // Hide and empty description in preparation for new changes
  handleChange(event) {
    this.setState({
      upcValue: event.target.value,
      hide: {visibility: 'hidden'},
      itemName: '',
      itemDescription: '',
      itemQuantity: '',
    });
  }

  handleSubmit(event) {
     this.setState({
       hide: this.state.upcValue === '' ? {visibility: 'hidden'} :{visibility: 'visible'},
       itemName: 'Nilla Wafers',
       itemDescription: 'Soft and sweet wafers. Great for Banana Pudding.',
       itemQuantity: '2',
     });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label for='upcInput'>UPC: </label>
                  <input type='text' id='upcInput' className='form-control' value={this.state.upcValue}
                    onChange={this.handleChange} onBlur={this.handleSubmit}/>
              </div>
            </form>
          </div>
        </div>
        <div className='row' style={this.state.hide}>
          <div className='col'>
            <h1>Product Description</h1>
            <ul>
              <li><label>Name: {this.state.itemName}</label></li>
              <li><label>Description: {this.state.itemDescription} </label></li>
              <li><label>Quantity: {this.state.itemQuantity}</label></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <TopBar />
    <UPCScanner />
  </div>,
  document.getElementById('root')
);
