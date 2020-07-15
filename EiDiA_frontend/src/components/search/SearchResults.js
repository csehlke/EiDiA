"use strict";

import React from 'react';
import FileExplorer from "../record/FileExplorer";
import PropTypes from "prop-types";

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

SearchResults.propTypes = {
    table: PropTypes.array.isRequired,
}
