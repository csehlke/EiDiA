"use strict";

import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

const Background = styled(Paper)`
    max-width: 20em;
    min-width: 14em;
    border-color: rgba(0, 0, 0, 0.26);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    padding: 0.5em;
`;

const H2 = styled.h2`
    margin: 0;
`;

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const password = this.state.password;
        let user = {
            username: this.state.username,
            password: password,
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Background>
                <H2>Welcome To EiDiA</H2>
                <hr/>
                <p>Please Login</p>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        label="Username"
                        id="LoginField"
                        style={{margin: '0.5em 0'}}
                        fullWidth
                        size={"small"}
                        required={true}
                        autoFocus={true}
                        value={this.state.username}
                        onChange={this.handleChangeUsername}
                        variant="outlined"/>
                    <TextField
                        label="Password"
                        id="PasswordField"
                        type="password"
                        style={{margin: '0.5em 0'}}
                        fullWidth
                        size={"small"}
                        required={true}
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        variant="outlined"/>
                    <Button id="submit"
                            type="submit"
                            disabled={this.state.username === undefined || this.state.username === '' || this.state.password === undefined || this.state.password === ''}
                            variant="contained"
                            color="primary"
                            size={"medium"}
                            fullWidth
                            style={{padding: '0.5em'}}>
                        Login
                    </Button>
                </form>
            </Background>
        );
    }
}
