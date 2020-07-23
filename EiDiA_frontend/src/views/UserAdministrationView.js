"use strict";

import React from 'react';
import Page from "../components/Page";
import UserTable from "../components/login/UserTable";

export class UserAdministrationView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setTitle("User Administration");
    }

    render() {
        return (
            <Page>
                <UserTable/>
            </Page>
        );
    }
}
