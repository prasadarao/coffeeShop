import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from '../config/routes';

render(
    <AppContainer>
        <Router routes={routes} history={browserHistory} />
    </AppContainer>,
    document.getElementById('root')
);