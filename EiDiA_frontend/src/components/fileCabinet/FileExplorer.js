import React from 'react';
import Element from '../filetable/Element'
import styled from "styled-components";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import ElementTable from "../filetable/ElementTable";
import {fileTypes} from "../Constants";

const ElementBoundary = styled.div`
    width:90%;
    height:auto;
    margin: 1vh 5vw  1vh 5vw;
   
    

`;
const databaseEntries = [
    {
        parentId: 0,
        id: 1,
        active: false,
        type: fileTypes.WORD,
        name: "Sample Word Document",
        dateCreation: '1.1.1970',
        dateModification: '1.1.2020',
        comment: 'This is a long long Lorem Ipsum Comment talking blablabla',
        actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
        children: []
    },

    {
        parentId: 0, id: 3, active: false,  type: fileTypes.FOLDER, name: "Sample Folder", dateCreation: '',
        dateModification: '', comment: 'TJust some Folder',
        actions: ['EDIT', 'DELETE'], children:
            [
                {
                    parentId: 3,
                    id: 2,
                    active: false,
                    type: fileTypes.PDF,
                    name: "Sample PDF Document",
                    dateCreation: '2.2.1970',
                    dateModification: '2.2.2020',
                    comment: 'Second Document Comment',
                    actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
                    children: []
                },
                {
                    parentId: 3,
                    id: 6,
                    active: false,
                    type: fileTypes.FOLDER,
                    name: "Sample Folder",
                    dateCreation: '',
                    dateModification: '',
                    comment: 'TJust some Folder',
                    actions: ['EDIT', 'DELETE'],
                    children:
                        [
                            {
                                parentId: 3,
                                id: 5,
                                active: false,
                                type: fileTypes.WORD,
                                name: "Sample Word Document",
                                dateCreation: '1.1.1970',
                                dateModification: '1.1.2020',
                                comment: 'This is a long long Lorem Ipsum Comment talking blablabla',
                                actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
                                children: []
                            }
                        ]
                },
                {
                    parentId: 3,
                    id: 4,
                    active: false,
                    type: fileTypes.PDF,
                    name: "Sample PDF Document",
                    dateCreation: '2.2.1970',
                    dateModification: '2.2.2020',
                    comment: 'Second Document Comment',
                    actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
                    children: []
                }
            ]
    }
];
export default class FileExplorer extends React.Component {

    constructor(props) {
        super(props);
        //TODO is this wanted? This unfolds all folder at the beginning
        databaseEntries.forEach(element => element.active = false)

        this.state = {
            elements: databaseEntries
        }
    }

    /*changeElements(oldIndex, newIndex) {
        console.log("change" + oldIndex + "to:" + newIndex)
        let array = this.state.elements;
        if (newIndex >= array.length) {

            var k = newIndex - array.length + 1;
            while (k--) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        this.setState({elements: array});
    }*/
    find(id){
        for(let i =0;i<this.state.elements.length;i++){
            let tmp = this.findElement(this.state.elements[i],id)
            if(tmp != null)return tmp
        }
        return null;
    }
    findElement(element,id){
        if(element.id==id) return element;
        for(let i=0;i<element.children.length;i++){
            let tmp = this.findElement(element.children[i],id)
            if(tmp!=null) return tmp
        }
        return null
    }
    removeFromParent(child){
        if(child.parentId==0){
            this.removeFromArray(this.state.elements,child)
        }
        else{
            let oldParent = this.find(child.parentId)
            this.removeFromArray(oldParent.children,child)
        }
    }
    removeFromArray(array,objectToRemove){
        for(let i=0;i<array.length;i++){
            if(array[i]==objectToRemove){
                array.splice(i,1)
            }
        }
    }
    setNewParent(child,newParentId){
        //TODO: this should actually be handled by the backend?
        this.find(newParentId).children.push(child);
        this.removeFromParent(child)
        child.parentId=newParentId;

        this.setState(this.state)
    }


    activeToggle(element) {
        element.active == true ? element.active = false : element.active = true
        this.setState(this.state)
    }

    renderElement(element, index,level) {
        return (
            <ElementTable type ={element.type} id={element.id}>
                <Element active={element.active} index={index} parentId={element.parentId}
                         id={element.id} level={level}
                         type={element.type} name={element.name} dateCreation={element.dateCreation}
                         dateModification={element.dateModification} comment={element.comment} actions={element.actions}
                         handleDrop={(newParentId)=>this.setNewParent(element,newParentId) /*(oldIndex, newIndex) => this.changeElements(oldIndex, newIndex)*/}
                         activeToggle={this.activeToggle.bind(this, element)}>

                    {element.active == true ? element.children.map((child, indexChild) => this.renderElement(child, "" + index + indexChild,level+1)) : null}

                </Element>
            </ElementTable>
        )
    }


    render() {
        console.log(this.state.elements)
        return (
            <div>
                <ElementBoundary>
                    <DndProvider backend={HTML5Backend}>
                        <Element level={0} type={fileTypes.NONE} name={'Name'} dateCreation={'Date'}
                                 dateModification={'Last Modified'} comment={'Comment'} actions={['HEADING']}/>
                        <hr/>

                        {this.state.elements.map((element, index) =>
                            this.renderElement(element, index,0)
                        )}
                    </DndProvider>

                </ElementBoundary>
               {/* <button onClick={this.changeElements.bind(this, 1, 0)}/>*/}

            </div>

        );
    }
}



