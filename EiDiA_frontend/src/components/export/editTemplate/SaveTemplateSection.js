import React from 'react';
import Button from '@material-ui/core/Button';

const buttonStyle = {
    margin: "15px"
}

export default class SaveTemplateSection extends React.Component {
    render() {
        return (
            <Button
                style={buttonStyle}
                variant="contained"
                color="primary"
                disableElevation
                onClick={this.props.onAction1}
            >
                Save Template
            </Button>
        )
    }
}
