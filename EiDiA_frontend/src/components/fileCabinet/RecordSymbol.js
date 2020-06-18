"use strict";

import React from 'react';
import styled from "styled-components";
import {FaFolder} from "react-icons/all";


const Quarter = styled.div`
    width: 8em;
    height: auto;
`;

const HeadingNoMargin = styled.p`
    margin-top: 0;
    text-align: center;
`;

const FolderLogo = styled(FaFolder)`
     font-size: 5em;
     margin: 0 0.25em;
`;

export class RecordSymbol extends React.Component {
    /*
     *TODO:
     * - add Logo to Record?
     */
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Quarter>
                <FolderLogo/>
                <HeadingNoMargin>
                    {this.props.name}
                </HeadingNoMargin>
            </Quarter>
        );
    }
}
