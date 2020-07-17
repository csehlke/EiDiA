import React from 'react';
import Widget from "./Widgets/Widget";
import WidgetDropTarget from "./Widgets/WidgetDropTarget";
import {LogEntries, Widgets, WidgetTypes} from "../../assets/Constants";
import {DashboardWrapper, WidgetWrapper} from "../StyleElements";
import {LogWidget} from "./Widgets/LogWidget";
import {GraphsWidget} from "./Widgets/GraphsWidget";
import {IndicatorWidget} from "./Widgets/IndicatorWidget";
import {FiEdit} from 'react-icons/fi'
import Fab from "@material-ui/core/Fab";
import {MdClose} from "react-icons/all";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: Widgets,
            dashboardEditingActive: false,
            recordId: this.props.recordId


        }

        this.fillUpFreeSlots();

    }

    renderConcreteWidget(widget) {
        switch (widget.type) {
            case WidgetTypes.LOG:
                return (<LogWidget logs={this.getLogData()}/>)
            case WidgetTypes.GRAPH:
                return (
                    <GraphsWidget graph={widget.graph} dashboardEditingActive={this.state.dashboardEditingActive}
                                  attributeMapping={widget.attributeMapping}
                    />)
            case WidgetTypes.INDICATOR:
                return (<IndicatorWidget attributeMapping={widget.attributeMapping}
                />)
            default:
                return (<p>No child part</p>)

        }
    }

    /**
     * This method assures that at each slot of the grid there is a Widget.
     *
     */
    fillUpFreeSlots() {
        let cells = [[0, 0, 0],
            [0, 0, 0]];
        this.state.widgets.forEach(function (widget) {
            cells[widget.positionInfo.y - 1][widget.positionInfo.x - 1] = 1
        })

        for (let i = 0; i < cells.length; i++)
            for (let j = 0; j < cells[i].length; j++)
                if (cells[i][j] === 0)
                    this.state.widgets.push({
                        positionInfo: {
                            x: j + 1,
                            y: i + 1,
                        },
                        title: "",
                        type: WidgetTypes.INDICATOR,
                        attributeMapping: []
                    })


    }

    getLogData = () => {
        return LogEntries.filter(entries => entries.recordId === this.state.recordId)
    }
    handleEditDashboardButton = () => {
        this.setState({dashboardEditingActive: !this.state.dashboardEditingActive})
    }


    handleUpdateWidgetButton = (widget) => (title, type, attributeMapping, graphType) => {
        widget.title = title;
        widget.type = type;
        widget.attributeMapping = attributeMapping;
        if (type === WidgetTypes.GRAPH) widget.graph = graphType;
        this.setState({widgets: this.state.widgets})
    }


    switchWidget = (positionA, positionB) => {
        let a = this.state.widgets.find(widget => widget.positionInfo === positionA)
        let b = this.state.widgets.find(widget => widget.positionInfo === positionB)
        a.positionInfo = positionB;
        b.positionInfo = positionA;
        this.setState({widgets: this.state.widgets})
    }

    render() {
        //taken from here https://stackoverflow.com/questions/35828991/make-material-ui-reactjs-floatingactionbutton-float
        //to let fab button float right
        const styleFabButton = {
            top: 'auto',
            bottom: '2em',
            right: '2em',
            left: 'auto',
            position: 'fixed',
        };
        return (
            <div>

                <DashboardWrapper>

                    {this.state.widgets.map((widget, index) =>
                        <WidgetWrapper key={index} dashboardEditingActive={this.state.dashboardEditingActive}
                                       positionInfo={widget.positionInfo}>
                            <WidgetDropTarget positionInfo={widget.positionInfo}>
                                <Widget
                                    handleUpdateWidgetButton={this.handleUpdateWidgetButton(widget)}
                                    dashboardEditingActive={this.state.dashboardEditingActive}
                                    widget={widget}
                                    switchWidget={this.switchWidget}
                                >
                                    {this.renderConcreteWidget(widget)}
                                </Widget>
                            </WidgetDropTarget>
                        </WidgetWrapper>)}

                </DashboardWrapper>
                <Fab style={styleFabButton} color="secondary" aria-label="edit"
                     onClick={this.handleEditDashboardButton}>
                    {this.state.dashboardEditingActive ?
                        <MdClose size={32}/> :
                        <FiEdit size={32}/>}
                </Fab>

            </div>


        );
    }
}
