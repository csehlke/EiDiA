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
                return (
                    <GraphsWidget graph={widget.graph} edit={this.state.edit} attributeMapping={widget.attributeMapping}
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
                        title: "",
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
    /**
     * TODO: split up the function?
     * @param widget
     * @param toChange
     * @param index
     * @param event
     * @param value
     */
    changeData(widget, toChange, index, event, value) {

        switch (toChange) {
            case "title":
                widget.title = event.target.value;
                break;
            case "type":
                widget.type = value.type;//event.target.value.type;
                break;
            case "attrId":
                widget.attributeMapping[index].attrId = value.attrId;
                break;
            case "docTypeId":
                widget.attributeMapping[index].docTypeId = value.docTypeId;
                widget.attributeMapping[index].attrId = "";

                break;
            case "displayName":
                widget.attributeMapping[index].displayName = event.target.value;
                break;
            case "graph":
                widget.graph = value.type;
                break;
            case "color":
                widget.attributeMapping[index].color = value.color;
                break;

            default:
                break;

        }
        console.log(widget.attributeMapping)
        this.setState({widgets: this.state.widgets})
    }

    addAttribute(widget) {
        widget.attributeMapping.push({
            docTypeId: null,
            attrId: null,
            displayName: null,
        })
        this.setState({widgets: this.state.widgets})

    }

    removeAttributeFromMapping(widget, index) {
        widget.attributeMapping.splice(index, 1)
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
        //taken from here https://stackoverflow.com/questions/35828991/make-material-ui-reactjs-floatingactionbutton-float
        //to let fab button float right
        const styleFabButton = {
            margin: 0,
            top: 'auto',
            right: 20,
            left: 'auto',
            position: 'fixed',
        };
        return (
            <div>

                <DashboardWrapper>

                    {this.state.widgets.map((widget, index) =>
                        <WidgetWrapper key={index} edit={this.state.edit} positionInfo={widget.positionInfo}>
                            <WidgetDropTarget positionInfo={widget.positionInfo}>
                                <Widget changeData={this.changeData.bind(this, widget)}
                                        addAttribute={this.addAttribute.bind(this, widget)}
                                        removeAttributeFromMapping={this.removeAttributeFromMapping.bind(this, widget)}
                                        edit={this.state.edit}
                                        widget={widget}
                                    // title={widget.title} type={widget.type}
                                        switchWidget={(posA, posB) => this.switchWidget(posA, posB)}
                                    // positionInfo={widget.positionInfo}
                                    // attributeMapping={widget.attributeMapping}
                                >{this.renderWidget(widget)}

                                </Widget>
                            </WidgetDropTarget>
                        </WidgetWrapper>)}

                </DashboardWrapper>
                <Fab style={styleFabButton} color="secondary" aria-label="edit"
                     onClick={this.handleEditDashboardButton.bind(this)}>
                    <FiEdit size={32}/>
                </Fab>

            </div>


        );
    }
}

