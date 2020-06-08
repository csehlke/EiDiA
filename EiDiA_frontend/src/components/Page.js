"use strict";

import React from 'react';

import {Footer} from "./Footer";
import Navigation from "./Navigation";


export default class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Navigation title={this.props.title}>
                    {this.props.children}
                    <Footer/>
                </Navigation>
            </section>
        );
    }
}
