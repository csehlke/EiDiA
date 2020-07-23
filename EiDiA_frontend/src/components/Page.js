"use strict";

import React from 'react';

import PropTypes from "prop-types";

export default class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                {this.props.children}
            </section>
        );
    }
}

Page.propTypes = {
    children: PropTypes.any,
}
