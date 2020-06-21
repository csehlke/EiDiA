import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import PropTypes from "prop-types";

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    disableFuture
                    initialFocusedDate=""
                    inputVariant="outlined"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    size={"small"}
                    fullWidth
                    disabled={this.props.disabled ? this.props.disabled : false}
                    label={this.props.label}
                    maxDate={this.props.maxDate}
                    minDate={this.props.minDate}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    style={{margin: '0.5em'}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export default DatePicker;

DatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}
