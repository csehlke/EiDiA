"use strict";

import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

class SmartDropDownBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            //TODO default margin value should be zero
            margin: this.props.margin != null ? this.props.margin : "0.5em",
            options: this.props.options,
            label: this.props.label,
            value: this.props.preselectedValue ? this.props.preselectedValue : null,

        }


        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                options: this.props.options,
                label: this.props.label,
                preselectedValue: this.props.preselectedValue

            })
        }
    }

    reset() {
        this.setState({
            inputValue: '',
            value: null,
        });
    }

    handleOnChange(event, value) {
        const inputValue = (value === null) ? '' : value.name;
        this.setState({
            inputValue: inputValue,
            value: value,
        });
        this.props.onChange(event, value);
    }

    handleOnInputChange(event, value) {
        this.setState({
            inputValue: value,
        });
    }

    render() {
        return (
            <Autocomplete
                id="combo-box"
                handleHomeEndKeys
                selectOnFocus
                autoComplete
                autoHighlight
                disableClearable={this.props.clearable === undefined ? false : !this.props.clearable}
                blurOnSelect
                fullWidth
                size={"small"}
                //TODO: change this to state and therefore controlled
                disabled={this.props.disabled ? this.props.disabled : false}
                options={this.state.options}
                inputValue={this.state.inputValue}
                value={this.state.value}
                onChange={this.handleOnChange}
                onInputChange={this.handleOnInputChange}
                getOptionLabel={(option) => option.name}
                //TODO: better solution for style
                style={this.props.style ? this.props.style : {margin: this.state.margin}}
                renderInput={(params) => (
                    <TextField {...params}
                               label={this.state.label}
                               variant="outlined" placeholder="Type to filter"
                    />)}
                getOptionSelected={(option, value) => option.id === value.id && option.name === value.name}
            />
        );
    }
}

export default SmartDropDownBox;

SmartDropDownBox.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    style: PropTypes.object,
    preselectedValue: PropTypes.object,
    margin: PropTypes.string,
    clearable: PropTypes.bool,
}
