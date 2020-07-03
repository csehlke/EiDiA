import React from 'react';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

/**
 * TODO:
 *
 */


export class GraphsWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    createLineChart() {
        return (
            <LineChart
                cx={this.props.width / 2}
                data={this.props.data}
                margin={{
                    top: 10, right: 60, left: 0, bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>

            </LineChart>

        )
    }

    createBarChart() {
        return (
            <BarChart data={this.props.data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="value" fill="#8884d8"/>
            </BarChart>
        )
    }

    createPieChart() {
        return (
            <PieChart>
                <Pie data={this.props.data} dataKey="value" nameKey="date" cx="50%" cy="50%" fill="#8884d8" label/>
            </PieChart>
        )
    }

    createGraph() {
        return (
            this.createPieChart()
        )
    }

    render() {
        return (<ResponsiveContainer height="95%">{this.createGraph()}</ResponsiveContainer>)
    }

}

