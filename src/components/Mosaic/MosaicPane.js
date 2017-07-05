import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MosaicItem from './MosaicItem';

class MosaicPane extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    let mosaicItems = this.props.items.map((item) => {
      return (
        <MosaicItem key={item.id} media={item}>Description</MosaicItem>
      );
    });
    
    return (
      <div className="mosaic">
        {mosaicItems}
      </div>
    );
  }
}

export default MosaicPane;