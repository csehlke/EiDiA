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
import {ServerSideErrorSnackBar} from "../components/ServerSideErrorSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {styleFabButton} from "../../../constants";

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


    constructor(props) {
        super(props);
        this.state = {
            records: [],
            search: '',
            isAddRecordDialogActive: false,
            isRecordAlreadyExistsError: false,
            isServerError: false,
        }

    }

    /**
     * Pulls all available Records from the database
     */
    componentDidMount() {
        this.props.setTitle("File Cabinet");
        RecordService.getAllRecords().then(result => {
            this.setState({records: result.records});
        }).catch((e) => this.setState({isServerError: true}))
    }

    /**
     * updates the Search Prop
     * TODO Rename this to handleSearch as it is an event
     * @param event
     */
    updateSearch = (event) => {
        this.setState({search: event.target.value});
    }

    /**
     * Is used to set the isServerError property to false.
     * This Property defines wether the ServerError Snackbar is shown or not
     * @param e
     */
    handleServerErrorBarClose = (e) => {
        this.setState({
            isServerError: false,

        });
    }
    /**
     * Is used to toggle the isAddRecordDialogActive property to the opposite Boolean value
     *
     */
    toggleAddRecordDialog = () => {
        this.setState({
            isAddRecordDialogActive: !this.state.isAddRecordDialogActive,
        });
    }
    /**
     * Is used to set the isRecordAlreadyExistsError property to false.
     * This Property defines wether the Snackbar, that handles the Record Already Exist Error during Record Creation, is shown or not
     * @param e
     */
    handleRecordAlreadyExistsErrorBarClose=(e)=> {
        this.setState({
            isRecordAlreadyExistsError: false,
        })
    }


    /**
     * Sends a Request to the database to create a new Record
     * @param recordName the name of the new Record
     */
    addRecord = (recordName) => {
        RecordService.addNewRecord(recordName)
            .then(record => {
                let records = [record, ...this.state.records];
                records.sort((a, b) => {
                    return ('' + a.name).localeCompare(b.name);
                });
                this.setState({
                    records: records,
                });
            })
            .catch(error => {
                if (error === "Record already exists") {
                    this.setState({
                        isRecordAlreadyExistsError: true,
                    });
                } else {
                    this.setState({
                        isServerError: true,
                    });
                }
                console.log(error);
            });
    }

    render() {
        let filteredRecords = this.state.records.filter((record) => {
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
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
                <Snackbar open={this.state.isRecordAlreadyExistsError}
                          autoHideDuration={5000}
                          onClose={this.handleRecordAlreadyExistsErrorBarClose}>
                    <Alert severity="error" onClose={this.handleRecordAlreadyExistsErrorBarClose}>
                        There exists already a record with the same name.<br/>
                        Cannot create it again.
                    </Alert>
                </Snackbar>
            </Page>
        );
    }
}
