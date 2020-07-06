import React from 'react';
import {Widget} from "./Widgets/Widget";
import {Widgets, WidgetTypes} from "../Constants";
import {DashboardWrapper} from "../StyleElements";
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
            edit: false

        }
        this.fillUpFreeSlots();
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
    fillUpFreeSlots() {
        let rows = [[0, 0, 0],
            [0, 0, 0]]
        this.state.widgets.forEach(function (widget) {
            for (let x = widget.positionInfo.x; x < widget.positionInfo.cols + widget.positionInfo.x; x++) {
                for (let y = widget.positionInfo.y; y < widget.positionInfo.rows + widget.positionInfo.y; y++) {
                    rows[y - 1][x - 1] = 1;
                }

            }
        })
        for (let i = 0; i < rows.length; i++)
            for (let j = 0; j < rows[i].length; j++)
                if (rows[i][j] === 0)
                    this.state.widgets.push({
                        positionInfo: {
                            x: j + 1,
                            y: i + 1,
                            rows: 1,
                            cols: 1,
                        },
                        TITLE: "",
                        Type: WidgetTypes.INDICATOR,
                        attributeMapping: []
                    })


    }

    handleEditButton() {
        this.setState({edit: !this.state.edit})
    }

    render() {
        return (
            <div>
                <DashboardWrapper>

                    {this.state.widgets.map((widget, index) => <Widget key={index} edit={this.state.edit}
                                                                       title={widget.TITLE}
                                                                       positionInfo={widget.positionInfo}>{this.renderWidget(widget)}</Widget>)}

                </DashboardWrapper>
                <Fab color="secondary" aria-label="edit" onClick={this.handleEditButton.bind(this)}>
                    <FiEdit size={32}/>
                </Fab>

            </div>


        );
    }
}

