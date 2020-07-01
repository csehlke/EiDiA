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

    renderWidget(widget, index) {
        switch (widget.Type) {
            case WidgetTypes.LOG:
                return (<LogWidget data={widget.Data}/>)
            case WidgetTypes.GRAPH:
                return (<GraphsWidget data={widget.Data}/>)
            case WidgetTypes.INDICATOR:
                return (<IndicatorWidget data={widget.Data}/>)
            default:
                return (<p>No child part</p>)
            /*  return (<Widget key={index} title={widget.TITLE} positionInfo={widget.positionInfo}/>)*/

        }
    }

    render() {
        return (
            <DashboardWrapper>

                {this.state.widgets.map((widget, index) => <Widget key={index} title={widget.TITLE}
                                                                   positionInfo={widget.positionInfo}>{this.renderWidget(widget, index)}</Widget>)}

            </DashboardWrapper>

        );
    }
}

