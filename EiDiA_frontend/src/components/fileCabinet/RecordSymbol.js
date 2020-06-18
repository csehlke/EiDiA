"use strict";

import React from 'react';
import styled from "styled-components";
import { Folder } from '@material-ui/icons';


const Quarter = styled.div`
    width: 14.5%;
    height: auto;
    font-size: 2vw;
    

`;
const HeadingNoMargin = styled.p`
    margin-top: 0;
    text-align: center;
`;

export class RecordSymbol extends React.Component {



    /*
     *TODO:
     * - add Logo to Record?
     *
     *
     */
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <Quarter>
                <Folder style={{fontSize: '14vw'}}/>
                <HeadingNoMargin>{this.props.name}</HeadingNoMargin>
            </Quarter> )

    }
}