import React from 'react';
import Button from '@material-ui/core/Button';
import {pageNames} from "../../../views/ExportView";

const buttonStyle = {
    margin: "15px"
}

export default class ExportSection extends React.Component {
    render() {
        return (
            <div>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => this.props.onAction1(pageNames.editTemplate)}
                >
                    Edit Template
                </Button>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={this.props.onAction3}
                >
                    New Template
                </Button>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => this.props.onAction1(pageNames.edit)}
                >
                    Next
                </Button>
            </div>
        )
    }
}
