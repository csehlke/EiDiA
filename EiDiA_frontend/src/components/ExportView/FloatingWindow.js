import React from 'react';
import { Dialog, DialogTitle, Typography, Button, Box, Input } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import {Row, Column} from '../../support files/constants';
import {RecordSymbol} from "../fileCabinet/RecordSymbol";
import styled from "styled-components";
import SaveTemplateWindow from './Subcomponents/SaveTemplateWindow';
import ExportDocumentWindow from './Subcomponents/ExportDocumentWindow';

export default class FloatingWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records : ["Volkswagen","BMW","Thyssenkrup","Google","Facebook","Microsoft","ABC Company","Adidas","lenovo Limited","IBM","TrueThat","hello","abc","def"],
            search : ''
        }

        this.dialogContent = {
            "Edit Template":{ 
                title: "Store Template",
                content: SaveTemplateWindow
            },
            "Edit": {
                title: "Export Document",
                content: ExportDocumentWindow
            }
        }
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    render() {
        const DialogContent = this.dialogContent[this.props.currentPage].content;
        const dialogTitle = this.dialogContent[this.props.currentPage].title;
        let filteredRecords = this.state.records.filter(
            (record) => {
                return record.indexOf(this.state.search) !== -1;
            }
        );
        return(
            <Dialog onClose={this.props.onClose} fullWidth={true} maxWidth={'lg'} id="temp" aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
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
          </Dialog>       
        );
    }
}