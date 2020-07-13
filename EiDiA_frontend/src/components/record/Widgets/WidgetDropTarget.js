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
            //TODO: cursor should be fine however it is different in chrome from firefox & a forbiddon cursor would be nice if no drag desired
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