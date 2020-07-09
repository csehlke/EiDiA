import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {WidgetTypes} from "../../../assets/Constants";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import SmartDropDownBox from "../../SmartDropDownBox";

/**
 * TODO:
 * Add Limit for Titles
 * Add Limit for Attributes
 */


export class EditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: this.props.widgetType,
            selectedTitle: this.props.widgetTitle
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                selectedType: this.props.widgetType,
                selectedTitle: this.props.widgetTitle
            })
        }
    }

    indicator() {
        return (

            <p>something</p>
        )
    }

    graph() {
        return (
            <DialogContentText>hello</DialogContentText>

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
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle style={classes.title} id="simple-dialog-title">
                    <TextField
                        id="Title"
                        label="Title"
                        value={this.state.selectedTitle}
                        onChange={this.props.changeData.bind(this, "title")}
                    />

                </DialogTitle>
                <DialogContent>
                    <SmartDropDownBox inputValue={{name: this.state.selectedType}} label={"Widget Type"}
                                      onChange={this.props.changeData.bind(this, "type")} options={typeOptions}/>

                    {/* <FlexRow>
                        <FormControl style={classes.formControl}>
                            <InputLabel htmlFor="type-label">Widget Type</InputLabel>
                            <Select
                                input={<Input id="type-label"/>}
                                value={this.state.selectedType}
                                onChange={this.props.changeData.bind(this, "type")}
                            >
                                <MenuItem value={WidgetTypes.INDICATOR}>Indicator</MenuItem>
                                <MenuItem value={WidgetTypes.GRAPH}>Graph</MenuItem>
                                <MenuItem value={WidgetTypes.LOG}>Log</MenuItem>
                            </Select>
                        </FormControl>




                    </FlexRow>*/}
                    {this.dialogPicker()}

                </DialogContent>
            </Dialog>
        );
    }


}
