"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import WebFontLoader from 'webfontloader';

import {createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0094C6",
        },
        secondary: {
            main: "#ff0000",
        },
    },
});

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <App/>
</MuiThemeProvider>, document.getElementById('app'));
