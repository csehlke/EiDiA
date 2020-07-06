"use strict";

import React from 'react';

import Header from './Header';
import {Footer} from './Footer';

export default class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Header isExportView={this.props.isExportView} title={this.props.title} changeView={this.props.changeView}/>
                    {this.props.children}
                <Footer/>
            </section>
        );
    }
}
