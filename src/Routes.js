import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import IndexPage from './containers/IndexPage';
import MosaicPage from './containers/MosaicPage';

export default <Route path="/" component={App}>
  <IndexRoute component={IndexPage}/>
  <Route path="/:user_id/:lat/:lng" component={MosaicPage} />
</Route> 