"use strict";

import React from 'react';
import styled from "styled-components";
import {recordMenuOptions} from "../../assets/Constants";

//TODO: https://material-ui.com/components/tabs/

const FlexRow = styled.div`
    margin: 1em 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

//TODO font family doesnot fit
const MenuButton = styled.a`
    width: 8em;
    font-size: 1.5em;
    padding: 0.5em 0;
    text-align: center;
    border: 1px solid transparent;

    cursor: pointer;
    
    ${({active}) => active && `
        background: #1ca6a6;
        color: #DADADA;
        border-color:#1ca6a6;
    `}
    
    ${({active}) => !active && `
        color: #1ca6a6;
        background-color: transparent;
        border-color:#DADADA;
    `}
`;

export class RecordMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeOption: recordMenuOptions.DASHBOARD,
        }
    }

    handleButton(option) {
        switch (option) {
            case 1:
                this.state.activeOption = recordMenuOptions.DASHBOARD;
                break;
            case 2:
                this.state.activeOption = recordMenuOptions.FILEEXPLORER;
                break;
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
                <MenuButton active={this.state.activeOption === recordMenuOptions.DASHBOARD}
                            onClick={this.handleButton.bind(this, 1)}>
                    Dashboard
                </MenuButton>
                <MenuButton active={this.state.activeOption === recordMenuOptions.FILEEXPLORER}
                            onClick={this.handleButton.bind(this, 2)}>
                    File Explorer
                </MenuButton>
            </FlexRow>
        );
    }
}
