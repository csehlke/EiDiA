import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragTypes} from "../../../../../constants";


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
            //TODO: color
            <div style={{
                backgroundColor: isOver ? 'rgba(28, 166, 166,0.3)' : '',
                width: "100%", height: "100%"
            }}>
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(DragTypes.WIDGET, calTarget, collect)(WidgetDropTarget);