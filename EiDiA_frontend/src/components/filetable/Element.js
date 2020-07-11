"use strict";

import React from 'react';
import styled from "styled-components";
import {ElementSymbol} from "./ElementSymbol";
import {ElementActions} from "./ElementActions";
import {DragTypes, fileTypes} from "../../assets/Constants"
import {DragSource} from "react-dnd";

const ElementRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap
`;

const Name = styled.div`
    width: ${props => props.width + "%"}; 
    flex-direction: row;
    flex-wrap: nowrap;
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
        return {
            src: props.src,
            id: props.index,
        };
    },
    endDrag(props, monitor, component) {
        let wrapperProps = monitor.getDropResult().component.props;
        if (wrapperProps.type === fileTypes.FOLDER) {
            component.props.handleDrop(wrapperProps.id);
        }
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
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
            width: 40 - this.props.level * 2,
        };
    }



    render() {
        const {isDragging} = this.props;

        const toRender = (
            <div>
                {!isDragging &&
                <div>
                    <ElementRow style={{cursor: (this.props.type === 'FOLDER') && 'pointer'}}
                                onClick={this.props.activeToggle}>

                        <Name width={this.state.width}
                              padding={this.state.padding}>
                            <ElementSymbol type={this.props.type}
                                           active={this.props.active}/>
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
                            <ElementActions parentKey={this.props.key}
                                            actions={this.props.actions}/>
                        </Actions>
                    </ElementRow>
                    {this.props.children}
                </div>
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
