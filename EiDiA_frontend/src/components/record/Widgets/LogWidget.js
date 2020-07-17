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
        this.state = {
            logCount: 5,
            sortedLogs: props.logs.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            }),
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


    render() {
        return (
            <ul>
                {this.state.sortedLogs.slice(0, this.state.logCount).map((log, index) => <li
                    key={index}>{this.logEntry(log)} </li>)}

            </ul>
        )
    }


}

