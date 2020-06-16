import React from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';

const buttonStyle= {
    margin: "15px"
}

export default class ExportSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={this.props.onAction1}
                >
                    Edit Template
                </Button>
                <Button 
                    style={buttonStyle} 
                    variant="contained" 
                    color="primary" 
                    disableElevation
                    onClick={this.props.onAction2}    
                >
                    Next
                </Button>
            </div>
        )
    }
}