import React from 'react';
import Element from './filetable/Element'
import styled from "styled-components";
import ElementDropTarget from "./filetable/ElementDropTarget";
import {databaseEntriesPlaceholder} from "../../assets/Constants";
import {fileTypes, styleFabButton} from "../../../../constants";
import Grid from "@material-ui/core/Grid";
import RecordService from "../../services/RecordService";
import Fab from "@material-ui/core/Fab";
import {MdCreateNewFolder} from "react-icons/md/index";

const Center = styled.div`
   text-align:center;
`;

/**
 * TODO:
 * - Cant drag files to toplevel at the moment
 * - Design DnD operations
 */
export default class FileExplorer extends React.Component {

    constructor(props) {
        super(props);
        databaseEntriesPlaceholder.forEach(element => element.activeFolder = false);
        this.state = {
            elements: this.props.elements ? this.props.elements : databaseEntriesPlaceholder,//this.props.data
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                elements: this.props.elements,
            })
        }
        // this.state.elements.forEach(element => element['activeFolder'] = false);
    }

    //TODO during drag and drop check if element was pushed into child element
    /*testIfNewParentIsActuallyAChild(newId,parent){
        let childDetected=false
        let child=this.state.elements.find(elem=>elem.parentFolderId===parent.id)
        for(int )
            if(child.id===newId) return true;
            return this.testIfNewParentIsActuallyAChild(newId,child)
        }
        child.map(childchild=>{
            if(childchild.id==newId) {
                childDetected = true
                return;
            }
            childDetected= this.testIfNewParentIsActuallyAChild(newId,childchild)
        })
    }*/
    setNewParent = (child) => (newParentId) => {

        // if(this.testIfNewParentIsActuallyAChild(newParentId,child))return;
        let reqBody = {
            id: child.id,
            parentFolderId: newParentId + ""
        }
        RecordService.updateParentFolderId(reqBody).then(resp => {
                console.log(resp)
                child.parentFolderId = resp;
                this.setState(this.state);

            }
        ).catch((e) => {
                console.log(e)
                //TODO snackbar
            }
        )

    }
    activeToggle = (element) => () => {
        element.activeFolder = !element.activeFolder;

        this.setState(this.state);
    }
    handleAddFolder = (parentFolderId) => (e) => {
        let requestData = {
            name: "New Folder",
            parentFolderId: ("" + parentFolderId),
            recordId: this.props.recordId,
        }
        RecordService.addFolder(requestData)
            .then(
                resp => {
                    this.state.elements.push(resp);
                    this.setState({elements: this.state.elements})
                }
            )
            .catch(
                //TODO open snackbar error
                (e) => console.log(e))
    }
    editName = (element) => (name) => {
        let reqBody = {
            id: element.id,
            name: name
        }
        RecordService.updateName(reqBody).then(resp => {
                element.name = resp;
                this.setState(this.state);

            }
        ).catch((e) => {
                console.log(e)
                //TODO snackbar
            }
        )
    }
    handleDeleteElement = (element) => (e) => {
        //TODO if parent Element deleted, also delete all child elements
        //TODO make pop up if u really want to delete
        RecordService.deleteDocument(element.id).then(result => {
                console.log("Ok:" + result.ok)
                if (result.ok) this.state.elements.splice(this.state.elements.findIndex(elem => elem.id === element.id), 1);
                this.setState(this.state)
            }
        ).catch((e) => {
            //TODO snabkbar
            console.log(e)
        })
    }

    renderElement(element, index, level) {
        return ([
                <Grid key={index} item xs={12}>
                    <ElementDropTarget
                        type={element.fileType}
                        id={element.id}
                    >
                        <Element
                            level={level}
                            elementData={element}
                            handleDrop={this.setNewParent(element)}
                            editName={this.editName(element)}
                            handleDeleteElement={this.handleDeleteElement(element)}
                            activeToggle={this.activeToggle(element)}
                            handleAddFolder={this.handleAddFolder(element.id)}
                            dragEnabled={this.props.dragEnabled}
                        >


                        </Element>
                    </ElementDropTarget>
                </Grid>,
                element.activeFolder === true ?

                    this.state.elements.map((child, indexChild) =>
                        child.parentFolderId === element.id ?
                            this.renderElement(child, indexChild, level + 1)
                            : null
                    ) : null,

            ]
        );
    }

    render() {

        return (
            <div>
                <Grid style={{flexGrow: 1}} container spacing={0}>
                    <Grid item xs={12} sm={4}>
                        Name
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        Created
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        Last Modified
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        Comment
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Center>Actions</Center>
                    </Grid>

                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                    {this.state.elements.map((element, index) => element.parentFolderId === 0 ?
                        this.renderElement(element, index, 0) : null
                    )}
                    <Grid container item xs={12} justify="center">

                        <ElementDropTarget id={0} type={fileTypes.FOLDER}>
                            <div style={{width: "80vw", height: "10vh", display: "block"}}/>
                        </ElementDropTarget>
                    </Grid>
                </Grid>
                {this.props.dragEnabled ?
                    <Fab style={styleFabButton} color="secondary" aria-label="edit"
                         onClick={this.handleAddFolder(0)}>
                        <MdCreateNewFolder size={32}/>
                    </Fab>
                    : null}
            </div>

        );
    }
}
