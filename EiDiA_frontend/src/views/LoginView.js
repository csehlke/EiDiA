"use strict";

import React from 'react';
import Page from "../components/Page";
import Login from "../components/login/Login";
import UserService from "../services/UserService";
import BackgroundImage from "../assets/loginBackground.jpg";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Redirect} from "react-router-dom";

const Background = styled.div`
    background-image: url(${BackgroundImage});
    position: fixed;
    z-index: -2;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
`;

export class LoginView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isErrorBarOpen: false,
            redirect: null
        }

        this.handleErrorBarClose = this.handleErrorBarClose.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Login");
    }

    login(user) {
        UserService.login(user.username, user.password)
            .then(() => {
                this.setState({
                    redirect: '/',
                })
            })
            .catch((e) => {
                this.setState({
                    error: e,
                    isErrorBarOpen: true,
                });
            });
    }

    handleErrorBarClose() {
        this.setState({
            isErrorBarOpen: false,
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <Page>
                <Background/>
                <Login onSubmit={(user) => this.login(user)}/>
                <Snackbar
                    open={this.state.isErrorBarOpen}
                    autoHideDuration={10000}
                    onClose={this.handleErrorBarClose}>
                    <Alert severity="error" onClose={this.handleErrorBarClose}>
                        Username or Password is incorrect.<br/>
                        To reset your password please contact your administrator.
                    </Alert>
                </Snackbar>
            </Page>
        );
    }
}
