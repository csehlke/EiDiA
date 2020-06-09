"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {WelcomeView} from "./views/WelcomeView";
import {SearchView} from "./views/SearchView";
import Navigation from "./components/Navigation";
import {FileCabinetView} from "./views/FileCabinetView"


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'EiDiA - Einfache Digitale Akte',
            routes: [
                {
                    path: '/', exact: true, render: () => (
                        <WelcomeView title={this.state.pageTitle}
                                     setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                    )
                },
                {
                    path: '/search', exact: true, render: () => (
                        <SearchView title={this.state.pageTitle}
                                    setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                    )
                },
                {
                    path: '/cabinet', exact: true, render: () => (
                        <FileCabinetView title={this.state.pageTitle}
                                         setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                    )
                },
            ],
            pageTitle: ''
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    handlePageTitleChange(newTitle) {
        this.setState({
            pageTitle: newTitle
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navigation title={this.state.pageTitle}>
                        <Switch>
                            {this.state.routes.map((route, i) => (
                                <Route key={i} {...route}/>
                            ))}
                        </Switch>
                    </Navigation>
                </Router>
            </div>
        );
    }
}

