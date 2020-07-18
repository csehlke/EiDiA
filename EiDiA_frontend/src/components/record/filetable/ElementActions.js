import React from 'react';
import Grid from "@material-ui/core/Grid";
import {elementIconSize, fileTypes} from "../../../../../constants";
import {MdCloudDownload, MdCreateNewFolder, MdDelete, MdEdit} from "react-icons/md/index";
import IconButton from "@material-ui/core/IconButton";


/**
 * TODO:
 * - Button Link Coloring
 * - Remove Button border color when clicked and add Icon Color
 *- or remove whole button and make icon clickable
 */

export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    actionSelection() {
        let toReturn = ["", "", ""];

        toReturn[0] = (
            <IconButton style={{padding: "0"}} onClick={this.props.handleEditName} aria-label="Edit Element">
                <MdEdit size={elementIconSize}/>
            </IconButton>);


        toReturn[1] = (
            <IconButton style={{padding: "0"}} onClick={this.props.handleDeleteElement} aria-label="Delete Element">
                <MdDelete size={elementIconSize}/>
            </IconButton>);

        if (this.props.fileType === fileTypes.FOLDER) {
            toReturn[2] = (
                <IconButton style={{padding: "0"}} onClick={this.props.handleAddFolder} aria-label="Add Subfolder">
                    <MdCreateNewFolder size={elementIconSize}/>
                </IconButton>
            );
        } else {
            toReturn[2] = (
                <IconButton style={{padding: "0"}}  /*onClick={this.props.handleEditName}*/>
                    <MdCloudDownload size={elementIconSize}/>
                </IconButton>
            );
        }


        return toReturn;
    }

    render() {
        return (
            <Grid container spacing={1}>
                {this.actionSelection().map((button, index) =>
                    <Grid key={index} item xs={12} sm={4}>
                        {button}
                    </Grid>
                )}
            </Grid>

        );
    }
}
