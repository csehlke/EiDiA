"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {WelcomeView} from "./views/WelcomeView";
import {SearchView} from "./views/SearchView";
import Navigation from "./components/Navigation";
import {UploadView} from "./views/UploadView";
import {DefaultView} from "./views/DefaultView";


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
                    path: '/permissionRequests', exact: true, render: () => (
                        <DefaultView title={this.state.pageTitle}
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
                    path: '/settings', exact: true, render: () => (
                        <DefaultView title={this.state.pageTitle}
                                     setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                    )
                },
                {
                    path: '/upload', exact: true, render: () => (
                        <UploadView title={this.state.pageTitle}
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

