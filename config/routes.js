import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../src/layout/app';
import Home from '../src/handlers/Home';
import Menu from '../src/handlers/Menu';
import Add from '../src/handlers/Add';

export default (
	<Route path="/" component={ App }>
		<IndexRoute component={Home} />
		<Route path="/orders" component={Home} />
		<Route path="/menu" component={Menu} />
		<Route path="/addOrder" component={Add} />
	</Route>
);
