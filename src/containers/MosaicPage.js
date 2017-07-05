import React, { Component } from 'react';
import { Link } from 'react-router';
import Instajam from 'instajam';
import FontAwesome from 'react-fontawesome';
import MosaicPane from '../components/Mosaic/MosaicPane';
import { CLIENT_ID } from '../config/Api';

class MosaicPage extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.api = Instajam.init({
      clientId: CLIENT_ID,
      redirectUri: window.location.origin,
      scope: ['public_content', 'follower_list']
    });

    this.state = {
      items: [
        {
          id: 1,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
        {
          id: 2,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
        {
          id: 3,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
        {
          id: 4,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
        {
          id: 5,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
        {
          id: 6,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
        {
          id: 7,
          image: {
            standard_resolution: {
              url: "https://facebook.github.io/react/img/logo.svg"
            }
          }
        },
      ]
    };
  }

  componentDidMount() {
    this.api.media.search({
      lat: parseInt(this.props.routeParams.lat),
      lng: parseInt(this.props.routeParams.lng)
    }, (response) => {
      let medias = response.data.filter((media) => {
        return media.user.id === this.props.routeParams.user_id;
      });

      this.setState({
        items: medias
      });
    })
  }

  render() {
    return (
      <div>
        <Link className="back-to-home" to="/">
          <FontAwesome name="angle-left" />
          Back
        </Link>
        <MosaicPane items={this.state.items}/>
      </div>
    );
  }
}

export default MosaicPage;