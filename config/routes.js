import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../src/layout/app';
import Home from '../src/handlers/Home';
import Menu from '../src/handlers/Menu';
import Add from '../src/handlers/Add';
import AddMenuItem from '../src/handlers/AddMenuItem';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={Home} />
    <Route path="/orders" component={Home} selectedMenuItem="/orders" />
    <Route path="/menu" component={Menu} selectedMenuItem="/menu"/>
    <Route path="/addOrder" component={Add} selectedMenuItem="/addOrder"/>
    <Route path="/addMenuItem" component={AddMenuItem} selectedMenuItem="/addMenuItem"/>
  </Route>
);
