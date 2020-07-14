"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/record/RecordSymbol";
import styled from "styled-components";
import {Input} from '@material-ui/core';
import {Link} from "../components/Link";
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
        }
        RecordService.getAllRecords().then(result => {
            this.setState({records: result.records});
            console.log(this.state.records)
        })

    }

    componentDidMount() {
        this.props.setTitle("File Cabinet");
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value});
    }

    render() {

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
            </Page>
        );
    }
}
