import React from 'react';
import Button from '@material-ui/core/Button';
import {pageNames} from "../../../support files/constants";

const buttonStyle = {
    margin: "15px"
}

export default class ExportSection extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    onClick={() => this.props.onAction1("Edit")}
                >
                    Next
                </Button>
            </div>
        )
    }
}
