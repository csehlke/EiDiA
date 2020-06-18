"use strict";

import React from 'react';

import styled from "styled-components";


const FlexRow = styled.div`
    margin: 1em 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

`;

//TODO font family does not fit
const MenuButton = styled.a`
    width: 8em;
    font-size: 1.5em;
    padding: 0.5em 0;
    text-align: center;
    border: 1px solid transparent;

    cursor: pointer;
    
    ${({ active }) => active && `
        background: #1ca6a6;
        color: #DADADA;
        border-color: #1ca6a6;
    `}
    
    ${({ active }) => !active && `
        color: #1ca6a6;
        background-color: transparent;
        border-color: #DADADA;
    `}
`;

export class RecordMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dashboard: true,
            fileExplorer: false,
        };
    }

    handleButton(option) {
        switch (option) {
            case 1:
                this.setState({
                    dashboard: true,
                    fileExplorer: false,
                });
                break;
            case 2:
                this.setState({
                    dashboard: false,
                    fileExplorer: true,
                });
                break;
            default:
                //TODO: throw some error
                break;
        }
    }

    render() {
        return (
            <FlexRow>
                <MenuButton active={this.state.dashboard}
                            onClick={this.handleButton.bind(this, 1)}>
                    Dashboard
                </MenuButton>
                <MenuButton active={this.state.fileExplorer}
                            onClick={this.handleButton.bind(this, 2)}>
                    File Explorer
                </MenuButton>
            </FlexRow>
        );
    }
}
