import React, { Component } from 'react';
import Instajam from 'instajam';
import PhotosMap from '../components/PhotosMap/PhotosMap';
import AuthorizationButton from '../components/AuthorizationButton/AuthorizationButton';
import { CLIENT_ID } from '../config/Api';

class IndexPage extends Component {

  constructor(props) {
    super(props);
    
    this.api = Instajam.init({
      clientId: CLIENT_ID,
      redirectUri: window.location.origin,
      scope: ['public_content', 'follower_list']
    });
    
    this.state = {
      accessToken: this.getAccessToken()
    };
  }

  getAccessToken() {
    if (localStorage.getItem("instagram_access_token")) {
      return localStorage.getItem("instagram_access_token");
    }

    let accessTokenFromHash = this.getaccessTokenFromHash();

    if (accessTokenFromHash) {
      localStorage.setItem("instagram_access_token", accessTokenFromHash);
      return accessTokenFromHash;
    }
    return null;
  }

  getaccessTokenFromHash() {
    const regexp = /access_token=([^&]+)/;
    let hash = this.props.location.hash;
    let matches;

    if (!regexp.test(hash)) {
      return null;
    }
    matches = regexp.exec(hash);
    return matches[0];
  }

  render() {
    return (
      this.state.accessToken != null ?
        <PhotosMap
          api={this.api}
          defaultPosition={[-3.7655529, -38.5514437]}
          style={{
            height: (window.innerHeight - 76) + "px"
          }}
          />
        :
        <AuthorizationButton
          type="instagram"
          url={this.api.authUrl}
          style={{marginTop: "15px"}}
        >
          Entrar com Instagram
        </AuthorizationButton>
    );
  }
}

export default IndexPage;