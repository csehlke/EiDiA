"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom'


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Here is the header
            </div>
        );
    }
}

export default withRouter(Header);