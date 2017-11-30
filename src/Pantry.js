import React from 'react';
import UPCScanner from './UPCScanner';

export default class Pantry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantryItems:
        [{
          name: '2% Milk 1 Gallon',
          description: '1 Gallon of 2% Fat Dairy Milk.',
          quantity: '1',
        },
        {
          name: 'Jumbo Eggs 12Pack',
          description: '12 Pack Jumbo Free Range Chicken Eggs.',
          quantity: '1',
        },
        {
          name: 'Oreo Double Stuff',
          description: 'Crunchy chocolate cookies with a sweet cream in the middle.',
          quantity: '2',
        },
        {
          name: 'Mountain Dew 12Pack',
          description: 'Carbonated soft drink brand produced and owned by PepsiCo.',
          quantity: '2',
        },
        {
          name: 'Pepsi 12Pack',
          description: 'Carbonated soft drink brand produced and owned by PepsiCo.',
          quantity: '1',
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
        {this.state.pantryItems.length > 0 &&
          // Render the Pantry Inventory list only if items exist.
          <div className='row'>
            <div className='col'>
              <h2>Pantry</h2>
              <PantryInventory pantryItems={this.state.pantryItems}/>
            </div>
          </div>
        }
        <div className='row'>
          <div className='col'>
            <UPCScanner onSubmit={this.onUPCSubmit} />
            {description}
          </div>
        </div>
      </div>
    )
  }
}

function PantryInventory(props) {
  return (
    <table className='table table-hover'>
      <thead className='thead-light'>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {props.pantryItems.map((item) => {
          return <PantryInventoryItem key={item.name} item={item}/>
        })}
      </tbody>
    </table>
  )
}

/*
 * Pantry Inventory Table Row
 */
function PantryInventoryItem(props) {
  // TODO OnClick should navigate to a View Item Page
  return (
    <tr onClick={() => alert(props.item.name)}>
      <td>{props.item.name}</td>
      <td>{props.item.description}</td>
      <td>{props.item.quantity}</td>
    </tr>
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
      <h2>{props.item.name}</h2>
      <dl className='row'>
        <dt className='col-sm-3'>SKU#</dt><dd className='col-sm-9'>{props.item.upc}</dd>
        <dt className='col-sm-3'>Description</dt><dd className='col-sm-9'>{props.item.description}</dd>
        <dt className='col-sm-3'>Quantity</dt><dd className='col-sm-9'>{props.item.quantity}</dd>
      </dl>
    </div>
  )
}
