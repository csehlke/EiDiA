"use strict";

import React from 'react';
import FileExplorer from "../record/FileExplorer";

export default class SearchResults extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Search Results</h3>
                <FileExplorer/>
            </div>
        );
    }
}
