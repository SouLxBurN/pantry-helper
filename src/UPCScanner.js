import React from 'react';

export default class UPCScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcInput: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // Store input changes
  handleChange(event) {
    this.setState({
      upcInput: event.target.value,
      item: lookUpUPC(event.target.value),
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.onSubmit(e, this.state.item)}>
        <div className='form-group'>
          <label htmlFor='upcInput'><h2>Scan or Enter UPC Here</h2></label>
            <input type='text' id='upcInput' className='form-control' value={this.state.upcInput}
              onChange={this.handleChange} onBlur={(e) => this.props.onSubmit(e, this.state.item)}/>
        </div>
      </form>
    )
  }
}

function lookUpUPC(upc) {
  if (upc === '1111') {
    return {
      upc: upc,
      name: 'Nilla Wafers',
      description: 'Soft and sweet wafers. Great for Banana Pudding.',
      quantity: '2',
    };
  }
  return upc === '' ? null : {};
}
