"use strict";

import React from 'react';


import Page from './Page';



export class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
               <p>Hello </p>
            </Page>
        );
    }
}