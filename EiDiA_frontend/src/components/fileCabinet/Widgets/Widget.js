import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";
import {IconContext} from "react-icons";

const Body = styled.div`
     width:30%;
     height: auto;
     font-size:3vw;
     

`;
/**
 * TODO:
 *
 */
const IconSize = '1.5vw'

export class Widget extends React.Component {
    constructor(props) {
        super(props);
    }



    MainPart(){
    let result = (
        <Body>
            {this.childPart()}
        </Body>



    )
        return result;

    }
    childPart(){
        return (<p>No Child Part</p>);
    }
    render() {
        return this.MainPart();
    }
}

