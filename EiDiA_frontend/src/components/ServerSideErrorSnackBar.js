"use strict";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import PropTypes from "prop-types";

export class ServerSideErrorSnackBar extends React.Component {
    render() {
        return <Snackbar open={this.props.isError}
                         autoHideDuration={5000}
                         onClose={this.props.onClose}>
            <Alert severity="error" onClose={this.props.onClose}>
                Sorry this should not have happened.<br/>
                Server-Side Error
            </Alert>
        </Snackbar>;
    }
}

ServerSideErrorSnackBar.propTypes = {
    isError: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
