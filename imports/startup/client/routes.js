import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/App.jsx';
import Home from '../../ui/containers/Index.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);