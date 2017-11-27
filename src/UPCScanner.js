import React from 'react';

export default class UPCScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcInput: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Store input changes
  handleChange(event) {
    this.setState({
      upcInput: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      // TODO This will be a lookup. Leave item empty if not found.
      item: {
        upc: this.state.upcInput,
        name: 'Nilla Wafers',
        description: 'Soft and sweet wafers. Great for Banana Pudding.',
        quantity: '2',
      },
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='upcInput'><h2>Scan or Enter UPC Here</h2></label>
                  <input type='text' id='upcInput' className='form-control' value={this.state.upcInput}
                    onChange={this.handleChange} onBlur={this.handleSubmit}/>
              </div>
            </form>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <ProductDescription item={this.state.item} />
          </div>
        </div>
      </div>
    )
  }
}

// Product Description
function ProductDescription(props) {
  if (!props.item) {
    return null;
  }

  return (
    <div>
      <h2>Product Description</h2>
      <dl className='dl-horizontal'>
        <dt>SKU#</dt><dd>{props.item.upc}</dd>
        <dt>Name</dt><dd>{props.item.name}</dd>
        <dt>Description</dt><dd>{props.item.description}</dd>
        <dt>Quantity</dt><dd>{props.item.quantity}</dd>
      </dl>
    </div>
  )
}
