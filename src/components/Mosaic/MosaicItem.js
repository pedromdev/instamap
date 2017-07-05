import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MosaicItem extends Component {

  static propTypes = {
    media: PropTypes.object.isRequired,
    style: PropTypes.object
  };

  render() {
    let style = this.props.style || {};

    return (
      <div className="mosaic-item" style={style}>
        <img key={1} src={this.props.media.image.standard_resolution.url} />
        <div key={2} className="mosaic-item-description">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MosaicItem;