import React from 'react';
import {Element} from '../filetable/Element'
import styled from "styled-components";
const Divider = styled.hr`
    margin: 0 5vw  0 5vw;
    
`;
export class FileExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //TODO: expand elements by parentID
            elements:[
                {parentId:"",position:1,type:"WORD",name:"Sample Word Document", dateCreation :'1.1.1970',
                    dateModification : '1.1.2020', comment : 'This is a long long Lorem Ipsum Comment talking blablabla',
                    actions:['DOWNLOAD','EDIT','DELETE']},
                {parentId:"",position:2,type:"PDF",name:"Sample PDF Document", dateCreation :'2.2.1970',
                    dateModification : '2.2.2020', comment : 'Second Document Comment',
                    actions:['DOWNLOAD','EDIT','DELETE']},
                {parentId:"",position:3,type:"FOLDER",name:"Sample Folder", dateCreation :'',
                    dateModification : '', comment : 'TJust some Folder',
                    actions:['EDIT','DELETE']}
            ]

        }
    }
    render() {
        return (
            <div>
                <Element type ={'HEADING'} name = {'Name'} dateCreation = {'Date'} dateModification = {'Last Modified'} comment = {'Comment'} actions={['HEADING']}/>
                <Divider/>
                {this.state.elements.map(element =>
                    <Element type ={element.type} name = {element.name} dateCreation = {element.dateCreation}
                             dateModification = {element.dateModification} comment = {element.comment} actions={element.actions} />
                             )}
            </div>
        );
    }
}

