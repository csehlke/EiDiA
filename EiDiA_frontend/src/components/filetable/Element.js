"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";

const ElementRow = styled.div`
    margin: 2vh 5vw  2vh 5vw;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap
    border: 1px solid transparent;
    border-radius: 3px;
    border-color:#DADADA;

`;

const Symbol = styled.div`
    width: 5vw;  

`;
const Name = styled.div`
    width: 20vw;  
`;
const Date = styled.div`
    width: 10vw;  
`;
const Comment = styled.div`
    width: 40vw;  
`;
const Actions = styled.div`
    width: 15vw;  
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
            <ElementRow>
                <Symbol>
                    <ElementSymbol type ={this.props.type}/>
                </Symbol>
                <Name>
                    {this.props.name}
                </Name>

                <Date>
                    {this.props.dateCreation}
                </Date>
                <Date>
                    {this.props.dateModification}
                </Date>
                <Comment>
                    {this.props.comment}

                </Comment>
                <Actions>
                    <ElementActions actions = {this.props.actions}/>
                </Actions>
            </ElementRow>
        );
    }
}
