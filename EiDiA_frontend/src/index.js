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
            main: "#005E7C",
        },
        error: {
            main: "#ff0000"
        }
    },
    overrides: { //everything stated here will be used globally
        MuiCssBaseline: {
            '@global': {
                '*': {
                    'scrollbar-width': 'thin',
                },
            }
        }
    }
});


WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <App/>
</MuiThemeProvider>, document.getElementById('app'));
