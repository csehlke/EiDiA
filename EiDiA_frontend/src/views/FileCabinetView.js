"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordSymbol} from "../components/fileCabinet/RecordSymbol";

export class FileCabinetView extends React.Component {

    /*
     *TODO:
     * - add getRecordFromDatabase functionality
     * -
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            records : ["test","hello","abc","def"],
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
            <Page title={"Welcome"}>
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                <ol>
                    {filteredRecords.map(record => <li>{record}</li>)}
                </ol>
                <RecordSymbol name="BMWs"/>

            </Page>
        );
    }
}