import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';
import PhotoMarker from '../PhotoMarker/PhotoMarker';

class PhotosMap extends Component {

  static propTypes = {
    api: PropTypes.object.isRequired,
    defaultPosition: PropTypes.array.isRequired,
    zoom: PropTypes.number,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: this.getUserGeolocationFromLocalStorage() || props.defaultPosition,
      zoom: props.zoom || 19,
      markers: [],
      followedUsersIDs: []
    };

    props.api.user.following("self", (response) => {
      let ids = response.data.map((item) => {
        return item.id;
      });
      this.setState({
        followedUsersIDs: ids
      })
    });
  }

  getUserGeolocationFromLocalStorage() {
    let geolocation = localStorage.getItem("user-geolocation");

    if (!geolocation) {
      return null;
    }
    return JSON.parse(geolocation);
  }

  componentDidMount() {
    if (navigator.geolocation && !this.getUserGeolocationFromLocalStorage()) {
      navigator.geolocation.getCurrentPosition(position => {
        let arrayPosition = [position.coords.latitude, position.coords.longitude];
        localStorage.setItem("user-geolocation", JSON.stringify(arrayPosition));
        this.setState({
          position: arrayPosition
        });
      });
    }

    let position = this.state.position;
    this.searchLocation(position, (response) => {
      this.addLocations(response.data);
    });
  }

  searchLocation(position, handler) {
    let map = this.refs.map.leafletElement;
    let mapBoundNorthEast = map.getBounds().getNorthEast();
    let mapMaxRadius = Math.ceil(mapBoundNorthEast.distanceTo(map.getCenter()));
    this.props.api.location.search({
      lat: position[0],
      lng: position[1],
      distance: mapMaxRadius
    }, handler.bind(this));
  }

  handleViewportChanged(viewport) {
    this.searchLocation(viewport.center, (response) => {
      let newLocations = response.data.filter((item) => {
        for (var key in this.state.markers) {
          if (this.state.markers[key].location.id === item.id) {
            return false;
          }
        }
        return true;
      });
      
      if (newLocations.length > 0) {
        this.addLocations(newLocations);
      }
    });
  }

  addLocations(locations) {
    let total = locations.length;
    let i = 0;
    let responseHandler = (response) => {
      i++;

      if (response.data.length > 0) {
        response.data.forEach((element) => {
          if (this.state.followedUsersIDs.indexOf(element.user.id) === -1) {
            return;
          }
          this.state.markers.push(element);
        }, this);
      }

      if (i === total) {
        this.setState({
          markers: this.state.markers
        });
      }
    };

    locations.forEach((location) => {
      this.props.api.location.media(location.id, responseHandler.bind(this));
    }, this);
  }

  render() {
    const markers = this.state.markers.map(marker => {
      return (
        <PhotoMarker key={marker.id} media={marker} />
      );
    });
    
    return (
      <div className="App-map" style={this.props.style || {}}>
        <Map
          ref="map"
          onViewportChanged={this.handleViewportChanged.bind(this)}
          center={this.state.position || this.props.defaultPosition}
          zoom={this.state.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </Map>
      </div>
    );
  }
}

export default PhotosMap;