"use strict";

import React from 'react';
import FileTable from "../filetable/FileTable";
import PropTypes from "prop-types";

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

SearchResults.propTypes = {
    table: PropTypes.array.isRequired,
}
