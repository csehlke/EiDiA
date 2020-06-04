"use strict";

import React from 'react';

import { WelcomePage } from '../components/WelcomePage';



export class WelcomePageView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            //loading: true
        });


    }



    render() {

        return (
            <WelcomePage />
        );
    }
}
