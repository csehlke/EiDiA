"use strict";

import React from 'react';
import styled from "styled-components";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {Input} from '@material-ui/core';
import {RecordSymbol} from "../record/RecordSymbol";
import IconButton from "@material-ui/core/IconButton";

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
            records: ["Volkswagen",
                "BMW",
                "Thyssenkrup",
                "Google",
                "Facebook",
                "Microsoft",
                "ABC Company",
                "Adidas",
                "lenovo Limited",
                "IBM",
                "TrueThat",
                "hello",
                "abc",
                "def"
            ],
            search: '',
            renderRecordPicker: true
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleRecordClick = this.handleRecordClick.bind(this);
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)});
    }

    closeDialog() {
        this.props.onClose();
    }

    handleRecordClick(records) {
        console.log(records)
        this.setState({
            renderRecordPicker: false
        });
    }

    render() {
        let filteredRecords = this.state.records.filter((record) => {
            return record.indexOf(this.state.search) !== -1;
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
                                onChange={this.updateSearch.bind(this)}/>
                        </SearchBar>

                        <FlexRow>
                            {/*
                    TODO: make Link depending on the records
                    */}
                            {filteredRecords.map((record, i, records) =>
                                <IconButton onClick={(records) => this.handleRecordClick(records[i])}
                                            key={records[i]}
                                            size={"small"}
                                            disableRipple>
                                    <RecordSymbol name={record}/>
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
                        Assign To Folder
                    </DialogTitle>
                    <SizedDialogContent dividers>

                    </SizedDialogContent>
                </Dialog>
            )
        }
    }
}

export default RecordPickerDialog;
