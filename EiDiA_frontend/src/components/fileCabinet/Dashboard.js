import React from 'react';
import Widget from "./Widgets/Widget";
import WidgetDropTarget from "./Widgets/WidgetDropTarget";
import {Widgets, WidgetTypes} from "../Constants";
import {DashboardWrapper, WidgetWrapper} from "../StyleElements";
import {LogWidget} from "./Widgets/LogWidget";
import {GraphsWidget} from "./Widgets/GraphsWidget";
import {IndicatorWidget} from "./Widgets/IndicatorWidget";
import {FiEdit} from 'react-icons/fi'
import Fab from "@material-ui/core/Fab";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: Widgets,
            edit: false,


        }
        this.cells = [[0, 0, 0],
            [0, 0, 0]];
        this.fillUpFreeSlots(this.cells);

    }

    renderWidget(widget) {
        switch (widget.Type) {
            case WidgetTypes.LOG:
                return (<LogWidget data={widget.Data}/>)
            case WidgetTypes.GRAPH:
                return (<GraphsWidget edit={this.state.edit} attributeMapping={widget.attributeMapping}
                                      data={widget.Data}/>)
            case WidgetTypes.INDICATOR:
                return (<IndicatorWidget attributeMapping={widget.attributeMapping} elementPercentage={25}
                                         positionInfo={widget.positionInfo} data={widget.Data}/>)
            default:
                return (<p>No child part</p>)

        }
    }

    /**
     * This method assures that at each slot of the grid there is a Widget.
     *
     */
    fillUpFreeSlots(cells) {

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
                        TITLE: "",
                        Type: WidgetTypes.INDICATOR,
                        attributeMapping: []
                    })


    }

    handleEditDashboardButton() {
        this.setState({edit: !this.state.edit})
    }

    /*testCellOccupation(positionInfo,cells){
        for (let i = 0; i < cells.length; i++)
            for (let j = 0; j < cells[i].length; j++)
                if (cells[i][j] === 1) console.log(true);//return true;

        return false;
    }*/
    changeData(widget, toChange, event) {

        switch (toChange) {
            case "title":
                widget.title = event.target.value;
                break;
            case "type":
                widget.type = event.target.value;
                break;
            case "attributeMapping":
                widget.attributeMapping = event.target.value;
                break;
            case "x":
                widget.positionInfo.x = event.target.value;
                if (this.testCellOccupation(widget.positionInfo, this.cells)) return false;
                break;
            case "y":
                widget.positionInfo.y = event.target.value;
                if (this.testCellOccupation(widget.positionInfo, this.cells)) return false;

                break;
            case "rows":
                widget.positionInfo.rows = event.target.value;
                if (this.testCellOccupation(widget.positionInfo, this.cells)) return false;

                break;
            case "cols":
                widget.positionInfo.cols = event.target.value;
                if (this.testCellOccupation(widget.positionInfo, this.cells)) return false;

                break
            default:
                break;

        }

        this.setState({widgets: this.state.widgets})
    }

    switchWidget(positionA, positionB) {
        let a = this.state.widgets.find(widget => widget.positionInfo === positionA)
        let b = this.state.widgets.find(widget => widget.positionInfo === positionB)
        a.positionInfo = positionB;
        b.positionInfo = positionA;

        this.setState({widgets: this.state.widgets})
    }

    render() {
        return (
            <div>
                <DndProvider backend={HTML5Backend}>

                    <DashboardWrapper>

                        {this.state.widgets.map((widget, index) =>
                            <WidgetWrapper key={index} edit={this.state.edit} positionInfo={widget.positionInfo}>
                                <WidgetDropTarget positionInfo={widget.positionInfo}>
                                    <Widget changeData={this.changeData.bind(this, widget)}
                                            edit={this.state.edit}
                                            title={widget.title} type={widget.Type}
                                            switchWidget={(posA, posB) => this.switchWidget(posA, posB)}
                                            positionInfo={widget.positionInfo}>{this.renderWidget(widget)}</Widget>
                                </WidgetDropTarget>
                            </WidgetWrapper>)}

                    </DashboardWrapper>
                </DndProvider>
                <Fab color="secondary" aria-label="edit" onClick={this.handleEditDashboardButton.bind(this)}>
                    <FiEdit size={32}/>
                </Fab>

            </div>


        );
    }
}

