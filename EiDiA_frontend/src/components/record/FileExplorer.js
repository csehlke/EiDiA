import React from 'react';
import Element from './filetable/Element'
import styled from "styled-components";
import ElementDropTarget from "./filetable/ElementDropTarget";
import {databaseEntriesPlaceholder} from "../../assets/Constants";
import {fileTypes} from "../../../../constants";
import Grid from "@material-ui/core/Grid";


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
            elements: databaseEntriesPlaceholder,
        }
    }

    setNewParent = (child) => (newParentId) => {
        child.parentId = newParentId;

        this.setState(this.state);
    }
    activeToggle = (element) => () => {
        element.activeFolder = !element.activeFolder;

        this.setState(this.state);
    }

    renderElement(element, index, level) {
        return ([
                <Grid key={index} item xs={12}>
                    <ElementDropTarget
                        type={element.type}
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
                    this.state.elements.map((child, indexChild) =>
                        child.parentId === element.id ? this.renderElement(child, indexChild, level + 1) : null
                    ) : null
            ]


        );
    }


    render() {
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
                {this.state.elements.map((element, index) => element.parentId === 0 ?
                    this.renderElement(element, index, 0) : null
                )}
                <ElementDropTarget id={0} type={fileTypes.FOLDER}>
                    {/*TODO:
                    - Drop area*/}
                </ElementDropTarget>
                {/*TODO: add FA Button for adding a folder*/}
            </Grid>
        );
    }
}
