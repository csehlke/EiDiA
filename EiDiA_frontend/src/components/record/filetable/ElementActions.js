import React from 'react';
import Grid from "@material-ui/core/Grid";
import {fileTypes} from "../../../../../constants";
import {MdCloudDownload, MdCreateNewFolder, MdDelete, MdEdit} from "react-icons/md/index";
import IconButton from "@material-ui/core/IconButton";


const StyledIconButton = styled(IconButton)`
    font-size: 1em;
    padding: 3px;
`;

/**
 * TODO:
 * - Button Link Coloring
 * - Remove Button border color when clicked and add Icon Color
 *- or remove whole button and make icon clickable
 */
const IconSize = '1.5em';

export class ElementActions extends React.Component {
    constructor(props) {
        super(props);
    }

    actionSelection() {
        let toReturn = ["", "", ""];

        toReturn[0] = (
            <IconButton onClick={this.props.handleEditName} aria-label="Edit Element">
                <MdEdit size={IconSize}/>
            </IconButton>);


        toReturn[1] = (
            <IconButton onClick={this.props.handleDeleteElement} aria-label="Delete Element">
                <MdDelete size={IconSize}/>
            </IconButton>);

        if (this.props.fileType === fileTypes.FOLDER) {
            toReturn[2] = (
                <IconButton onClick={this.props.handleAddFolder} aria-label="Add Subfolder">
                    <MdCreateNewFolder size={IconSize}/>
                </IconButton>
            );
        } else {
            toReturn[2] = (
                <IconButton /*onClick={this.props.handleEditName}*/>
                    <MdCloudDownload size={IconSize}/>
                </IconButton>
            );
        }

        /*  if (actions.includes(fileActions.DOWNLOAD)) {
              toReturn[1] = (<FaCloudDownloadAlt size={IconSize}/>);
          }
          if (actions.includes(fileActions.DELETE)) {
              toReturn[2] = (<AiFillDelete size={IconSize}/>);
          }*/

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
