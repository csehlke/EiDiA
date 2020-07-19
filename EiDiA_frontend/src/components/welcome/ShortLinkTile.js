"use strict";

import React from 'react';
import styled from "styled-components";
import {Link} from "../Link";
import {IconContext} from "react-icons";

const Quarter = styled(Link)`
    height: auto;
    font-size: 2.5em;
`;

const HeadingNoMargin = styled.p`
    margin-top: 0;
    text-align: center;
    font-size: 0.75em;
`;

export default class ShortLinkTile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const FolderLogo = styled(this.props.icon)`
            font-size: 6em;
            margin: 0 0.5em;
        `;

        return (
            <Quarter to={this.props.link}>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <FolderLogo/>
                </IconContext.Provider>
                <HeadingNoMargin>{this.props.name}</HeadingNoMargin>
            </Quarter>
        );
    }
}
