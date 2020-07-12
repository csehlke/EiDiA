"use strict";

import React from 'react';
import ExportMainView from '../components/exportView/ExportMainView';
import Header from '../components/exportView/Header';
import Page from "../components/Page";

export class ExportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Select Template",
            readOnly: true
        }
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        this.props.setTitle(this.state.currentPage);
    }

    changeView(page) {
        this.props.setTitle(page);
        this.setState({
            currentPage: page,
            readOnly: (page === "Select Template")
        });
    }

    render() {
        return (
            <Page>
                <Header title={this.state.currentPage} changeView={this.changeView}/>
                <ExportMainView currentPage={this.state.currentPage} readOnly={this.state.readOnly}
                                changeView={this.changeView}/>
            </Page>
        );
    }
}
