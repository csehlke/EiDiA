"use strict";

import React from 'react';
import styled from "styled-components";
import {RecordSymbol} from "../record/RecordSymbol";
import RecordService from "../../services/RecordService";
import IconButton from "@material-ui/core/IconButton";

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default class RecentFiles extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recentRecords: [],
            selectedRecord: ''
        }
    }

    componentDidMount() {
        RecordService.getRecentRecords().then(result => {
            console.log(result)
            this.setState({
                recentRecords: result.records
            });
        })
    }

    handleRecordClick(record) {
        this.setState({
            selectedRecord: record
        });
    }


    render() {
        return (
            <div>
                Recently worked on:
                <FlexRow>
                    {this.state.recentRecords.map((record, i) =>
                        <IconButton onClick={() => this.handleRecordClick(record)}
                                    key={i}
                                    size={"small"}
                                    disableRipple>
                            <RecordSymbol name={record.recordName}/>
                        </IconButton>
                    )}
                </FlexRow>
            </div>
        );
    }
}
