"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";
import {DragTypes} from "../Constants"
import {DragSource, DropTarget} from "react-dnd";
import {compose} from 'redux'

const ElementBoundary = styled.div`
    width:90%;
    height:auto;
    margin: 1vh 5vw  1vh 5vw;
   
    

`;
const ElementRow = styled.div`
    height:auto;
    margin: 1vh 0  1vh 0;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap
    

`;

const ChildRow = styled.div`
    
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
    
`;


const Symbol = styled.div`
    width: 10%;  

`;
const Name = styled.div`
    width: ${props=>props.width+"%"}; 
    flex-direction: row;
    flex-wrap: no-wrap;
    padding-left: ${props=>props.padding+"%"};
    
  
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
        const item = { src: props.src, id: props.index }
        return item
    },
    endDrag(props,monitor,component) {
        console.log(monitor.getDropResult().component.props.id)
        console.log(component)
        component.props.handleDrop(component.props.key,monitor.getDropResult().component.props.id )
        return component.props.handleDrop(component.props.index,monitor.getDropResult().component.props.id )
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

class Element extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            symbolArray: [],
            padding: this.props.level*2,
            width:  40-this.props.level*2
        }

    }
    clickHandle(event){
        console.log("clicked")
        this.props.setActive(this)
    }

    render() {
        const { isDragging, connectDragSource, src } = this.props

        const toRender =(
            <div >
                {!isDragging &&
                <div>

                    <ElementRow onClick={this.clickHandle.bind(this)}>
                        {/*<Symbol>
                                <ElementSymbol type={this.props.type}/>
                            </Symbol>*/}
                        <Name width={this.state.width} padding={this.state.padding} >
                            <ElementSymbol type={this.props.type}/>
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
                            <ElementActions actions={this.props.actions}/>
                        </Actions>
                    </ElementRow>
                    {this.props.children}

                </div>
                }
            </div>

        )
        return this.props.connectDragSource(toRender)
        // if(this.props.active)
        // else return this.props.connectDropTarget(toRender)








    }
}

// @DragSource(DragTypes.ELEMENT, itemSource, collect)
// @DropTarget(DragTypes.ELEMENT, {}, collect), ,DropTarget(DragTypes.ELEMENT, {}, collect)

// export default compose(, )(Element)
// export { RawElement }
//TODO clean this up and remove Drop,redux, collect function etc.
const drop =DropTarget(DragTypes.ELEMENT, {}, collectDrop) ;
const drag =DragSource(DragTypes.ELEMENT, itemSource, collectDrag);
export default drop(drag(Element));

