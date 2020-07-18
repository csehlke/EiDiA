import React from 'react';
import {Button, Input, Typography} from '@material-ui/core';
import {Column, Row} from '../../StyleElements';

const styles = {
    button_left: {
        margin: "15px",
        align: "left",
        bottom: 0,
    },
    button_right: {
        margin: "15px",
        align: "right",
        bottom: 0,
        right: 0,
    }
}

export default class SaveTemplateWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateName: "",
        }
        this.setTemplateName = this.setTemplateName.bind(this);
    }

    setTemplateName(event) {
        this.setState({templateName: event.target.value});
    }

    render() {
        return (
            <Column>
                <Row>
                    <Typography variant="subtitle2">
                        Template Name
                    </Typography>
                </Row>
                <Row>
                    <Input placeholder="Template Name" onChange={this.setTemplateName}/>
                </Row>
                Saving template not implemented yet
                <Row>
                    <Button
                        style={styles.button_left}
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={styles.button_right}
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => this.props.save(this.state.templateName)}
                        disabled={this.state.templateName === null || this.state.templateName === ""}
                    >
                        Save Template
                    </Button>
                </Row>
            </Column>
        )
    }
}
