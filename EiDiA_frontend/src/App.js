"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {WelcomeView} from "./views/WelcomeView";
import {SearchView} from "./views/SearchView";
import {FileCabinetView} from "./views/FileCabinetView"
import {RecordView} from "./views/RecordView";
import Navigation from "./components/Navigation";
import {RecordMenue} from "./components/fileCabinet/RecordMenue";


export default class App extends React.Component {

    constructor(props) {
        super(props);
       /* [
            {component: WelcomeView, path: '/', exact: true},
            {component: SearchView, path: '/search', exact: true},
            {component: RecordView, path: '/record', exact: true},
            {component: FileCabinetView, path: '/cabinet', exact: true}
        ]*/
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
                    path: '/record', exact: true, render: () => (
                        <RecordView title={this.state.pageTitle}
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

