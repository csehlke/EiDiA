import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragTypes, fileTypes} from "../../../../../constants";


const calTarget = {
    canDrop(props) {
            return props.type === fileTypes.FOLDER;
    },

    drop(props, monitor, component) {
        if (monitor.didDrop() || !monitor.canDrop()) return false;
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
        const {connectDropTarget, isOver, canDrop} = this.props;
        return connectDropTarget(
            <div style={{
                backgroundColor: (isOver && canDrop) ? 'rgba(0, 94, 124, 0.3)' : ''
            }}>
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(DragTypes.ELEMENT, calTarget, collect)(ElementDropTarget);
