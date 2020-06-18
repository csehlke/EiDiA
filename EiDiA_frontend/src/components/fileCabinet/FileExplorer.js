import React from 'react';
import Element from '../filetable/Element'
import styled from "styled-components";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ElementTable from "../filetable/ElementTable";
import {DragTypes} from "../Constants"
const Divider = styled.hr`
    margin: 0 5vw  0 5vw;
    
`;
const ElementBoundary = styled.div`
    width:90%;
    height:auto;
    margin: 1vh 5vw  1vh 5vw;
   
    

`;
const databaseEntries =[
    {parentId:0,id: 1,active:false,level:0,type:"WORD",name:"Sample Word Document", dateCreation :'1.1.1970',
        dateModification : '1.1.2020', comment : 'This is a long long Lorem Ipsum Comment talking blablabla',
        actions:['DOWNLOAD','EDIT','DELETE'],children:[]},

    {parentId:0,id:3,active:false,level:0,type:"FOLDER",name:"Sample Folder", dateCreation :'',
        dateModification : '', comment : 'TJust some Folder',
        actions:['EDIT','DELETE'],children:
            [
                {parentId:3,id:2,active:false,level:1,type:"PDF",name:"Sample PDF Document", dateCreation :'2.2.1970',
                dateModification : '2.2.2020', comment : 'Second Document Comment',
                actions:['DOWNLOAD','EDIT','DELETE'],children:[]},
                {parentId:3,id:6,active:false,level:1,type:"FOLDER",name:"Sample Folder", dateCreation :'',
                dateModification : '', comment : 'TJust some Folder',
                actions:['EDIT','DELETE'],children:
                        [
                            {parentId:3,id: 5,active:false,level:2,type:"WORD",name:"Sample Word Document", dateCreation :'1.1.1970',
                            dateModification : '1.1.2020', comment : 'This is a long long Lorem Ipsum Comment talking blablabla',
                            actions:['DOWNLOAD','EDIT','DELETE'],children:[]}
                        ]},
                {parentId:3,id:4,active:false,level:1,type:"PDF",name:"Sample PDF Document", dateCreation :'2.2.1970',
                dateModification : '2.2.2020', comment : 'Second Document Comment',
                actions:['DOWNLOAD','EDIT','DELETE'],children:[]}
            ]
    }
];
export default class FileExplorer extends React.Component {
    constructor(props) {
        super(props);
        //TODO is this wanted? This unfolds all folder at the beginning
        databaseEntries.forEach(element =>  element.active=false )

        this.state={
            elements: databaseEntries,
            //activeElements: databaseEntries.filter(element=>element.parentId ==0)

        }
    }

    changeElements(oldIndex,newIndex){
        console.log("change"+oldIndex+"to:"+newIndex)
        let array = this.state.elements;
        if (newIndex >= array.length) {

            var k = newIndex - array.length + 1;
            while (k--) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        this.setState({elements:array});
    }
    activateElements(id,index){
        let newActiveElements = this.state.activeElements
        //... is the spread operator allowing to add the elements of the array instead of the array
            newActiveElements.splice(index+1,0,...entriesToAdd)
        this.setState({elements: this.state.elements,activeElements:newActiveElements})

    }
    addChildren(id,element){
       /*let entriesToAdd=databaseEntries.filter(element=>element.parentId==id);

        element.props.children.push(entriesToAdd);*/
    }
    setActive(element){
        console.log("active")

       // element.children.forEach(child => child.active=true)
        element.active==true ? element.active=false:element.active=true
      //  this.state.activeElements[index].active=true;
        this.setState(this.state)
    }
    //<div style = {{cursor:(element.type === 'FOLDER')&& 'pointer'}} onClick = {(element.type === 'FOLDER')?this.activateElements.bind(this, element.id,index):((element.type === 'FOLDEROPEN')?this.deactivateElements.bind(this,element.id)}>
    renderElement(element,index){
        //if(!(element.active | element.parentId==0))return null;
        return(/*<div style = {{cursor:(element.type === 'FOLDER')&& 'pointer'}} onClick = {(element.type === 'FOLDER')?this.addChildren.bind(element.id,element):null}>*/

            <ElementTable index={index}>
                <Element active={element.active} index ={index} level ={element.level} type ={element.type} name = {element.name} dateCreation = {element.dateCreation}
                         dateModification = {element.dateModification} comment = {element.comment} actions={element.actions}
                         handleDrop={(oldIndex,newIndex)=>this.changeElements(oldIndex,newIndex)} setActive={this.setActive.bind(this,element)} >

                    {element.active==true ? element.children.map((child,indexChild)=> this.renderElement(child,""+index+indexChild)):null}


                </Element>
            </ElementTable>
     /*</div>*/



        )

    }
/*{this.state.activeElements.map((element,index) =>
<div style = {{cursor:(element.type === 'FOLDER')&& 'pointer'}} onClick = {(element.type === 'FOLDER')?this.addChildren.bind(element.id,element):null}>

<Element key ={index} type ={element.type} name = {element.name} dateCreation = {element.dateCreation}
dateModification = {element.dateModification} comment = {element.comment} actions={element.actions}
subElements ={element.children}
handleDrop={(oldIndex,newIndex)=>this.changeElements(oldIndex,newIndex)}/>
</div>
)}*/

render() {
    console.log(this.state.elements)
        return (
            <div>
                <ElementBoundary>
                    <DndProvider backend = {HTML5Backend}>
                        <Element level={0} type ={'HEADING'} name = {'Name'} dateCreation = {'Date'} dateModification = {'Last Modified'} comment = {'Comment'} actions={['HEADING']}/>
                        <hr/>



                        {this.state.elements.map((element,index) =>
                            this.renderElement(element,index)
                        )}
                    </DndProvider>

                </ElementBoundary>
                <button onClick={this.changeElements.bind(this,1,0)}/>

            </div>

        );
    }
}



