"use strict";

import React from 'react';
import styled from "styled-components";
import {FaFolder} from "react-icons/all";


const Quarter = styled.div`
    height: auto;
    font-size: 1.5em;
`;

const HeadingNoMargin = styled.p`
    margin-top: 0;
    text-align: center;
`;

const FolderLogo = styled(FaFolder)`
     font-size: 6em;
     margin: 0 0.25em;
`;

export default class RecordSymbol extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Quarter>
                <FolderLogo/>
                <HeadingNoMargin>{this.props.name}</HeadingNoMargin>
            </Quarter>
        );
    }
}