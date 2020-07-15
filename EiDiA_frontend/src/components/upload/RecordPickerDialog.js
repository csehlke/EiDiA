"use strict";

import React from 'react';
import styled from "styled-components";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {Button, Input} from '@material-ui/core';
import {RecordSymbol} from "../record/RecordSymbol";
import IconButton from "@material-ui/core/IconButton";
import RecordService from "../../services/RecordService";
import UploadFileExplorer from "./UploadFileExplorer";

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

const SearchBar = styled.div`
    width: 80%;
    justify-content: center;
    margin: 3% 10%;
`;

const SizedDialogContent = styled(DialogContent)`
    min-width: 30vw;
    max-width: 30vw;
    min-height: 40vh;
    max-height: 40vh;
`;


class RecordPickerDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: [],
            search: '',
            renderRecordPicker: true, // show record picker before FileExplorer
            selectedRecord: '',
            selectedFolder: {name: 'Root-Folder', id: '000000000000000000000000'},
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleRecordClick = this.handleRecordClick.bind(this);
        this.getSelectedFolder = this.getSelectedFolder.bind(this);
        this.saveSelectedData = this.saveSelectedData.bind(this);
    }

    componentDidMount() {
        RecordService.getAllRecords().then(result => {
            this.setState({
                records: result.records
            });
        })
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value
        });
    }

    closeDialog() {
        this.props.onClose();
        this.setState({
            selectedFolder: {name: 'Root-Folder', id: '000000000000000000000000'} //Reset state after close
        });
    }

    handleRecordClick(record) {
        this.setState({
            selectedRecord: record,
            renderRecordPicker: false
        });
    }

    getSelectedFolder(element) {
        this.setState({
            selectedFolder: element
        });
    }

    saveSelectedData() {
        this.props.sendData(this.state.selectedRecord.id, this.state.selectedFolder.id)
        this.props.onClose()
    }

    render() {
        let filteredRecords = this.state.records.filter((record) => {
            return record.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //make search work without respecting capitalization
        });
        if (this.state.renderRecordPicker) {
            return (
                <Dialog open={this.props.open} onClose={this.closeDialog}>
                    <DialogTitle>
                        Assign To Record
                    </DialogTitle>
                    <SizedDialogContent dividers>
                        <SearchBar>
                            <Input
                                placeholder="Search Records ..."
                                value={this.state.search}
                                onChange={this.updateSearch}/>
                        </SearchBar>

                        <FlexRow>
                            {filteredRecords.map((record, i) =>
                                <IconButton onClick={() => this.handleRecordClick(record)}
                                            key={i}
                                            size={"small"}
                                            disableRipple>
                                    <RecordSymbol name={record.name}/>
                                </IconButton>
                            )}
                        </FlexRow>
                    </SizedDialogContent>
                </Dialog>
            )
        } else {
            return (
                <Dialog open={this.props.open} onClose={this.closeDialog}>
                    <DialogTitle>
                        Set Save Location in Record "{this.state.selectedRecord.name}"
                    </DialogTitle>
                    <SizedDialogContent dividers>
                        <UploadFileExplorer sendFolder={this.getSelectedFolder}
                                            recordId={this.state.selectedRecord.id}/>
                    </SizedDialogContent>
                    <DialogActions>
                        <b>Current Selection: &nbsp;</b> {this.state.selectedFolder.name}
                        <Button color={"secondary"}
                                onClick={this.closeDialog}>
                            Cancel
                        </Button>
                        <Button autoFocus
                                color="primary"
                                onClick={this.saveSelectedData}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }
    }
}

export default RecordPickerDialog;
