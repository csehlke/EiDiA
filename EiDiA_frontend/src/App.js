"use strict";

import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {DefaultView} from "./views/DefaultView";
import {LoginView} from "./views/LoginView";
import {SearchView} from "./views/SearchView";
import {FileCabinetView} from "./views/FileCabinetView"
import RecordView from "./views/RecordView";
import {UploadView} from "./views/UploadView";
import {WelcomeView} from "./views/WelcomeView";
import Navigation from "./components/Navigation";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

import UserService from "./services/UserService";
import {UserAdministrationView} from "./views/UserAdministrationView";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'EiDiA - Einfache Digitale Akte',
            routes: [
                this.getRoute('/', WelcomeView, true),
                this.getRoute('/browse', DefaultView, true),
                this.getRoute('/export', DefaultView, true),
                this.getRoute('/help', DefaultView, true),
                this.getRoute('/permissionRequests', DefaultView, true),
                this.getRoute('/record', DefaultView, true),
                this.getRoute('/record/:id', DefaultView, false),
                this.getRoute('/search', SearchView, true),
                this.getRoute('/settings', DefaultView, true),
                this.getRoute('/upload', UploadView, true),
                {
                    path: '/admin', exact: true, render: () => {
                        if (UserService.isAuthenticated()) { // TODO check if admin user
                            return (
                                <UserAdministrationView title={this.state.pageTitle}
                                                        setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/login', exact: true, render: () => {
                        if (!UserService.isAuthenticated()) {
                            return (
                                <LoginView title={this.state.pageTitle}
                                           setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/'}/>)
                        }
                    }
                },
            ],
            pageTitle: ''
        };
    }

    getRoute(path, Component, exact) {
        return {
            path: path, exact: exact, render: () => {
                if (UserService.isAuthenticated()) {
                    return (
                        <Component title={this.state.pageTitle}
                                   setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                    )
                } else {
                    return (<Redirect to={'/login'}/>)
                }
            }
        }
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
                        <DndProvider backend={HTML5Backend}>
                            <Switch>
                                {this.state.routes.map((route, i) => (
                                    <Route key={i} {...route}/>
                                ))}
                            </Switch>
                        </DndProvider>
                    </Navigation>
                </Router>
            </div>
        );
    }
}
