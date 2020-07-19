"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/record/RecordSymbol";
import styled from "styled-components";
import {Input} from '@material-ui/core';
import {Link} from "../components/Link";
import RecordService from "../services/RecordService";
import {ServerSideErrorSnackBar} from "../components/ServerSideErrorSnackBar";

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
            isServerError: false,
        }


    }

    componentDidMount() {
        this.props.setTitle("File Cabinet");
        RecordService.getAllRecords().then(result => {
            this.setState({records: result.records});
        }).catch((e) => this.setState({isServerError: true}))
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value});
    }

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,

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
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
            </Page>
        );
    }
}
