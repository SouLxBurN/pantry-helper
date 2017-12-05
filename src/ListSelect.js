import React from 'react'

class ListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
    };
    this.onSelect = this.onSelect.bind(this);
  }

  /*
   * When Item is selected update the active flags in the wrapperList
   * Then call the props onSelect to propogate the selection to the parent.
   */
  onSelect(event, item) {
    event.preventDefault();
    this.setState({
      activeItem: item,
    })
    this.props.onSelect(item);
  }

  render() {
    if (!this.props.items) {
      return null;
    }
    return (
      <div className='list-group'>
        {this.props.items.map((item) => (
          <ListItem key={item.name} item={item} onSelect={this.onSelect}
            active={item === this.state.activeItem} />
        ))}
      </div>
    )
  }

}


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
