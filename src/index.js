import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import L from 'leaflet';

import registerServiceWorker from './registerServiceWorker';
import Root from './containers/Root';

import './style';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

ReactDOM.render(<Root history={browserHistory} />, document.getElementById('root'));
registerServiceWorker();
