import React from 'react';
import {Button, Input, Typography} from '@material-ui/core';
import {Column, Row} from '../../../support files/constants';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export default class ExportDocumentWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedDocs: []}
        this.selectDocument = this.selectDocument.bind(this);
        this.download = this.download.bind(this);
    }

    selectDocument(doc) {
        let newState = this.state;
        newState.selectedDocs.push(doc);
        this.setState(newState);
    }

    download() {
        this.props.download(this.state.selectedDocs);
    }

    render() {
        let usedDocs = this.props.selectedDocs;
        return (
            <div>
                <Column>
                    <Typography variant="subtitle2">
                        Used Documents
                    </Typography>
                    <FormGroup>
                        {usedDocs.map((doc) => <FormControlLabel
                            control={<Checkbox color="primary" onChange={() => this.selectDocument(doc.name)}/>}
                            label={doc.name}/>)}
                    </FormGroup>
                </Column>
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
                            onClick={this.download}
                        >
                            Export
                        </Button>
                    </Row>
                </Column>
            </div>
        )
    }
}
