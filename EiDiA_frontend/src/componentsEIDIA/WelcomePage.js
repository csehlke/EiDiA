"use strict";

import React from 'react';
//import { Link } from 'react-router-dom'
//import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon } from 'react-md';

import Page from './Page';

//import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
               <p>Hello</p>
            </Page>
        );
    }
}