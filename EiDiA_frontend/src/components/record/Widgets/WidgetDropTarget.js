import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragTypes} from "../../../../../constants";

/**
 * specifies what should happen when a widget is dropped / wether something can be dropped
 */
const calTarget = {
    canDrop() {
        return true;
    },

    drop(props, monitor, component) {
        if (monitor.didDrop()) return
        return {component}
    },
};
/**
 * Sets properties that are accessible within the drop target
 * @param monitor this has several methods that tell what dragging is going on
 * e.g isOver() tells wether a dragging is currently happening and pointing to this drop target
 *

 */
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver()
    }
}

/**
 * This Component specifies an area where Widgets can be dropped and changes the color if something is dragged over
 * This class could theoretically be merged with Widget
 */
class WidgetDropTarget extends Component {
    render() {
        const {connectDropTarget, isOver} = this.props;
        return connectDropTarget(
            //TODO: color
            <div style={{
                backgroundColor: isOver ? 'rgba(0, 94, 124, 0.3)' : '',
                width: "100%", height: "100%"
            }}>
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(DragTypes.WIDGET, calTarget, collect)(WidgetDropTarget);