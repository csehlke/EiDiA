import React from 'react';
import {Widget} from "./Widgets/Widget";
import {Widgets, WidgetTypes} from "../Constants";
import {ButtonCircle, DashboardWrapper} from "../StyleElements";
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
                    {/*<EditIcon />*/}
                    <FiEdit size={32}/>
                </Fab>
                <ButtonCircle>
                    <FiEdit size={48}/>

                </ButtonCircle>
            </div>


        );
    }
}

