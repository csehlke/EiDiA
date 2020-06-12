"use strict";

import React from 'react';

import styled from "styled-components";

//TODO: https://material-ui.com/components/tabs/
const FlexRow = styled.div`
    margin: 2vh 5% 2vh 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
    border: 1px solid transparent;
    border-radius: 3px;
    border-color:#DADADA;

`;
//TODO font family doesnot fit
const MenueButton = styled.a`
    width: 12.5vw;
    font-size: 2vw;
    padding: 1vw 0 1vw 0;
    text-align: center;
    border: 1px solid transparent;

    
    cursor: pointer;
    
    ${({ active }) => active && `
    background: #1ca6a6;
    color: #DADADA;
        border-color:#1ca6a6;

  `}
  ${({ active }) => !active && `
    color: #1ca6a6;
    background-color: transparent;
        border-color:#DADADA;

  `}
    

`;

export class RecordMenue extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            dashboard: true,
            fileExplorer: false
        }
    }

    handleButton( option) {
        switch (option){
            case 1: this.setState({ dashboard: true, fileExplorer: false });break;
            case 2: this.setState({ dashboard: false, fileExplorer: true });break;
            default:
                //TODO: throw some error
                break;

        }

    }

    render() {
        return (
            <FlexRow>
                <MenueButton active={this.state.dashboard} onClick={this.handleButton.bind(this,1)}>
                    Dashboard
                </MenueButton>
                <MenueButton active={this.state.fileExplorer} onClick={this.handleButton.bind(this,2)}>
                    File Explorer
                </MenueButton>
            </FlexRow>

        );
    }
}
