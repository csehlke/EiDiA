"use strict";

import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {DefaultView} from "./views/DefaultView";
import {LoginView} from "./views/LoginView";
import {SearchView} from "./views/SearchView";
import {UploadView} from "./views/UploadView";
import {WelcomeView} from "./views/WelcomeView";
import {ExportView} from "./views/ExportView";
import Navigation from "./components/Navigation";
import UserService from "./services/UserService";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'EiDiA - Einfache Digitale Akte',
            routes: [
                {
                    path: '/', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <WelcomeView title={this.state.pageTitle}
                                             setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/browse', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <DefaultView title={this.state.pageTitle}
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
                {
                    path: '/permissionRequests', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <DefaultView title={this.state.pageTitle}
                                             setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/record', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <DefaultView title={this.state.pageTitle}
                                             setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/record/:id', render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <DefaultView title={this.state.pageTitle}
                                             setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/search', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <SearchView title={this.state.pageTitle}
                                            setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/settings', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <DefaultView title={this.state.pageTitle}
                                             setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/upload', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <UploadView title={this.state.pageTitle}
                                            setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                },
                {
                    path: '/export', exact: true, render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <ExportView title={this.state.pageTitle}
                                            setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                            )
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }
                }
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
