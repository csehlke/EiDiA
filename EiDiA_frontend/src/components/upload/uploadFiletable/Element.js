"use strict";

import React from 'react';
import styled from "styled-components";
import {DragSource} from "react-dnd";
import Grid from "@material-ui/core/Grid";
import {DragTypes} from "../../../../../constants";
import {IconContext} from "react-icons";
import {MdFolderOpen} from "react-icons/all";


const Name = styled.div`
    
    padding-left: ${props => props.padding + "%"}; //indentation of folder icon
`;


const itemSource = {
    beginDrag() { //needed for react-dnd
        return {};
    }
}

function collectDrag(connect) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: false,
    };
}

class Element extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            padding: this.props.level * 5,
            elementData: this.props.elementData,
        };
    }


    render() {
        return (
            <div>
                <Grid container spacing={2}
                      style={{cursor: 'pointer'}}
                      onClick={this.props.onFolderClicked}>
                    <Grid item xs={12} sm={12}>
                        <Name padding={this.state.padding}>
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <MdFolderOpen size={'1.5em'}/>
                            </IconContext.Provider>
                            &nbsp;&nbsp;{this.state.elementData.name}
                        </Name>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const drag = DragSource(DragTypes.ELEMENT, itemSource, collectDrag); //needed for react-dnd
export default drag(Element);
