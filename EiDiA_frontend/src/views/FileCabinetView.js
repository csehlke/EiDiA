"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/fileCabinet/RecordSymbol";
import styled from "styled-components";
import {Input} from '@material-ui/core';
import {Link} from "../components/Link";

const FlexRow = styled.div`
    margin: 0 5% 0 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap

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
            records : ["Volkswagen","BMW","Thyssenkrup","Google","Facebook","Microsoft","ABC Company","Adidas","lenovo Limited","IBM","TrueThat","hello","abc","def"],
            search : ''
        }
    }
    componentDidMount() {
        this.props.setTitle("File Cabinet");
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
            <Page title={"File Cabinet"}>
                <div width="80%" style = {{margin: "3% 10% 3% 10%"}}>
                    <Input placeholder="Search Records ..." fullWidth={true}  inputProps={{ 'aria-label': 'description' }} value={this.state.search} onChange={this.updateSearch.bind(this)} />
                </div>


                <FlexRow>
{/*
                    TODO: make Link depending on the records
*/}
                    {filteredRecords.map(record =>  <Link to={"/record"}><RecordSymbol name={record}/></Link>)}
                </FlexRow>
            </Page>
        );
    }
}