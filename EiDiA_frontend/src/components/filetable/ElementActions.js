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
 *- or remove whole button and make icon clickable
 */
const IconSize = '1.5em';

export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    findTerm(term, actions) {
        return actions.includes(term);

    }

    actionSelection(actions) {
        let toReturn = [];
        if (actions.includes('EDIT')) {
            toReturn.push(<AiFillEdit size={IconSize}/>);
        }
        if (actions.includes('DOWNLOAD')) {
            toReturn.push(<FaCloudDownloadAlt size={IconSize}/>);
        }
        if (actions.includes('DELETE')) {
            toReturn.push(<AiFillDelete size={IconSize}/>);
        }
        if (actions.includes('HEADING')) {
            toReturn = ['Actions'];
        }
        if (toReturn === []) {
            //TODO Throw Error
            toReturn = [''];
        }
        return toReturn;
    }

    render() {
        return (
            //TODO remove button
            this.actionSelection(this.props.actions).map((button, index) =>
                <IconButton
                    key={index}>
                    {button}
                </IconButton>
            )
        );
    }
}
