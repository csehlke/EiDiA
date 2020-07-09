"use strict";

import React from 'react';
import Page from "../components/Page";
import Login from "../components/login/Login";
import UserService from "../services/UserService";
import BackgroundImage from "../assets/loginBackground.jpg";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";


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
        }

        this.handleErrorBarClose = this.handleErrorBarClose.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Login");
    }

    login(user) {
        UserService.login(user.username, user.password)
            .then((data) => {
                window.location.reload(); //TODO this.props.history.push('/'); did not work even when importing router
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
