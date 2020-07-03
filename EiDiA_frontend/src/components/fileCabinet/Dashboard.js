import React from 'react';
import {Widget} from "./Widgets/Widget";
import {Widgets, WidgetTypes} from "../Constants";
import {DashboardWrapper} from "../StyleElements";
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
        switch (widget.Type) {
            case WidgetTypes.LOG:
                return (<LogWidget data={widget.Data}/>)
            case WidgetTypes.GRAPH:
                return (<GraphsWidget data={widget.Data}/>)
            case WidgetTypes.INDICATOR:
                return (<IndicatorWidget elementPercentage={25} positionInfo={widget.positionInfo} data={widget.Data}/>)
            default:
                return (<p>No child part</p>)

        }
    }

    render() {
        return (
            <DashboardWrapper>

                {this.state.widgets.map((widget, index) => <Widget key={index} title={widget.TITLE}
                                                                   positionInfo={widget.positionInfo}>{this.renderWidget(widget)}</Widget>)}

            </DashboardWrapper>

        );
    }
}

