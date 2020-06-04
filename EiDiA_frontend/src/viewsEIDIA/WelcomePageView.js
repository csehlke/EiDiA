"use strict";

import React from 'react';
import MovieService from "../services/MovieService";
import {MovieList} from "../components/MovieList";

import { WelcomePage } from '../componentsEIDIA/WelcomePage';



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
