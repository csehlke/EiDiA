"use strict";

import React from 'react';
import styled from "styled-components";
import {Link} from "../Link";
import RecordSymbol from "../fileCabinet/RecordSymbol";

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
            recentRecords: [
                {
                    name: "BMW",
                    id: 1,
                },
                {
                    name: "Audi",
                    id: 2,
                },
                {
                    name: "Audi",
                    id: 3,
                },
                {
                    name: "Audi",
                    id: 4,
                },
            ],
        }
    }

    render() {
        return (
            <div>
                Recently worked on:
                <FlexRow>
                    {this.state.recentRecords.map(record =>
                        <Link
                            key={record.id}
                            to={"/record/" + record.id}>
                            <RecordSymbol name={record.name}/>
                        </Link>
                    )}
                </FlexRow>
            </div>
        );
    }
}
