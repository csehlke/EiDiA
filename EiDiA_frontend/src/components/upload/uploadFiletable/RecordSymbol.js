"use strict";

import React from 'react';
import styled from "styled-components";
import {FaFolder} from "react-icons/all";
import {IconContext} from "react-icons";


const Quarter = styled.div`
    height: auto;
    font-size: 1.5em;
`;

const HeadingNoMargin = styled.p`
    margin-top: 0;
    text-align: center;
`;

const FolderLogo = styled(FaFolder)`
     font-size: 3em;
     margin: 0 0.25em;
`;

export class RecordSymbol extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <Quarter>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <FolderLogo/>
                </IconContext.Provider>
                <HeadingNoMargin>{this.props.name}</HeadingNoMargin>
            </Quarter>
        );
    }
}