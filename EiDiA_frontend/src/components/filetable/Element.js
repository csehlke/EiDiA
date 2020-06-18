"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";

const ElementRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

const Symbol = styled.div`
    width: 5%;
`;

const Name = styled.div`
    width: 20%;  
`;

const Date = styled.div`
    width: 10%;  
`;

const Comment = styled.div`
    width: 40%;  
`;

const Actions = styled.div`
    width: 15%;  
`;

export class Element extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            symbolArray: [],
        }
    }

    render() {
        return (
            <ElementRow>
                <Symbol>
                    <ElementSymbol type={this.props.type}/>
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
                    <ElementActions actions={this.props.actions}/>
                </Actions>
            </ElementRow>
        );
    }
}
