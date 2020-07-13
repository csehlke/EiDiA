"use strict";

import React from 'react';
import styled from "styled-components";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {Input} from '@material-ui/core';
import {RecordSymbol} from "../record/RecordSymbol";
import {Link} from "../Link";

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
    min-width: 20vw;
    max-width: 20vw;
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
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)});
    }

    closeDialog() {
        this.props.onClose();
    }


    render() {
        let filteredRecords = this.state.records.filter((record) => {
            return record.indexOf(this.state.search) !== -1;
        });
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
                            <Link
                                key={records[i]}
                                to={"/record"}>
                                <RecordSymbol name={record}/>
                            </Link>
                        )}
                    </FlexRow>
                </SizedDialogContent>
            </Dialog>
        )
    }
}

export default RecordPickerDialog;
