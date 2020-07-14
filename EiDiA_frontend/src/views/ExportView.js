"use strict";

import React from 'react';
import ExportMainView from '../components/exportView/ExportMainView';
import Header from '../components/exportView/Header';
import Page from "../components/Page";
import {pageNames} from "../support files/constants";

export class ExportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: pageNames.selectTemplate,
            readOnly: true
        }
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Create Document");
    }

    changeView(page) {
        this.setState({
            currentPage: page,
            readOnly: (page !== pageNames.editTemplate)
        });
    }

    render() {
        return (
            <Page>
                <Header title={this.state.currentPage} changeView={this.changeView}/>
                <ExportMainView
                    currentPage={this.state.currentPage}
                    readOnly={this.state.readOnly}
                    changeView={this.changeView}/>
            </Page>
        );
    }
}
