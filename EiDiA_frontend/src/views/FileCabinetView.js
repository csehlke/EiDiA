"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/record/RecordSymbol";
import styled from "styled-components";
import {Input} from '@material-ui/core';
import {Link} from "../components/Link";

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
     * - add getRecordFromDatabase functionality
     * - add Pages if too many records
     * - add Add Button
     */
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
            return record.indexOf(this.state.search) !== -1;
        });

        return (
            <Page title={"File Cabinet"}>
                <SearchBar>
                    <Input
                        placeholder="Search Records ..."
                        fullWidth={true}
                        value={this.state.search}
                        onChange={this.updateSearch}/>
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
            </Page>
        );
    }
}
