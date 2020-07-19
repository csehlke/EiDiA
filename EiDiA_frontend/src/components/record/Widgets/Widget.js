import React from 'react';
import {Centering, FoggyDiv, H2WithOutMargin} from "../../StyleElements";
import {FiEdit2} from "react-icons/fi";
import Fab from "@material-ui/core/Fab";
import {EditDialog} from "./EditDialog";
import {DragSource} from "react-dnd";
import {DragTypes} from "../../../../../constants";


/*
 *Reason for no use of inheritance as specified in Data model, instead composition is used
 * https://reactjs.org/docs/composition-vs-inheritance.html#so-what-about-inheritance
 */


const itemSource = {
    canDrag(props) {
        return props.dashboardEditingActive;
    },
    beginDrag(props) {
        return {positionInfo: props.widget.positionInfo, switchWidget: props.switchWidget}

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
            widget: this.props.widget,
            widgetEditingActive: false,
            dashboardEditingActive: this.props.dashboardEditingActive,
            editingActive: false,
            attributeValues: this.props.attributeValues,
            attributeTypes: this.props.attributeTypes
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                widget: this.props.widget,
                dashboardEditingActive: this.props.dashboardEditingActive,
                attributeValues: this.props.attributeValues,
                attributeTypes: this.props.attributeTypes


            })
        }
    }

    toggleEditDialog = () => {
        this.setState({widgetEditingActive: !this.state.widgetEditingActive})

    }

    renderMainPart() {
        const {isDragging} = this.props
        return (
            <div>

                {!isDragging &&
                <div>
                    {this.state.dashboardEditingActive ?
                        <Centering>
                            <Fab onClick={this.toggleEditDialog} aria-label="edit">
                                <FiEdit2 size={32}/>
                            </Fab>
                        </Centering>
                        : ""}

                    <FoggyDiv edit={this.state.dashboardEditingActive}>
                        <H2WithOutMargin> {this.state.widget.title} </H2WithOutMargin>
                        {this.props.children}
                    </FoggyDiv>
                    <EditDialog
                        docTypes={this.props.docTypes}
                        attributeTypes={this.state.attributeTypes}
                        attributeValues={this.state.attributeValues}
                        handleUpdateWidgetButton={this.props.handleUpdateWidgetButton}
                        widgetTitle={this.state.widget.title}
                        widgetType={this.state.widget.widgetType}
                        graphType={this.state.widget.graphType}
                        onClose={this.toggleEditDialog}
                        open={this.state.widgetEditingActive}
                        attributeMapping={this.state.widget.attributeMapping}/>
                </div>

                }
            </div>


        )

    }


    render() {
        return this.props.connectDragSource(this.renderMainPart());
    }
}

export default DragSource(DragTypes.WIDGET, itemSource, collectDrag)(Widget);
