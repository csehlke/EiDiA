"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {DragTypes, fileTypes} from "../../../assets/Constants"
import {DragSource} from "react-dnd";
import Grid from "@material-ui/core/Grid";


const Name = styled.div`
    
    padding-left: ${props => props.padding + "%"};
`;


const itemSource = {
    beginDrag() {
        return {};
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: false,
    };
}

class Element extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            symbolArray: [],
            padding: this.props.level * 5,
            width: 40 - this.props.level * 2,
            elementData: this.props.elementData,
        };
    }


    render() {
        const {isDragging} = this.props;
        const toRender = (
            <div>
                {!isDragging &&
                //TODO: cursor doesnt work yet
                <Grid container spacing={2}
                      style={{cursor: (this.state.elementData.type === fileTypes.FOLDER) && 'pointer'}} //Set cursor style when folder
                      onClick={this.props.onFolderClicked}>
                    <Grid item xs={12} sm={4}>
                        <Name padding={this.state.padding}>
                            <ElementSymbol type={this.state.elementData.type}
                                           activeFolder={this.state.elementData.activeFolder}/>
                            &nbsp;&nbsp;{this.state.elementData.name}
                        </Name>
                    </Grid>
                </Grid>
                }
            </div>
        );
        return this.props.connectDragSource(toRender);
    }
}

/*
*TODO:
* - a cleaner Code would be to remove Elementtable and making Element Target & Source at the same time, however, this
* needs state handling. If choosen to do both in one, one has to write something like this
* const drop = DropTarget(DragTypes.ELEMENT, {}, collectDrop);
* const drag = DragSource(DragTypes.ELEMENT, itemSource, collectDrag);
* export default drop(drag(Element));
*/
const drag = DragSource(DragTypes.ELEMENT, itemSource, collectDrag);
export default drag(Element);
