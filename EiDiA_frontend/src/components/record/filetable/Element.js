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
    
    display:flex;
    align-items:center;
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
                <Grid container item spacing={2}
                      style={{cursor: (this.state.elementData.fileType === fileTypes.FOLDER) && 'pointer'}}
                >
                    <Grid item xs={12} xl={4} sm={4} onClick={(e) => {
                        this.state.nameEdit ? {} : this.props.activeToggle()
                    }}>
                        <Name padding={this.state.padding}>
                            {/*<span style={{verticalAlign:"middle",display:"inline-block"}}>*/}
                            <ElementSymbol fileType={this.state.elementData.fileType}
                                           activeFolder={this.state.elementData.activeFolder}
                            />
                            &nbsp;&nbsp;{this.state.nameEdit ?
                            <TextField value={this.state.nameInput}
                                       onChange={(e) => {
                                           this.setState({nameInput: e.target.value})
                                       }}
                            /> :
                            this.state.elementData.name
                            /*</span>*/
                        }
                        </Name>
                    </Grid>
                    <Grid item xs={12} xl={1} sm={2}>
                        {this.state.elementData.createdOnDate.replace(/[T].*/, "")}
                    </Grid>
                    <Grid item xs={12} xl={1} sm={2}>
                        {this.state.elementData.lastModifiedOnDate.replace(/[T].*/, "")}
                    </Grid>
                    <Grid item xs={12} xl={4} sm={3}>
                        {this.state.elementData.comment}
                    </Grid>
                    <Grid item xs={12} xl={2} sm={1}>
                        <ElementActions
                            fileType={this.state.elementData.fileType}
                            handleEditName={this.handleEditName}
                            handleDeleteElement={this.props.handleDeleteElement}
                            handleAddFolder={this.props.handleAddFolder}
                            editName={this.props.editName}/>
                    </Grid>
                </Grid>}
            </div>
        );
        if (this.props.dragEnabled && !this.state.nameEdit) {
            return this.props.connectDragSource(toRender);
        } else {
            return toRender;
        }
    }
}

const drag = DragSource(DragTypes.ELEMENT, itemSource, collectDrag);
export default drag(Element);
