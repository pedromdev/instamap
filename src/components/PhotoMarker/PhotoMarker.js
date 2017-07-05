import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';

class PhotoMarker extends Component {

  static propTypes = {
    media: PropTypes.object.isRequired
  };

  render() {
    let user_id = this.props.media.user.id;
    let latitude = this.props.media.location.latitude;
    let longitude = this.props.media.location.longitude;
    let position = [latitude, longitude];

    return (
      <Marker position={position}>
        <Popup>
          <span>
            <Link to={`/${user_id}/${latitude}/${longitude}`}>
              <img src={this.props.media.images.thumbnail.url} />
            </Link>
            <p>A pretty CSS3 popup.<br/>Easily customizable.</p>
          </span>
        </Popup>
      </Marker>
    );
  }
}

export default PhotoMarker;