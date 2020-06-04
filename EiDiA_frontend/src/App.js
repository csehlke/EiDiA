"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { WelcomePageView } from './views/WelcomePageView';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'EiDiA',
            routes: [
                /**
                 * Here all Page Components are declared together with their relative path
                 */
                { component: WelcomePageView , path: '/', exact: true},
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

