import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";
import {IconContext} from "react-icons";
import {Widget} from "./Widget";

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
 *
 */
const IconSize = '1.5vw'

export class LogWidget extends Widget {
    constructor(props) {
        super(props);
    }

    childPart(){
        let result = ( "Log Widget"

        );
        return result;
    }


}

