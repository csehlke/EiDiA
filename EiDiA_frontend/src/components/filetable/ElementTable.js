import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import {DragTypes} from "../Constants";


const calTarget = {
    canDrop(props,monitor) {
        return true;
    },

    drop(props,monitor,component) {
        return {component}
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        test: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class ElementTable extends Component {
    if(test) {
        console.log("go")
    }

    render() {
        const { connectDropTarget,test } = this.props;
        return connectDropTarget(
            <div style={{
                backgroundColor : test ? '#eee' : ''
            }}>
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(DragTypes.ELEMENT, calTarget, collect)(ElementTable);