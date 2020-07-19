import React from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {FaCloudDownloadAlt} from 'react-icons/fa'
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {fileActions} from '../../../../../constants';
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

    actionSelection(actions) {
        let toReturn = [];
        if (actions.includes(fileActions.EDIT)) {
            //TODO: different icon here maybe?
            toReturn[0] = <AiFillEdit size={IconSize}/>;
        }
        if (actions.includes(fileActions.DOWNLOAD)) {
            toReturn[1] = (<FaCloudDownloadAlt size={IconSize}/>);
        }
        if (actions.includes(fileActions.DELETE)) {
            toReturn[2] = (<AiFillDelete size={IconSize}/>);
        }

        return toReturn;
    }

    render() {
        return (
            <Grid container spacing={1}>
                {this.actionSelection(this.props.actions).map((button, index) =>
                    <Grid key={index} item xs={12} sm={4}>
                        <StyledIconButton>
                            {button}
                        </StyledIconButton>
                    </Grid>
                )}
            </Grid>

        );
    }
}
