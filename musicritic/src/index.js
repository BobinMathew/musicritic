/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/app/App';

const root = document.getElementById('root');

if (root) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        root
    );
}
