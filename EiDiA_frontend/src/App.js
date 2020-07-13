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
                    path: '/browse', exact: true, render: () => (
                        <FileCabinetView title={this.state.pageTitle}
                                         setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}/>
                    )
                },

                {
                    path: '/record/:id', render: () => {
                        if (UserService.isAuthenticated()) {
                            return (
                                <RecordView title={this.state.pageTitle}
                                            setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}
                                />
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
            ],
            pageTitle: '',
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    handlePageTitleChange(newTitle) {
        this.setState({
            pageTitle: newTitle,
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
