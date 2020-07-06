"use strict";

import React from 'react';
import Page from "../components/Page";
import ExportMainView from '../components/ExportView/ExportMainView';

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
        this.setState({currentPage: page, readOnly: (page=="Select Template")});
    }

    render() {
        return (
            //<Page isExportView={true} title={this.state.currentPage} changeView={this.changeView}>
                <ExportMainView currentPage={this.state.currentPage} readOnly={this.state.readOnly} changeView={this.changeView}/>
            //</Page>
        );
    }
}
