import React from 'react';
import Element from './filetable/Element'
import styled from "styled-components";
import ElementDropTarget from "./filetable/ElementDropTarget";
import {databaseEntriesPlaceholder} from "../../assets/Constants";
import {fileTypes} from "../../../../constants";
import Grid from "@material-ui/core/Grid";
import {IoMdAddCircleOutline} from "react-icons/all";
import IconButton from "@material-ui/core/IconButton";
import RecordService from "../../services/RecordService";


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
            elements: this.props.data,
        }
        this.state.elements.forEach(element => element['activeFolder'] = false);
    }

    setNewParent = (child) => (newParentId) => {
        let reqBody = {
            id: child.id,
            parentFolderId: newParentId
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
                            activeToggle={this.activeToggle(element)}>


                        </Element>
                    </ElementDropTarget>
                </Grid>
                ,
                element.activeFolder === true ?
                    [this.state.elements.map((child, indexChild) =>
                        child.parentFolderId === element.id ? this.renderElement(child, indexChild, level + 1) : null
                    ),
                        <Grid container key={index + "Folder"} sm={4} item xs={12} justify="center">
                            <IconButton onClick={this.handleAddFolder(element.id)} aria-label="Add">
                                <IoMdAddCircleOutline style={{textAlign: "center"}}/>
                            </IconButton>
                        </Grid>, <Grid item key={index + "block"} sm={8} xs={12}/>] : null,

            ]


        );
    }


    render() {
        console.log(this.state.elements)
        return (
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
                    <IconButton onClick={this.handleAddFolder(0)} aria-label="Add">
                        <IoMdAddCircleOutline style={{textAlign: "center"}}/>
                    </IconButton>
                </Grid>
                <ElementDropTarget id={0} type={fileTypes.FOLDER}>
                    {/*TODO:
                    - Drop area*/}
                </ElementDropTarget>
                {/*TODO: add FA Button for adding a folder*/}
            </Grid>
        );
    }
}
