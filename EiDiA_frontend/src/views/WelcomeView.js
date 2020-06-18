"use strict";

import React from 'react';
import Page from "../components/Page";


export class WelcomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setTitle("Welcome");
    }

    render() {
        return (
            <Page title={this.props.title}>
                <div>
                    Welcome to EiDiA
                </div>
            </Page>
        );
    }
}
