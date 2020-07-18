"use strict";

import React from 'react';
import styled from "styled-components";
import {DragTypes} from "../../../assets/Constants"
import {DragSource} from "react-dnd";
import Grid from "@material-ui/core/Grid";
import {FaFolderOpen} from "react-icons/fa";


const Name = styled.div`
    
    padding-left: ${props => props.padding + "%"}; //indentation of folder icon
`;


const itemSource = {
    beginDrag() { //needed for react-dnd
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
            padding: this.props.level * 5,
            elementData: this.props.elementData,
        };
    }


    render() {
        return <div>
            <Grid container spacing={2}
                  style={{cursor: 'pointer'}}
                  onClick={this.props.onFolderClicked}>
                <Grid item xs={12} sm={12}>
                    <Name padding={this.state.padding}>
                        <FaFolderOpen color="#005E7C" size={'1.5em'}/>
                        &nbsp;&nbsp;{this.state.elementData.name}
                    </Name>
                </Grid>
            </Grid>
        </div>

    }
}

const drag = DragSource(DragTypes.ELEMENT, itemSource, collectDrag); //needed for react-dnd
export default drag(Element);
