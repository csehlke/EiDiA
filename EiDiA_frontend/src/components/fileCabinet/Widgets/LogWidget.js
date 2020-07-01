import React from 'react';
import {PreferredBreakSpan, TealName} from "../../StyleElements";


/**
 * TODO:
 *
 */

/*
 *Reason for no use of inheritance
 * https://reactjs.org/docs/composition-vs-inheritance.html#so-what-about-inheritance
 */
export class LogWidget extends React.Component {
    constructor(props) {
        super(props);


        props.data.sort(function (a, b) {
            return b.data - a.date
        })
        this.state = {
            logCount: 3,
            sortedLogs: props.data.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })

        }

    }

    logEntry(log) {
        return (
            <p>
                <PreferredBreakSpan><TealName>{log.name}</TealName>&nbsp;{log.action}</PreferredBreakSpan>
                <PreferredBreakSpan>({log.date})</PreferredBreakSpan>
            </p>
        )
    }

    childPart() {


        return (
            <ul>
                {this.state.sortedLogs.slice(0, 3).map((log, index) => <li key={index}>{this.logEntry(log)} </li>)}

            </ul>
        );
    }

    render() {
        return (this.childPart())
    }


}

