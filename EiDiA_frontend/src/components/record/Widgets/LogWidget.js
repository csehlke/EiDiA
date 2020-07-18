import React from 'react';
import {PreferredBreakSpan, TealName} from "../../StyleElements";


/**
 * TODO:
 * Extract logCount to Constants (or better config file) and add it also to backend
 * Logs are currently first loaded after reload of dashboard
 */


export class LogWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logCount: 5,
            logs: this.props.logs,
            sortedLogs: props.logs.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            }),
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                logs: this.props.logs,

            })
        }
    }

    logEntry(log) {
        let reg = /[.].*/
        return (
            <p>
                <PreferredBreakSpan><TealName>{log.user}</TealName>&nbsp;{log.action}</PreferredBreakSpan>
                <PreferredBreakSpan>({log.date.replace('T', " ").replace(reg, "")})</PreferredBreakSpan>
            </p>
        )
    }


    render() {
        return (
            <ul>
                {this.state.logs.slice(0, this.state.logCount).map((log, index) => <li
                    key={index}>{this.logEntry(log)} </li>)}

            </ul>
        )
    }


}

