import React from 'react';
import {PreferredBreakSpan, TealName} from "../../StyleElements";
import {logCount} from "../../../../../constants";


//TODO: somehow when something on dashboard changes this doesnt update immeadietly

export class LogWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
        return (
            <p>
                <PreferredBreakSpan><TealName>{log.user}</TealName>&nbsp;{log.action}&nbsp;</PreferredBreakSpan>
                <PreferredBreakSpan>({log.date})</PreferredBreakSpan>
            </p>
        )
    }


    render() {
        return (
            <ul>
                {this.state.logs.slice(0, logCount).map((log, index) => <li
                    key={index}>{this.logEntry(log)} </li>)}

            </ul>
        )
    }


}

