import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {fileTypes} from "../../../../../constants";


const IconButton = styled.button`
    width: 2.5em;  
    height: auto;
    margin: 0 0.5em;
    border: none;
    background: transparent;
    cursor: pointer; 
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

        toReturn[0] = (<IconButton onClick={this.props.handleEditName}>
            <AiFillEdit size={IconSize}/>
        </IconButton>);


        toReturn[1] = (
            <IconButton onClick={this.props.deleteElement}>
                <AiFillDelete size={IconSize}/>
            </IconButton>);

        if (this.props.fileType !== fileTypes.FOLDER) {
            toReturn[2] = (<IconButton /*onClick={this.props.handleEditName}*/>
                <FaCloudDownloadAlt size={IconSize}/>
            </IconButton>);
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
