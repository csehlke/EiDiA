import React from 'react';
import Widget from "./Widgets/Widget";
import WidgetDropTarget from "./Widgets/WidgetDropTarget";
import {Widgets, WidgetTypes} from "../../assets/Constants";
import {DashboardWrapper, WidgetWrapper} from "../StyleElements";
import {LogWidget} from "./Widgets/LogWidget";
import {GraphsWidget} from "./Widgets/GraphsWidget";
import {IndicatorWidget} from "./Widgets/IndicatorWidget";
import {FiEdit} from 'react-icons/fi'
import Fab from "@material-ui/core/Fab";

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
        switch (widget.type) {
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
                        type: WidgetTypes.INDICATOR,
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
    changeData(widget, toChange, event, value) {
        console.log(widget)
        console.log(toChange)
        console.log(event.target.value)
        switch (toChange) {
            case "title":
                widget.title = event.target.value;
                break;
            case "type":
                widget.type = value.type;//event.target.value.type;
                break;
            case "attributeMapping":
                widget.attributeMapping = event.target.value;
                break;

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

                    <DashboardWrapper>

                        {this.state.widgets.map((widget, index) =>
                            <WidgetWrapper key={index} edit={this.state.edit} positionInfo={widget.positionInfo}>
                                <WidgetDropTarget positionInfo={widget.positionInfo}>
                                    <Widget changeData={this.changeData.bind(this, widget)}
                                            edit={this.state.edit}
                                            title={widget.title} type={widget.type}
                                            switchWidget={(posA, posB) => this.switchWidget(posA, posB)}
                                            positionInfo={widget.positionInfo}>{this.renderWidget(widget)}</Widget>
                                </WidgetDropTarget>
                            </WidgetWrapper>)}

                    </DashboardWrapper>
                <Fab color="secondary" aria-label="edit" onClick={this.handleEditDashboardButton.bind(this)}>
                    <FiEdit size={32}/>
                </Fab>

            </div>


        );
    }
}

