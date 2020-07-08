import React from 'react';
import {Centering, FoggyDiv, H2WithOutMargin} from "../../StyleElements";
import {FiEdit2} from "react-icons/fi";
import Fab from "@material-ui/core/Fab";
import {DragTypes} from "../../../assets/Constants";
import {EditDialog} from "./EditDialog";
import {DragSource} from "react-dnd";
/**
 * TODO:
 *
 */

/*
 *Reason for no use of inheritance as specified in Data model, instead composition is used
 * https://reactjs.org/docs/composition-vs-inheritance.html#so-what-about-inheritance
 */


const itemSource = {
    canDrag(props) {
        return props.edit;
    },
    beginDrag(props) {
        return {positionInfo: props.positionInfo, switchWidget: props.switchWidget}

    },
    endDrag(props, monitor) {
        if (monitor.getDropResult() == null) return;
        let wrapperProps = monitor.getDropResult().component.props
        let draggedItem = monitor.getItem()

        draggedItem.switchWidget(wrapperProps.positionInfo, draggedItem.positionInfo)
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionInfo: this.props.positionInfo,
            editingActive: false
        }

    }

    toggleEditDialog() {
        this.setState({editingActive: !this.state.editingActive})

    }

    MainPart() {
        const {isDragging} = this.props

        return (
            <div>

                {!isDragging &&
                <div>
                    {this.props.edit ?
                        <Centering>
                            <Fab onClick={this.toggleEditDialog.bind(this)} aria-label="edit">
                                <FiEdit2 size={32}/>
                            </Fab>
                        </Centering>
                        : ""}

                    <FoggyDiv edit={this.props.edit}>
                        <H2WithOutMargin> {this.props.title} </H2WithOutMargin>
                        {this.props.children}
                    </FoggyDiv>
                    <EditDialog changeData={this.props.changeData}
                                widgetTitle={this.props.title}
                                widgetType={this.props.type}
                                positionInfo={this.props.positionInfo}
                                onClose={this.toggleEditDialog.bind(this)}
                                open={this.state.editingActive}/>
                </div>

                }
            </div>


        )

    }

    childPart() {
        return (<p>No Child Part</p>);
    }

    render() {
        return this.props.connectDragSource(this.MainPart());
    }
}

export default DragSource(DragTypes.WIDGET, itemSource, collectDrag)(Widget);

