import React from 'react';
import {Button, Typography} from '@material-ui/core';
import {Column, Row} from '../../StyleElements';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

class ExportDocumentWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedDocs: []}
        this.changeCheckBox = this.changeCheckBox.bind(this);
        this.download = this.download.bind(this);
    }

    changeCheckBox(event) {
        let newArr;
        let documentID = event.target.value;
        if (event.target.checked) {
            newArr = this.state.selectedDocs.concat(documentID);
        } else {
            newArr = this.state.selectedDocs.filter((docID) => docID !== documentID);
        }
        this.setState({selectedDocs: newArr});
    }

    download() {
        this.props.download(this.state.selectedDocs);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Column>
                    <Typography variant="subtitle2">
                        Used Documents
                    </Typography>
                    <FormGroup>
                        {this.props.usedDocs.map((doc) => <FormControlLabel
                            control={<Checkbox color="primary" onChange={this.changeCheckBox}/>}
                            label={doc.name}
                            value={doc.id}/>)}
                    </FormGroup>
                </Column>
                <Column>
                    <Row>
                        <Button
                            style={styles.button_left}
                            variant="contained"
                            className={classes.error}
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

export default withStyles(styles, {withTheme: true})(ExportDocumentWindow);
