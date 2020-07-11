import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragTypes, fileTypes} from "../../assets/Constants";


const calTarget = {
    canDrop(props) {
        return props.type === fileTypes.FOLDER;
    },

    drop(props, monitor, component) {
        if (monitor.didDrop()) return
        return {component};
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
    };
}

class ElementDropTarget extends Component {
    render() {
        const {connectDropTarget, isOver} = this.props;
        return connectDropTarget(
            <div style={{
                backgroundColor: isOver ? 'darkgreen' : ''
            }}>
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(DragTypes.ELEMENT, calTarget, collect)(ElementDropTarget);
