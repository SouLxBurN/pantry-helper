import React from 'react'

class ListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      displayableItems: [],
    };
    this.onSelect = this.onSelect.bind(this);
    this.sortAndFilterItems = this.sortAndFilterItems.bind(this);
  }

  /*
   * When the input field is manually entered, clear the selected item
   * filter the suggested items and if the input matches one exactly
   * select it.
   */
  onChange(event) {
    event.preventDefault();
    this.sortAndFilterItems(event.target.value);
    this.props.onChange(event);
  }

  /*
   * When an item is selected update the state with the current active item
   */
  onSelect(event, item) {
    event.preventDefault();
    this.setState({
      activeItem: item,
    })
    this.props.onSelect(item);
  }

  render() {
    return (
      <div className='form-group'>
        <label htmlFor='nameInput'>Name</label>
        <input type='text' id='nameInput' className='form-control' value={this.props.value}
            onChange={(e) => this.onChange(e)} />
        {this.props.value.length > 0 &&
          <div className='list-group'>
            {this.state.displayableItems.slice(0,5).map((item) => (
              <ListItem key={item.name} item={item} onSelect={this.onSelect}
                active={item === this.state.activeItem} />
            ))}
          </div>
        }
      </div>
    )
  }


  /*
   * Sorts and Filters the suggested items based on 'name'
   */
  sortAndFilterItems(name) {
    let itemsCopy = this.props.items.slice().sort((a,b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    const displayableItems = itemsCopy.filter(
      item => item.name.toLowerCase().startsWith(name.toLowerCase())
    );

    let activeItem = {};
    if (displayableItems.length === 1
      && displayableItems[0].name.toLowerCase() === name.toLowerCase()) {
        activeItem = displayableItems[0];
        this.setState({
          activeItem: activeItem,
          displayableItems: displayableItems,
        })
        this.props.onSelect(activeItem);
    }
    else {
      this.setState({
        activeItem: activeItem,
        displayableItems: name.length <= 0 ? []: displayableItems,
      })
    }
  }
}

/*
 * Individual Item Component
 */
class ListItem extends React.Component {
  render() {
    let styleClass = 'list-group-item list-group-item-action';
    if (this.props.active) {
      styleClass = styleClass + ' active';
    }

    return (
      <a href='' key={this.props.name} className={styleClass}
          onClick={(e) => {this.props.onSelect(e, this.props.item)}}>
        {this.props.item.name}
      </a>
    )
  }
}

export default ListSelect;
