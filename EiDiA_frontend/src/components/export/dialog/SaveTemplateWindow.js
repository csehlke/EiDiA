import React from 'react';
import {Button, Input, Typography} from '@material-ui/core';
import {Column, Row} from '../../StyleElements';
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
    error: {
        color: theme.palette.error.main // see index.js
    },
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
});

class SaveTemplateWindow extends React.Component {
    render() {
        const {classes} = this.props;
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
                Saving template not implemented yet
                <Row>
                    <Button
                        style={styles.button_left}
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={this.props.onClose}
                        className={classes.error}
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

export default withStyles(styles, {withTheme: true})(SaveTemplateWindow);
