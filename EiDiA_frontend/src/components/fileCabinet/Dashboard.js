import React from 'react';
import {Widget} from "./Widgets/Widget";
import {Widgets, WidgetTypes} from "../Constants";
import {Grid3Cols2Rows} from "../StyleElements";
import {LogWidget} from "./Widgets/LogWidget";
import {GraphsWidget} from "./Widgets/GraphsWidget";
import {IndicatorWidget} from "./Widgets/IndicatorWidget";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: Widgets

        }
    }

    renderWidget(widget) {
        switch (widget.type) {
            case WidgetTypes.LOG:
                return (<LogWidget positionInfo={widget.positionInfo}/>)
            case WidgetTypes.GRAPH:
                return (<GraphsWidget positionInfo={widget.positionInfo}/>)
            case WidgetTypes.INDICATOR:
                return (<IndicatorWidget positionInfo={widget.positionInfo}/>)
            default:
                return (<Widget positionInfo={widget.positionInfo}/>)

        }
    }

    render() {
        return (
            <Grid3Cols2Rows>

                {this.state.widgets.map((widget) => this.renderWidget(widget))}

            </Grid3Cols2Rows>

        );
    }
}

