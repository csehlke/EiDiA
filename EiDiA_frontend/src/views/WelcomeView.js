"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import UserArea from "../components/welcome/UserArea";
import RecentFiles from "../components/welcome/RecentFiles";
import ShortLinks from "../components/welcome/ShortLinks";

const Row = styled.div`
    display: flex;
`;

const ColumnLeft = styled.div`
    flex: 20%;
`;

const ColumnRight = styled.div`
    flex: 80%;
`;

export class WelcomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setTitle("Welcome");
    }

    render() {
        return (
            <Page>
                <Row>
                    <ColumnLeft>
                        <UserArea/>
                    </ColumnLeft>
                    <ColumnRight>
                        <Row>
                            <RecentFiles/>
                        </Row>
                        <Row>
                            <ShortLinks/>
                        </Row>
                    </ColumnRight>
                </Row>
            </Page>
        );
    }
}
