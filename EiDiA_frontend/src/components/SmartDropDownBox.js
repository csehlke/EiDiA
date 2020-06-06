import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class SmartDropDownBox extends React.Component {

    constructor(props) {
        super(props);
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
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}
                getOptionLabel={(option) => option.name}
                style={{margin: '0.5em'}}
                renderInput={(params) => (
                    <TextField {...params}
                               label={this.props.label}
                               variant="outlined" placeholder="Type to filter"/>
                )}
            />
        );
    }
}
