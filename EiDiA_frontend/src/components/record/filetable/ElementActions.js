import React from 'react';
import Grid from "@material-ui/core/Grid";
import {elementIconSize, fileTypes} from "../../../../../constants";
import {MdCloudDownload, MdCreateNewFolder, MdDelete, MdEdit} from "react-icons/md/index";
import IconButton from "@material-ui/core/IconButton";
import {IconContext} from "react-icons";


export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    actionSelection() {
        let toReturn = ["", "", ""];


        toReturn[0] = (
            <IconButton style={{padding: "0"}} onClick={this.props.handleEditName} aria-label="Edit Element">
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <MdEdit size={elementIconSize}/>
                </IconContext.Provider>
            </IconButton>);


        toReturn[1] = (
            <IconButton disabled={this.props.isNotAuthorized} style={{padding: "0"}}
                        onClick={this.props.handleDeleteElement} aria-label="Delete Element">
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <MdDelete size={elementIconSize}/>
                </IconContext.Provider>
            </IconButton>);
        if (this.props.fileType === fileTypes.FOLDER) {
            toReturn[2] = (
                <IconButton style={{padding: "0"}} onClick={this.props.handleAddFolder} aria-label="Add Subfolder">
                    <IconContext.Provider value={{className: 'react-icons'}}>
                        <MdCreateNewFolder size={elementIconSize}/>
                    </IconContext.Provider>
                </IconButton>);
        } else {
            toReturn[2] = (
                <IconButton style={{padding: "0"}}  /*onClick={this.props.handleEditName}*/>
                    <IconContext.Provider value={{className: 'react-icons'}}>
                        <MdCloudDownload size={elementIconSize}/>
                    </IconContext.Provider>
                </IconButton>
            );
        }
        if (this.props.withinSearchResults) {
            toReturn[0] = ""
            if (this.props.fileType === fileTypes.FOLDER) {
                toReturn[1] = ""
                toReturn[2] = ""
            }
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
