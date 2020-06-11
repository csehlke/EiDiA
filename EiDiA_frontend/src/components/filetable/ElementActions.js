import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";
import { IconContext } from "react-icons";


const IconButton = styled.button`
    width: 2.5vw;  
    height: auto;
    margin: 0 0.5vw 0 0.5vw;
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
const IconSize = '1.5vw'
export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    findTerm (term,actions){
        if(actions.includes(term))return true;
        else return false;

    }
    actionSelection(actions){
        let toReturn =[];
        if( this.findTerm('EDIT',actions))toReturn.push(<IconButton><AiFillEdit size={IconSize}/></IconButton>);
        if( this.findTerm('DOWNLOAD',actions))toReturn.push(<IconButton>    <FaCloudDownloadAlt size={IconSize}/></IconButton>);
        if( this.findTerm('DELETE',actions))toReturn.push(<IconButton><AiFillDelete size={IconSize}/></IconButton>);
        if( this.findTerm('HEADING',actions))toReturn =['Actions'];
        if(toReturn == []) toReturn =[''];//TODO Throw Error

        return toReturn;
    }
    render() {
        return (
            this.actionSelection(this.props.actions).map((button)=>button)
        );
    }
}

