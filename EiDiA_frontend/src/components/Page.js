"use strict";

import React from 'react';

import {Footer} from "./Footer";
import PropTypes from "prop-types";

export default class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                {this.props.children}
                <Footer/>
            </section>
        );
    }
}

Page.propTypes = {
    children: PropTypes.array,
}
