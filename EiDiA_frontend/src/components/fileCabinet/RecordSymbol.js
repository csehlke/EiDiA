"use strict";

import React from 'react';


export class RecordSymbol extends React.Component {


    /*
     *TODO:
     * - add getRecordFromDatabase functionality
     * -
     *
     */
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <i className="material-icons md-48">folder</i>
                <h1> {this.props.name}</h1>
            </div> )

    }
}