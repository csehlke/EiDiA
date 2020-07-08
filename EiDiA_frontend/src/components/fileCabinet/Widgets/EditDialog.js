import React from 'react';
import {FlexRow} from "../../StyleElements";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {WidgetTypes} from "../../../assets/Constants";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";

import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

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
                    <FlexRow>
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

                        {this.dialogPicker()}


                    </FlexRow>

                </DialogContent>
            </Dialog>
        );
    }


}
