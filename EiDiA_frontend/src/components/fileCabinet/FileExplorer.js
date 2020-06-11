import React from 'react';
import {Element} from '../filetable/Element'
import styled from "styled-components";
const Divider = styled.hr`
    margin: 0 5vw  0 5vw;
    
`;
export class FileExplorer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Element type ={'HEADING'} name = {'Name'} dateCreation = {'Date'} dateModification = {'Last Modified'} comment = {'Comment'} actions={['HEADING']}/>
                <Divider/>
                <Element type = {'WORD'} name= {'Sample Word Document'} dateCreation = {'1.1.1970'} dateModification = {'1.1.2020'} comment = {'This is a long long Lorem Ipsum Comment talking blablabla'} actions={['DOWNLOAD','EDIT','DELETE']}/>
            </div>
        );
    }
}

