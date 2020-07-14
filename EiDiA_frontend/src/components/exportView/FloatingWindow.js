import React from 'react';
import {Dialog, DialogTitle, Typography} from '@material-ui/core';
import SaveTemplateWindow from './subcomponents/SaveTemplateWindow';
import ExportDocumentWindow from './subcomponents/ExportDocumentWindow';
import Preview from "./subcomponents/Preview";
import {Column, Row} from "../../support files/constants";

const styles = {
    column: {
        margin: "15px",
    },
    box: {
        width: '7cm',
        height: '10cm',
        align: 'center',
        padding: "20px",
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
}

export default class FloatingWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: ["Volkswagen", "BMW", "Thyssenkrup", "Google", "Facebook", "Microsoft", "ABC Company", "Adidas", "lenovo Limited", "IBM", "TrueThat", "hello", "abc", "def"],
            search: ''
        }

        this.dialogContent = {
            "Edit Template": {
                title: "Store Template",
                content: SaveTemplateWindow
            },
            "Edit": {
                title: "Export Document",
                content: ExportDocumentWindow
            }
        }
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)});
    }

    render() {
        const DialogContent = this.dialogContent[this.props.currentPage].content;
        const dialogTitle = this.dialogContent[this.props.currentPage].title;
        let filteredRecords = this.state.records.filter(
            (record) => {
                return record.indexOf(this.state.search) !== -1;
            }
        );
        return (
            <Dialog onClose={this.props.onClose}
                    fullWidth={true}
                    maxWidth={'lg'}
                    classes={{minHeight: '80vh', maxHeight: '80vh'}}
                    aria-labelledby="simple-dialog-title"
                    open={this.props.open}>
                <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
                <Row style={{margin: "10px"}}>
                    <Column style={styles.column}>
                        <Typography variant="subtitle2">
                            Created Template (Preview)
                        </Typography>
                        <Preview editorState={this.props.editorState}/>
                    </Column>
                    <DialogContent
                        updateSearch={this.updateSearch}
                        value={this.state.search}
                        filteredRecords={filteredRecords}
                        onClose={this.props.onClose}
                        save={this.props.save}
                        selectedDocs={this.props.selectedDocs}
                        download={this.props.download}
                        editorState={this.props.editorState}
                    />
                </Row>
            </Dialog>
        );
    }
}
