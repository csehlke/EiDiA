"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";
import {DragTypes} from "../../../assets/Constants";
import {fileTypes} from "../../../../../constants";
import {DragSource} from "react-dnd";
import Grid from "@material-ui/core/Grid";


const Name = styled.div`
    
    padding-left: ${props => props.padding + "%"};
`;


const itemSource = {
    beginDrag() {
        return {};
    },
    endDrag(props, monitor, component) {
        if (!monitor.getDropResult()) return
        let wrapperProps = monitor.getDropResult().component.props;
        component.props.handleDrop(wrapperProps.id);

    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Element extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            symbolArray: [],
            padding: this.props.level * 5,
            width: 40 - this.props.level * 2,
            elementData: this.props.elementData
        };
    }


    render() {
        const {isDragging} = this.props;

        const toRender = (
            <div>
                {!isDragging &&
                //TODO: cursor doesnt work yet
                <Grid container spacing={2}
                      style={{cursor: (this.state.elementData.type === fileTypes.FOLDER) && 'pointer'}}
                      onClick={this.props.activeToggle}>
                    <Grid item xs={12} sm={4}>
                        <Name padding={this.state.padding}>
                            <ElementSymbol type={this.state.elementData.type}
                                           activeFolder={this.state.elementData.activeFolder}/>
                            &nbsp;&nbsp;{this.state.elementData.name}
                        </Name>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        {this.state.elementData.dateCreation}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        {this.state.elementData.dateModification}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {this.state.elementData.comment}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <ElementActions actions={this.state.elementData.actions}/>
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
