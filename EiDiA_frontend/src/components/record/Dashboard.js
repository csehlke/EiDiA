import React from 'react';
import Widget from "./Widgets/Widget";
import WidgetDropTarget from "./Widgets/WidgetDropTarget";
import {DashboardWrapper, WidgetWrapper} from "../StyleElements";
import {LogWidget} from "./Widgets/LogWidget";
import {GraphsWidget} from "./Widgets/GraphsWidget";
import {IndicatorWidget} from "./Widgets/IndicatorWidget";
import {FiEdit} from 'react-icons/fi'
import Fab from "@material-ui/core/Fab";
import RecordService from "../../services/RecordService";
import {MdClose} from "react-icons/all";
import {styleFabButton, WidgetTypes} from "../../../../constants";
import {ServerSideErrorSnackBar} from "../ServerSideErrorSnackBar";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            dashboardEditingActive: false,
            docTypes: [],
            attributeTypes: [],
            attributeValues: [],
            logs: [],
            isServerError: false,
        }
        this.fillUpFreeSlots();

    }

    /**
     * Once Dashboard has Mounted it pulls the following from the Backend
     * -  Widgets stored with this recordId
     * - DocTypes used at this recordId
     * - AttributeTypes used at this recordId
     * - All Attributes (Values) used at this recordId
     * - the Logs for this recordId
     *
     */
    componentDidMount() {
        this.getWidgetsFromBackend()
        this.getDocTypes()
        this.getAttributeTypes()
        this.getAttributeValues()
        this.getLogs()
    }

    /**
     * Depending on the widgetType different Widget Components are rendered
     * and provided with the necessary data via props
     * @param widget the widget object from the database that is to be rendered
     * @returns {*}
     */
    renderConcreteWidget(widget) {

        switch (widget.widgetType) {
            case WidgetTypes.LOG:
                return (<LogWidget logs={this.getLogData()}/>)
            case WidgetTypes.GRAPH:
                return (
                    <GraphsWidget graphType={widget.graphType}
                                  dashboardEditingActive={this.state.dashboardEditingActive}
                                  attributeMapping={widget.attributeMapping}
                                  attributeValues={this.state.attributeValues}
                    />)
            case WidgetTypes.INDICATOR:
                return (<IndicatorWidget attributeValues={this.state.attributeValues}
                                         attributeMapping={widget.attributeMapping}
                />)
            default:
                return (<p>No WidgetType selected</p>)

        }
    }

    /**
     * This method assures that at each slot of the Dashboard grid there is a Widget.
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
                        widgetType: WidgetTypes.INDICATOR,
                        attributeMapping: []
                    })


    }

    getLogData = () => {
        return this.state.logs
    }
    handleEditDashboardButton = () => {
        this.setState({dashboardEditingActive: !this.state.dashboardEditingActive})
    }

    /**
     * Pulls the widgets stored for the recordID,
     * as |widgets| <= slots in dashboard grid, fillUpFreeSlots (after succesfull request) is called to provide empty
     * dummy widgets. These can be edited and then stored to the backend
     */
    getWidgetsFromBackend() {

        RecordService.getWidgets(this.props.recordId).then(response => {
            this.getLogs()
            this.setState({widgets: response});
            this.fillUpFreeSlots();

        }).catch((e) => {
            this.setState({isServerError: true})
        })
    }

    getDocTypes = () => {
        RecordService.getDocTypes(this.props.recordId).then(response => this.setState({docTypes: response.documents}))
            .catch((e) => this.setState({isServerError: true}))
    }
    getAttributeTypes = () => {
        RecordService.getAttributeTypes(this.props.recordId).then(response => {
            this.setState({attributeTypes: response})
        }).catch((e) => this.setState({isServerError: true}))

    }
    getAttributeValues = () => {
        RecordService.getAttributeValues(this.props.recordId).then(response => {
            this.setState({attributeValues: response.flat()})
        }).catch((e) => this.setState({isServerError: true}))


    }
    getLogs = () => {
        RecordService.getLogs(this.props.recordId).then(response => {
            this.setState({logs: response})
        }).catch((e) => this.setState({isServerError: true}))

    }

    /**
     * If a widget is changed or added this method is used to send it to the backend/database
     * TODO split this up or specify wether an Update should happen or if a new Widget is created.
     * @param widget
     */
    sendWidgetToBackend(widget) {
        const requestData = {recordId: this.props.recordId, ...widget}
        if (widget.graphType) requestData['graphType'] = widget.graphType
        RecordService.addWidget(requestData).then(response => {
            widget = response;
            this.setState(this.state)
        }).catch((e) => this.setState({isServerError: true}))

    }

    /**
     * handles changes to a widget after edit is complete
     * @param widget
     * @returns {function(...[*]=)}
     */
    handleUpdateWidgetButton = (widget) => (title, widgetType, attributeMapping, graphType) => {
        widget.title = title;
        widget.widgetType = widgetType;
        widget.attributeMapping = attributeMapping;
        if (widgetType === WidgetTypes.GRAPH) widget.graphType = graphType;
        this.setState({widgets: this.state.widgets})
        this.sendWidgetToBackend(widget);
    }

    /**
     * Switches the position of two widgets
     *
     * @param positionA
     * @param positionB
     */
    switchWidget = (positionA, positionB) => {
        let a = this.state.widgets.find(widget => widget.positionInfo === positionA)
        let b = this.state.widgets.find(widget => widget.positionInfo === positionB)
        a.positionInfo = positionB;
        b.positionInfo = positionA;
        this.sendWidgetToBackend(a)
        this.sendWidgetToBackend(b)
        this.setState({widgets: this.state.widgets})
    }

    handleServerErrorBarClose = (e) => {
        this.setState({
            isServerError: false,

        });
    }

    /**
     * Renders all Widgets (general Information), and adds a ChildComponent with the Type of corresponding widget
     * @returns {*}
     */
    render() {
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
                                    docTypes={this.state.docTypes}
                                    attributeTypes={this.state.attributeTypes}
                                    attributeValues={this.state.attributeValues}
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
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>

            </div>


        );
    }
}
