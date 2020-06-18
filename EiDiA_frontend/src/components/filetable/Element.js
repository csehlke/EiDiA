"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";
import {DragTypes} from "../Constants"
import {DragSource} from "react-dnd";
import {fileTypes} from "../Constants";

const ElementRow = styled.div`
    height:auto;
    margin: 1vh 0  1vh 0;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap
    

`;

const Name = styled.div`
    width: ${props => props.width + "%"}; 
    flex-direction: row;
    flex-wrap: no-wrap;
    padding-left: ${props => props.padding + "%"};
    
  
`;
const Date = styled.div`
    width: 7.5%;  
`;
const Comment = styled.div`
    width: 35%;  
`;
const Actions = styled.div`
    width: 15%;  
`;

const itemSource = {
    beginDrag(props) {
        const item = {src: props.src, id: props.index}
        return item
    },
    endDrag(props, monitor, component) {
        let wrapperProps =monitor.getDropResult().component.props
        if(wrapperProps.type==fileTypes.FOLDER)component.props.handleDrop(wrapperProps.id)
        //return component.props.handleDrop(component.props.index, monitor.getDropResult().component.props.id)
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

/*
 *TODO:
 * - make not draggable if type is Heading
 */
class Element extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            symbolArray: [],
            padding: this.props.level * 2,
            width: 40 - this.props.level * 2
        }

    }

    clickHandle(event) {
        this.props.activeToggle(this)
    }

    render() {
        const {isDragging, connectDragSource, src} = this.props

        const toRender = (
            <div>
                {!isDragging &&
                <div>
                    {/*
                    * Solution for not firing onClick event
                    * https://stackoverflow.com/questions/50805710/react-js-onclick-event-not-firing
                    * other solution is to change stylwe
                    * <div style = {{cursor:(element.type === 'FOLDER')&& 'pointer'}} onClick = {(element.type === 'FOLDER')?this.addChildren.bind(element.id,element):null}>
                     */}
                    <ElementRow style={{cursor: (this.props.type === 'FOLDER') && 'pointer'}}
                                onClick={this.clickHandle.bind(this)}>

                        <Name width={this.state.width} padding={this.state.padding}>
                            <ElementSymbol type={this.props.type} active={this.props.active}/>
                            {this.props.name}
                        </Name>

                        <Date>
                            {this.props.dateCreation}
                        </Date>
                        <Date>
                            {this.props.dateModification}
                        </Date>
                        <Comment>
                            {this.props.comment}

                        </Comment>
                        <Actions>
                            <ElementActions parentKey ={this.props.key} actions={this.props.actions}/>
                        </Actions>
                    </ElementRow>
                    {this.props.children}

                </div>
                }
            </div>

        )
        return this.props.connectDragSource(toRender)
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

