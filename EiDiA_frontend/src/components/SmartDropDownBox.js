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
            value: null,
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.reset = this.reset.bind(this);
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
                blurOnSelect
                fullWidth
                size={"small"}
                disabled={this.props.disabled ? this.props.disabled : false}
                options={this.props.options}
                inputValue={this.state.inputValue}
                value={this.state.value}
                onChange={this.handleOnChange}
                onInputChange={this.handleOnInputChange}
                getOptionLabel={(option) => option.name}
                style={this.props.style ? this.props.style : {margin: '0.5em'}}
                renderInput={(params) => (
                    <TextField {...params}
                               label={this.props.label}
                               variant="outlined" placeholder="Type to filter"/>
                )}
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
}
