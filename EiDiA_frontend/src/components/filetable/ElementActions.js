import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";


const IconButton = styled.button`
    width: 2.5em;
    height: auto;
    margin: 0 0.5em;
    border: none;
    background: transparent;
    cursor: pointer;
`;

/**
 * TODO:
 * - Button Link Coloring
 * - Remove Button border color when clicked and add Icon Color
 *
 */
const IconSize = '1.5em';

export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    actionSelection(actions){
        let toReturn = [];
        if (actions.includes('EDIT')) {
            toReturn.push(
                <IconButton key={'EDIT'}>
                    <AiFillEdit size={IconSize}/>
                </IconButton>);
        }
        if (actions.includes('DOWNLOAD')) {
            toReturn.push(
                <IconButton key={'DOWNLOAD'}>
                    <FaCloudDownloadAlt size={IconSize}/>
                </IconButton>);
        }
        if (actions.includes('DELETE')) {
            toReturn.push(
                <IconButton key={'DELETE'}>
                    <AiFillDelete size={IconSize}/>
                </IconButton>);
        }
        if (actions.includes('HEADING')) {
            toReturn = ['Actions'];
        }
        if (toReturn === []) {
            toReturn = [''];
            //TODO Throw Error
        }
        return toReturn;
    }

    render() {
        return (
            this.actionSelection(this.props.actions).map((button) => button)
        );
    }
}
