"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/DocEditor";
import {RightSidepanel} from "../components/RightSidepanel";
import {Container, Col, Row} from "react-bootstrap";

export class ExportView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title={"Export"}>
                <RightSidepanel/>
                <DocEditor/>
                
            </Page>
        );
    }
}

