"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {WelcomeView} from "./views/WelcomeView";
import {ExportView} from "./views/ExportView";



export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'EiDiA - Einfache Digitale Akte',
            routes: [
                { component: WelcomeView , path: '/', exact: true},
                { component: ExportView , path: '/export', exact: true}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

