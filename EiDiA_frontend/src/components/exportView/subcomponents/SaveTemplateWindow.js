import React from 'react';
import {Button, Input, Typography} from '@material-ui/core';
import {Column, Row} from '../../../support files/constants';

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

export default class SaveTemplateSection extends React.Component {
    render() {
        return (
            <Column>
                <Row>
                    <Typography variant="subtitle2">
                        Template Name
                    </Typography>
                </Row>
                <Row>
                    <Input placeholder="Template Name"/>
                </Row>
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
                        onClick={this.props.save}
                    >
                        Save Template
                    </Button>
                </Row>
            </Column>
        )
    }
}
