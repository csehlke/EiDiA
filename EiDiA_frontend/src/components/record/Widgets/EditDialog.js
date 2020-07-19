import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {GraphType, WidgetTypes} from "../../../assets/Constants";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import SmartDropDownBox from "../../SmartDropDownBox";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {IoMdAddCircleOutline, IoMdRemoveCircleOutline} from "react-icons/all";


export class EditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: this.props.widgetType,
            selectedTitle: this.props.widgetTitle,
            selectedAttributeMapping: this.props.attributeMapping,
            selectedGraph: this.props.graphType,
            titleError: false,
            typeError: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                selectedType: this.props.widgetType,
                selectedTitle: this.props.widgetTitle,
                selectedAttributeMapping: this.props.attributeMapping,
                selectedGraph: this.props.graphType,


            })
        }
    }


    getAttributesForDocType(docTypeId) {
        return this.props.attributeTypes.filter(attributeType => attributeType.docTypeId === docTypeId);
    }


    indicator() {
        return (
            [
                <Grid key={"descriptionIndicatorAttributes"} item xs={12}>
                    <DialogContentText>
                        Select Attributes to Display:
                    </DialogContentText>
                </Grid>,
                this.state.selectedAttributeMapping.map((mapping, index) =>
                    [
                        this.getDocTypeSelector(index, mapping, 3),
                        this.getAttributeSelector(index, mapping, 3),
                        this.getDisplayNameField(index, mapping, 5),
                        this.getRemoveAttributeLineButton(index, 1)
                    ]
                ),
                this.state.selectedAttributeMapping.length <= 5 ? this.getAddAttributeLineButton(12) : null
            ]
        )
    }

    graph() {

        const colorOptions = [
            {name: "Red", color: "red"},
            {name: "Green", color: "green"},
            {name: "Blue", color: "blue"},
            {name: "Pink", color: "pink"},
            {name: "Orange", color: "orange"},
        ]
        const GraphTypeOptions = [
            {name: GraphType.Line, graphType: GraphType.Line},
            {name: GraphType.Bar, graphType: GraphType.Bar},
        ]
        const preValueGraphType = GraphTypeOptions.find(opt => opt.graphType === this.state.selectedGraph);
        return ([
                <Grid key={"descriptionGraphSelection"} item xs={12}>
                    <DialogContentText>Select The Graph Type to Show:</DialogContentText>
                </Grid>,
                <Grid key={"selectGraphType"} item xs={12}>
                    <SmartDropDownBox margin={"0"}
                                      preselectedValue={preValueGraphType ? preValueGraphType : GraphType.Line}
                                      label={"Graph Type"}
                                      onChange={(event, value) => this.changeGraphType(value.graphType)}
                                      options={GraphTypeOptions}
                                      clearable={false}/>
                </Grid>,
                <Grid key={"descriptionGraphAttributes"} item xs={12}>
                    <DialogContentText>Select Attributes to
                        Display:</DialogContentText>
                </Grid>,
                //TODO for Graphs only one DocType makes sense, this should be considered and validated in futures
                this.state.selectedAttributeMapping.map((mapping, index) =>
                    [
                        this.getDocTypeSelector(index, mapping, 3),
                        this.getAttributeSelector(index, mapping, 3),
                        this.getDisplayNameField(index, mapping, 3),
                        this.getColorSelector(colorOptions, index, mapping, 2),
                        this.getRemoveAttributeLineButton(index, 1)
                    ]
                ),
                this.state.selectedAttributeMapping.length <= 5 ? this.getAddAttributeLineButton(12) : null
            ]
        )
    }

    getAddAttributeLineButton = (sm) => {
        return (
            <Grid container key={"addButton"} item xs={12} sm={sm} justify="center">
                <IconButton onClick={this.handleAddAttributeButton} aria-label="Add">
                    <IoMdAddCircleOutline/>
                </IconButton>
            </Grid>
        )
    }

    getRemoveAttributeLineButton = (index, sm) => {
        return (
            <Grid key={index + "removeButton"} item xs={12} sm={sm}>
                <IconButton onClick={this.handleRemoveAttributeButton(index)}
                            aria-label="Remove Line">
                    <IoMdRemoveCircleOutline/>
                </IconButton>
            </Grid>);
    }

    getColorSelector = (colorOptions, index, mapping, sm) => {
        return (
            <Grid key={index + "color"} item xs={12} sm={sm}>
                <SmartDropDownBox margin={"0"}
                                  label={"Color Options"}
                                  preselectedValue={colorOptions.find(opt => opt.color === mapping.color)}
                                  onChange={(event, value) => this.changeAttributeMapping(index, "color", value.color)}
                                  options={colorOptions}
                                  clearable={false}/>
            </Grid>);
    }

    getDisplayNameField = (index, mapping, sm) => {
        return (
            <Grid key={index + "c"} item xs={12} sm={sm}>
                <TextField
                    size={"small"}
                    fullWidth={true}
                    id="displayName"
                    label="Display Name"
                    value={mapping.displayName}
                    variant="outlined"
                    onChange={(event) => this.changeAttributeMapping(index, "displayName", event.target.value)}
                />
            </Grid>
        );
    }

    getAttributeSelector = (index, mapping, sm) => {
        // console.log(this.getAttributesForDocType(mapping.docTypeId).find(opt => opt.attributeId === mapping.attributeId))
        const preselectedValue = this.getAttributesForDocType(mapping.docTypeId).find(opt => opt.attributeId === mapping.attributeId)
        return (
            <Grid key={index + "attributeId"} item xs={12} sm={sm}>
                <SmartDropDownBox margin={"0"}
                                  preselectedValue={preselectedValue}
                                  label={"Attribute"}
                                  onChange={(event, value) => this.changeAttributeMapping(index, "attributeId", value.attributeId)}
                                  options={this.getAttributesForDocType(mapping.docTypeId)}
                                  clearable={false}/>
            </Grid>
        );
    }

    getDocTypeSelector = (index, mapping, sm) => {
        return (
            <Grid key={index + "a"} item xs={12} sm={sm}>
                <SmartDropDownBox margin={"0"}
                                  preselectedValue={this.props.docTypes.find(opt => opt.docTypeId === mapping.docTypeId)}
                                  label={"Document Type"}
                                  onChange={(event, value) => this.changeAttributeMapping(index, "docTypeId", value.docTypeId)}
                                  options={this.props.docTypes}
                                  clearable={false}/>
            </Grid>
        );
    }

    /**
     * So far there are no special options that can be set for the Log widget
     * @returns {null}
     */
    log() {
        return null
    }

    dialogPicker() {
        switch (this.state.selectedType) {
            case WidgetTypes.INDICATOR:
                return this.indicator();
            case WidgetTypes.GRAPH:
                return this.graph();
            case WidgetTypes.LOG:
                return this.log();
            default:
                console.error("The dialog Picker received an non registered WidgetType")
        }
    }

    changeTitle = (value) => {
        this.setState({selectedTitle: value, titleError: false});
    }

    changeType = (value) => {
        if (value === WidgetTypes.GRAPH && this.state.selectedGraph === undefined)
            this.setState({selectedType: value, selectedGraph: GraphType.Line, typeError: false});
        else
            this.setState({selectedType: value, typeError: false});
    }

    changeAttributeMapping = (index, attr, value) => {
        //this line has to come before adding changing the actual attribute of attributeMapping
        if (attr === "docTypeId" && this.state.selectedAttributeMapping[index][attr] !== value) {
            console.log("hello")
            this.state.selectedAttributeMapping[index]["attributeId"] = "";
        }
        this.state.selectedAttributeMapping[index][attr] = value;
        this.setState({selectedAttributeMapping: this.state.selectedAttributeMapping});
        console.log(this.state.selectedAttributeMapping[index])
    }

    changeGraphType = (value) => {
        this.setState({selectedGraph: value})
    }

    handleAddAttributeButton = () => {
        this.state.selectedAttributeMapping.push({
            docTypeId: null,
            attributeId: null,
            displayName: '',
        })
        this.setState({selectedAttributeMapping: this.state.selectedAttributeMapping})
    }

    handleRemoveAttributeButton = (index) => () => {
        this.state.selectedAttributeMapping.splice(index, 1)
        this.setState({selectedAttributeMapping: this.state.selectedAttributeMapping})
    }
    handleSaveButton = () => {
        if (this.state.selectedTitle.trim() === "" || this.state.selectedType === "") {
            this.setState({titleError: this.state.selectedTitle === "", typeError: this.state.selectedType === ""})
        } else {
            this.props.handleUpdateWidgetButton(
                this.state.selectedTitle,
                this.state.selectedType,
                this.state.selectedAttributeMapping,
                this.state.selectedGraph
            );
            this.props.onClose();
        }
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
            {name: WidgetTypes.INDICATOR, widgetType: WidgetTypes.INDICATOR},
            {name: WidgetTypes.GRAPH, widgetType: WidgetTypes.GRAPH},
            {name: WidgetTypes.LOG, widgetType: WidgetTypes.LOG}
        ]

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} style={{flexGrow: 1}} fullWidth={true}
                    maxWidth={'lg'}>
                <DialogTitle key={"title"} style={classes.title}>
                    Edit Widget

                </DialogTitle>
                <DialogContent key={"content"} style={{overflow: "hidden"}}>
                    <Grid style={{flexGrow: 1}} container spacing={2}>
                        <Grid key={"titleInput"} item xs={12}>
                            <TextField

                                size={"small"}
                                error={this.state.titleError}
                                fullWidth={true}
                                id="Title"
                                label="Title"
                                value={this.state.selectedTitle}
                                variant={"outlined"}
                                onChange={(event) => this.changeTitle(event.target.value)}
                                helperText={this.state.titleError && "The title must not be empty!"}
                            />
                        </Grid>


                        <Grid key={"widgetSelect"} item xs={12}>
                            <SmartDropDownBox margin={"0"}
                                              preselectedValue={typeOptions.find(opt => opt.widgetType === this.state.selectedType)}
                                              label={"Widget Type"}
                                              onChange={(event, value) => this.changeType(value.widgetType)}
                                              options={typeOptions}
                                              clearable={false}
                                              error={this.state.typeError}
                                              errorMessage={"The widget type must be selected!"}
                            />
                        </Grid>
                        {this.dialogPicker()}
                    </Grid>


                </DialogContent>
                <DialogActions>
                    {/*TODO: coloring of Buttons*/}
                    <Button onClick={
                        this.props.onClose
                    }>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSaveButton}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


}
