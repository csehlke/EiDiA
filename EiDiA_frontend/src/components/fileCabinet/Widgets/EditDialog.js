import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {Attributes, DatabaseDocTypes, GraphType, WidgetTypes} from "../../../assets/Constants";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import SmartDropDownBox from "../../SmartDropDownBox";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {MdAddCircleOutline, MdRemoveCircleOutline} from "react-icons/all";

/**
 * TODO:
 * Add Limit for Titles
 * Add Limit for Attributes
 * - Color minus red
 * - Color Plus türkis
 */


export class EditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: this.props.widgetType,
            selectedTitle: this.props.widgetTitle,
            selectedAttributeMapping: this.props.attributeMapping,
            selectedGraph: this.props.graphType,//if accessible TODO: maybe add some exception handling
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                selectedType: this.props.widgetType,
                selectedTitle: this.props.widgetTitle,
                selectedAttributeMapping: this.props.attributeMapping,
                selectedGraph: this.props.graphType,//if accessible TODO: maybe add some exception handling


            })
        }
    }

    getRecordDocTypes() {
        /**
         * TODO Database COnnection
         */
        return (DatabaseDocTypes)
    }

    getAttributes() {
        return Attributes;
    }

    getAttributesForDocType(docTypeId) {
        /**
         * TODO make sure that each attribute object as a name attribute
         */
        return (this.getAttributes().filter(attr => attr.docTypeId === docTypeId))
    }


    indicator() {
        /**
         * TODO:
         * - set min width around Grid items for bigger fields
         * - set max length for Display name and display error if too long
         * - style description texts
         * */
        return ([

                <DialogContentText key={"descriptionIndicatorAttributes"}>Select Attributes to
                    Display:</DialogContentText>,
                <Grid key={"attributesIndicator"} style={{flexGrow: 1}} container spacing={2}>

                    {this.state.selectedAttributeMapping.map((mapping, index) =>

                        [<Grid key={index + "a"} item xs={12} sm={3}>

                            <SmartDropDownBox margin={"0"}
                                              preselectedValue={this.getRecordDocTypes().find(opt => opt.docTypeId === mapping.docTypeId)}
                                              label={"Document Type"}
                                              onChange={this.props.changeData.bind(this, "docTypeId", index)}
                                              options={this.getRecordDocTypes()}
                            />
                        </Grid>,
                            <Grid key={index + "b"} item xs={12} sm={3}>

                                <SmartDropDownBox margin={"0"}
                                                  preselectedValue={this.getAttributes().find(opt => opt.attrId === mapping.attrId)}
                                                  label={"Attribute"}
                                                  onChange={this.props.changeData.bind(this, "attrId", index)}
                                                  options={this.getAttributesForDocType(mapping.docTypeId)}
                                />
                            </Grid>,
                            <Grid key={index + "c"} item xs={12} sm={5}>
                                <TextField
                                    size={"small"}
                                    fullWidth={true}
                                    id="displayName"
                                    label="Display Name"
                                    value={mapping.displayName}
                                    variant="outlined"
                                    onChange={this.props.changeData.bind(this, "displayName", index)}
                                />
                            </Grid>,

                            <Grid key={"addButton"} item xs={12} sm={1}>
                                <IconButton onClick={this.props.removeAttributeFromMapping.bind(this, index)}
                                            aria-label="Add">
                                    <MdRemoveCircleOutline/>
                                </IconButton>
                            </Grid>
                        ]
                    )}
                    {/**
                     * TODO: DIsable Button if there are already to many attributes*/}
                    {this.state.selectedAttributeMapping.length <= 5 ?
                        <Grid container key={"addButton"} item xs={12} sm={12} justify="center">
                            <IconButton onClick={this.props.addAttribute.bind(this)} aria-label="Add">
                                <MdAddCircleOutline/>
                            </IconButton>
                        </Grid>
                        : null}

                </Grid>
            ]


        )
    }

    graph() {
        /**
         * TODO: more advanced colors
         */
        const colorOptions = [
            {name: "Red", color: "red"},
            {name: "green", color: "green"},
        ]
        const GraphTypeOptions = [
            {name: GraphType.Line, type: GraphType.Line},
            {name: GraphType.Bar, type: GraphType.Bar},
            // {name: GraphType.Pie, type:GraphType.Pie}
        ]
        return ([
                <DialogContentText key={"descriptionGraphSelection"}>Select The Graph Type to Show:</DialogContentText>,
                <SmartDropDownBox key={"selectGraphType"} margin={"0"}
                                  preselectedValue={GraphTypeOptions.find(opt => opt.type === this.state.selectedGraph)}
                                  label={"Graph Type"}
                                  onChange={this.props.changeData.bind(this, "graph", -1)}
                                  options={GraphTypeOptions}
                />,

                <DialogContentText key={"descriptionGraphAttributes"}>Select Attributes to
                    Display:</DialogContentText>,

                <Grid key={"attributeList"} style={{flexGrow: 1}} container spacing={2}>

                    {this.state.selectedAttributeMapping.map((mapping, index) =>

                        [<Grid key={index + "docTypeId"} item xs={12} sm={3}>

                            <SmartDropDownBox margin={"0"}
                                              preselectedValue={this.getRecordDocTypes().find(opt => opt.docTypeId === mapping.docTypeId)}
                                              label={"Document Type"}
                                              onChange={this.props.changeData.bind(this, "docTypeId", index)}
                                              options={this.getRecordDocTypes()}
                            />
                        </Grid>,
                            <Grid key={index + "attributeId"} item xs={12} sm={3}>

                                <SmartDropDownBox margin={"0"}
                                                  preselectedValue={this.getAttributes().find(opt => opt.attrId === mapping.attrId)}
                                                  label={"Attribute"}
                                                  onChange={this.props.changeData.bind(this, "attrId", index)}
                                                  options={this.getAttributesForDocType(mapping.docTypeId)}
                                />
                            </Grid>,
                            <Grid key={index + "displayName"} item xs={12} sm={3}>
                                <TextField
                                    size={"small"}
                                    fullWidth={true}
                                    id="displayName"
                                    label="Display Name"
                                    value={mapping.displayName}
                                    variant="outlined"
                                    onChange={this.props.changeData.bind(this, "displayName", index)}
                                />
                            </Grid>,
                            <Grid key={index + "color"} item xs={12} sm={2}>

                                <SmartDropDownBox margin={"0"}
                                                  label={"Color Options"}
                                                  onChange={this.props.changeData.bind(this, "color", index)}
                                                  options={colorOptions}
                                />
                            </Grid>,

                            <Grid key={"addButton"} item xs={12} sm={1}>
                                <IconButton onClick={this.props.removeAttributeFromMapping.bind(this, index)}
                                            aria-label="Add">
                                    <MdRemoveCircleOutline/>
                                </IconButton>
                            </Grid>
                        ]
                    )}
                    {/**
                     * TODO: DIsable Button if there are already to many attributes*/}
                    {this.state.selectedAttributeMapping.length <= 5 ?
                        <Grid container key={"addButton"} item xs={12} sm={12} justify="center">
                            <IconButton onClick={this.props.addAttribute.bind(this)} aria-label="Add">
                                <MdAddCircleOutline/>
                            </IconButton>
                        </Grid>
                        : null}

                </Grid>
            ]


        )

    }

    log() {
        return (
            <DialogContentText>hello</DialogContentText>

        )
    }

    dialogPicker() {
        switch (this.state.selectedType) {
            case WidgetTypes.INDICATOR:
                return this.indicator();
            case WidgetTypes.GRAPH:
                return this.graph();
            case WidgetTypes.LOG:
                return this.log();
        }
    }

    changeWidgetType(event) {
        /**
         * TODO: backendConnection
         *
         */
        this.setState({selectedType: event.target.value})
    }

    changeWidgetTitle(event) {
        /**
         * TODO: backendConnection
         * move upwards
         */
        this.setState({selectedTitle: event.target.value})
    }

    render() {
        const classes = {
            dialog: {
                width: '30vw',
                height: 'auto'
            },
            container: {
                display: 'flex', flexWrap: 'wrap',
            },
            formControl: {
                minWidth: 120,
                margin: "0 5%",
            },
            title: {
                marginLeft: "5%"
            }

        };
        let typeOptions = [
            {name: WidgetTypes.INDICATOR, type: WidgetTypes.INDICATOR},
            {name: WidgetTypes.GRAPH, type: WidgetTypes.GRAPH},
            {name: WidgetTypes.LOG, type: WidgetTypes.LOG}
        ]
        /**
         * TODO: THeme needs to be set for Typography to style e.g. the different headings
         */
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle key={"title"} style={classes.title} id="simple-dialog-title">
                    Edit Widget

                </DialogTitle>
                <DialogContent key={"content"} style={{overflow: "hidden"}}>
                    <Grid style={{flexGrow: 1}} container spacing={3}>
                        <Grid key={"titleInput"} item xs={12}>
                            <TextField
                                size={"small"}
                                fullWidth={true}
                                id="Title"
                                label="Title"
                                value={this.state.selectedTitle}
                                variant={"outlined"}
                                onChange={this.props.changeData.bind(this, "title", -1)}
                            />
                        </Grid>
                        <Grid key={"widgetSelect"} item xs={12}>
                            <SmartDropDownBox margin={"0"}
                                              preselectedValue={typeOptions.find(type => type.type === this.state.selectedType)}
                                              label={"Widget Type"}
                                              onChange={this.props.changeData.bind(this, "type", -1)}
                                              options={typeOptions}/>
                        </Grid>

                    </Grid>
                    {this.dialogPicker()}


                </DialogContent>
            </Dialog>
        );
    }


}
