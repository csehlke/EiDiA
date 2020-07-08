import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragTypes} from "../../../assets/Constants"


const calTarget = {
    canDrop() {
        return true;
    },

    drop(props, monitor, component) {
        if (monitor.didDrop()) return
        return {component}
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver()
    }
}

class WidgetDropTarget extends Component {
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

export default DropTarget(DragTypes.WIDGET, calTarget, collect)(WidgetDropTarget);