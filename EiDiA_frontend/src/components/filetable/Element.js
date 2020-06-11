"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";

const FlexRow = styled.div`
    margin: 2vh 5% 2vh 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap
    border: 1px solid transparent;
    border-radius: 3px;
    border-color:#DADADA;

`;
export  class Element extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            symbolArray: []
        }
    }


    render() {
        return (
            <FlexRow>
                <ElementSymbol type ={'word'}/>
                <div>
                    Date
                </div>
                <div>
                    Last Modified
                </div>
                <div>
                    Comment
                </div>
                <div>
                    Edit
                    Delete
                    Download
                </div>
            </FlexRow>
        );
    }
}
