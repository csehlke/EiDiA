"use strict";

import React from 'react';

import styled from "styled-components";

//TODO: https://material-ui.com/components/tabs/
import {recordMenueOptions} from "../Constants";

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
            activeOption: recordMenueOptions.DASHBOARD,

        }
    }

    handleButton( option) {
        switch (option){
            case 1: this.state.activeOption = recordMenueOptions.DASHBOARD;break;
            case 2: this.state.activeOption = recordMenueOptions.FILEEXPLORER;break;
            default:
                //TODO: throw some error
                break;

        }

        this.props.handle(this.state.activeOption);
        this.setState(this.state);

    }

    render() {
        return (
            <FlexRow>
                <MenueButton active={this.state.activeOption==recordMenueOptions.DASHBOARD} onClick={this.handleButton.bind(this,1)}>
                    Dashboard
                </MenueButton>
                <MenueButton active={this.state.activeOption==recordMenueOptions.FILEEXPLORER} onClick={this.handleButton.bind(this,2)}>
                    File Explorer
                </MenueButton>
            </FlexRow>

        );
    }
}
