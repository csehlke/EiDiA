"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/record/RecordSymbol";
import styled from "styled-components";
import {Input} from '@material-ui/core';
import {Link} from "../components/Link";
import Fab from "@material-ui/core/Fab";
import {IoMdAddCircleOutline} from "react-icons/all";
import AddElementDialog from "../components/record/AddElementDialog";
import RecordService from "../services/RecordService";

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

export class FileCabinetView extends React.Component {

    /*
     *TODO:
     * - add Pages if too many records
     * - add Add Button
     */
    constructor(props) {
        super(props);
        this.state = {
            //TODO: show spinning cirlce maybe as long its empty?
            records: [],
            search: '',
            isAddRecordDialogActive: false,
        }


        this.addRecord = this.addRecord.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("File Cabinet");
        RecordService.getAllRecords().then(result => {
            this.setState({records: result.records});
        }).catch((e) => {
            //TODO snackbar
            console.error((e))
        })
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value});
    }

    toggleAddRecordDialog = () => {
        this.setState({
            isAddRecordDialogActive: !this.state.isAddRecordDialogActive,
        });
    }

    addRecord(recordName) {
        RecordService.addNewRecord(recordName)
            .then(record => {
                this.setState({
                    records: [record, ...this.state.records],
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        //taken from here https://stackoverflow.com/questions/35828991/make-material-ui-reactjs-floatingactionbutton-float
        //to let fab button float right
        const styleFabButton = {
            top: 'auto',
            bottom: '2em',
            right: '2em',
            left: 'auto',
            position: 'fixed',
        };

        let filteredRecords = this.state.records.filter((record) => {
            //TODO: maybe transform all records to lowercase
            return record.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });

        return (
            <Page>
                <SearchBar>
                    <Input
                        placeholder="Search Records ..."
                        fullWidth={true}
                        value={this.state.search}
                        onChange={this.updateSearch}/>
                </SearchBar>


                <FlexRow>
                    {filteredRecords.map((record, i) =>
                        <Link
                            key={i}
                            to={"/record/" + record.id}>
                            <RecordSymbol name={record.name}/>
                        </Link>
                    )}
                </FlexRow>
                <Fab style={styleFabButton} color="primary" aria-label="add"
                     onClick={this.toggleAddRecordDialog}>
                    <IoMdAddCircleOutline size={32}/>
                </Fab>
                <AddElementDialog elementType={"Record"}
                                  open={this.state.isAddRecordDialogActive}
                                  onClose={this.toggleAddRecordDialog}
                                  onSave={this.addRecord}/>
            </Page>
        );
    }
}
