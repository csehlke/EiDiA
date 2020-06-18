"use strict";

import React from 'react';
import FileTable from "../filetable/Element";

export default class SearchResults extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Search Results</h3>
                <FileTable/>
            </div>
        );
    }
}
