"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/fileCabinet/RecordSymbol";
import styled from "styled-components";
import { Input } from '@material-ui/core';
import {RecordMenue} from "../components/fileCabinet/RecordMenue";
import {FileExplorer} from "../components/fileCabinet/FileExplorer";


const FlexRow = styled.div`
    margin: 0 5% 0 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap

`;

export class RecordView extends React.Component {

    /*
     *TODO:
     * - add getRecordFromDatabase functionality
     * - add Pages if too many records
     * - add Add Button
     */
    constructor(props) {
        super(props);
        this.state = {
            records : ["Volkswagen","BMW","Thyssenkrup","Google","Facebook","Microsoft","ABC Company","Adidas","lenovo Limited","IBM","TrueThat","hello","abc","def"],
            search : ''
        }
    }
    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    render() {
        let filteredRecords = this.state.records.filter(
            (record) => {
                return record.indexOf(this.state.search) !== -1;
            }
        );

        return (
            <Page title={"Record"}>
                <RecordMenue/>
                <div>
                    <FileExplorer/>
                </div>
            </Page>
        );
    }
}