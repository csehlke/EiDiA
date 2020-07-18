"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";
import {DragTypes} from "../../../assets/Constants";
import {fileTypes} from "../../../../../constants";
import {DragSource} from "react-dnd";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
            elementData: this.props.elementData,
            nameEdit: false,
            nameInput: this.props.elementData.name
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                elementData: this.props.elementData,
                nameInput: this.props.elementData.name


            })
        }
    }

    handleEditName = (e) => {
        if (this.state.nameEdit) {
            this.props.editName(this.state.nameInput) //this should reset the state
            this.setState({nameEdit: false})
        } else {
            this.setState({nameEdit: !this.state.nameEdit})
        }
    }

    render() {
        const {isDragging} = this.props;

        const toRender = (
            <div>
                {!isDragging &&
                //TODO: cursor doesnt work yet
                <Grid container spacing={2}
                      style={{cursor: (this.state.elementData.type === fileTypes.FOLDER) && 'pointer'}}
                >
                    <Grid item xs={12} sm={4} onClick={(e) => {
                        this.state.nameEdit ? null : this.props.activeToggle()
                    }}>
                        <Name padding={this.state.padding}>
                            <ElementSymbol fileType={this.state.elementData.fileType}
                                           activeFolder={this.state.elementData.activeFolder}/>
                            &nbsp;&nbsp;{this.state.nameEdit ?
                            <TextField value={this.state.nameInput} onChange={(e) => {
                                this.setState({nameInput: e.target.value})
                            }}/> :
                            this.state.elementData.name
                        }
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
                        <ElementActions
                            fileType={this.state.elementData.fileType}
                            handleEditName={this.handleEditName}
                            handleDeleteElement={this.props.handleDeleteElement}
                            editName={this.props.editName}/>
                    </Grid>
                </Grid>}
            </div>
        );
        if (!this.props.dragEnabled||this.state.nameEdit) {
            return toRender;
        } else {
            return this.props.connectDragSource(toRender);
        }
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
