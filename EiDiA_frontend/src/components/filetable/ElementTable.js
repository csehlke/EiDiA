import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import {DragTypes} from "../Constants";


function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class ElementTable extends Component {
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div >
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(DragTypes.ELEMENT, {}, collect)(ElementTable);