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
                '*::-webkit-scrollbar': {
                    'width': '7px',
                },
                '*::-webkit-scrollbar-track': {
                    'background-color': '#F5F5F5',
                },
                '*::-webkit-scrollbar-thumb': {
                    'background-color': '#cbcbcb',
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
                    'border-radius': '10px',
                    'border': '3px'
                },
                '.react-icons': { //style react icons with IconProvider here
                    'color': "#005E7C"
                }
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
