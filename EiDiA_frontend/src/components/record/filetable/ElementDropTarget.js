import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragTypes, fileTypes} from "../../../../../constants";

/**
 * specifies what should happen when a widget is dropped / wether something can be dropped
 */
const calTarget = {
    canDrop(props) {
            return props.type === fileTypes.FOLDER;
    },

    drop(props, monitor, component) {
        if (monitor.didDrop() || !monitor.canDrop()) return false;
        return {component};
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
        isOver: monitor.isOver(),
    };
}
/**
 * This Component specifies an area where Elements can be dropped and changes the color if something is dragged over
 * This class could theoretically be merged with Element
 */
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
