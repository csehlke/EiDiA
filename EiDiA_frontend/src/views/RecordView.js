"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import {RecordMenue} from "../components/fileCabinet/RecordMenue";
import FileExplorer from "../components/fileCabinet/FileExplorer";
import {Dashboard} from "../components/fileCabinet/Dashboard";
import {recordMenueOptions} from "../components/Constants";


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
            search : '',
            currentPage: recordMenueOptions.DASHBOARD

        }
    }
    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }
    changePage(option){
        this.state.currentPage=option;
        this.setState(this.state);
    }
    render() {
        let filteredRecords = this.state.records.filter(
            (record) => {
                return record.indexOf(this.state.search) !== -1;
            }
        );
        let toShow =recordMenueOptions.DASHBOARD;

        switch (this.state.currentPage){
            case recordMenueOptions.DASHBOARD:
                toShow = <Dashboard/>;
                break;
            case recordMenueOptions.FILEEXPLORER:
                toShow =<FileExplorer/>;
                break;
            default:
                toShow = <Dashboard/>;
                break;
        }

        return (
            <Page title={"Record"}>
                <RecordMenue handle={(option)=>this.changePage(option)} />
                <div>
                    {toShow}
                </div>
            </Page>
        );
    }
}