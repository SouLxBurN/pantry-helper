import React from 'react';
import UPCScanner from './UPCScanner';

export default class Pantry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantryItems:
        [{
          name: '1 Gallon 2% Milk',
          description: '1 Gallon of 2% Fat Dairy Milk.',
          quantity: '1',
        },
        {
          name: '12 Pack Jumbo Eggs',
          description: '12 Pack Jumbo Free Range Chicken Eggs.',
          quantity: '1',
        },
        {
          name: 'Oreo Double Stuff',
          description: 'Crunchy chocolate cookies with a sweet cream in the middle.',
          quantity: '2',
        }],
    };
    this.onUPCSubmit = this.onUPCSubmit.bind(this);
  }

  onUPCSubmit(event, item) {
    event.preventDefault();
    this.setState({
      item: item,
    });
  }

  render() {
    let description = null;
    if (this.state.item && !this.state.item.name) {
      description = <h3>Product Not Found.</h3>;
    }
    else {
      description = <ProductDescription item={this.state.item} />
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <ul className='list-group'>
              <li className='list-group-item'><UPCScanner onSubmit={this.onUPCSubmit} /></li>
              <li className='list-group-item'>{description}</li>
            </ul>
          </div>
          <div className='col'>
            <Inventory pantryItems={this.state.pantryItems}/>
          </div>
        </div>
      </div>
    )
  }
}

function Inventory(props) {
  return (
    <div>

      <ul className='list-group'>
        <li className='list-group-item'><h2>Your Pantry</h2></li>
        {props.pantryItems.map((item) => {
          return <InventoryItem key={item.name} item={item}/>
        })}
      </ul>
    </div>
  )
}

function InventoryItem(props) {
  return (
    <li className='list-group-item'>
      <dl className='dl-horizontal'>
        <dt>Name</dt><dd>{props.item.name}</dd>
        <dt>Description</dt><dd>{props.item.description}</dd>
        <dt>Quantity</dt><dd>{props.item.quantity}</dd>
      </dl>
    </li>
  )
}

/*
 * Product Description Component
 */
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
