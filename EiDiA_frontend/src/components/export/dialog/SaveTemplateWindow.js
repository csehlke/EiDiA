import React from 'react';
import {Button, Input, Typography} from '@material-ui/core';
import {Column, Row} from '../../StyleElements';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    error: {
        color: theme.palette.error.main // see index.js
    }
});

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
                    <div style={{margin: "15px"}}>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={this.props.onClose}
                            className={classes.error}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div style={{margin: "15px"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={() => this.props.save(this.state.templateName)}
                            disabled={this.state.templateName === null || this.state.templateName === ""}
                        >
                            Save Template
                        </Button>
                    </div>
                </Row>
            </Column>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SaveTemplateWindow);
