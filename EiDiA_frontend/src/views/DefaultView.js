"use strict";

import React from 'react';
import Page from "../components/Page";

export class DefaultView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setTitle("Not implemented");
    }

    render() {
        return (
            <Page>
                This is not yet implemented
            </Page>
        );
    }
}
