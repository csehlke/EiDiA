import React from 'react';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {GraphType} from "../../../assets/Constants";


export class GraphsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributeMapping: props.attributeMapping,
            graphType: props.graphType,
            attributeValues: props.attributeValues,

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                attributeMapping: this.props.attributeMapping,
                graphType: this.props.graphType,
                attributeValues: this.props.attributeValues
            })
        }
    }

    createLineChart(attributeMapping, data) {

        return (
            <LineChart
                data={data}
                margin={{
                    top: 10, right: 60, left: 0, bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                {this.props.dashboardEditingActive ? "" : <Tooltip/>}
                <Legend/>
                {attributeMapping.map((mapping, i) => <Line key={i} type="monotone" dataKey={mapping.displayName}
                                                            stroke={mapping.color}
                                                            activeDot={{r: 8}}/>)}


            </LineChart>

        )
    }

    createBarChart(attributeMapping, data) {
        return (
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                {this.props.dashboardEditingActive ? "" : <Tooltip/>}
                <Legend/>
                {attributeMapping.map((mapping, i) => <Bar key={i} dataKey={mapping.displayName}
                                                           fill={mapping.color}/>)}

            </BarChart>
        )
    }


    createGraph(attributeMapping) {
        let data = this.getData(attributeMapping);
        switch (this.state.graphType) {
            case GraphType.Line:
                return this.createLineChart(attributeMapping, data);
            case GraphType.Bar:
                return this.createBarChart(attributeMapping, data)
            default:
                this.createLineChart(attributeMapping, data)
        }
    }

    getData(attributeMapping) {

        let data = []
        attributeMapping.map(mapping => data.push(
            this.state.attributeValues.filter(attr => attr.attributeId === mapping.attributeId)
                .map(foundAttribute => {
                    let newObject = {
                        tmp: foundAttribute.value,
                        ...foundAttribute
                    }
                    newObject[mapping.displayName] = foundAttribute.value;
                    return newObject
                })
            )
        )

        data = data.reduce((acc, current) => {
            return acc.map(itm => {
                return {...itm, ...current.find((item) => (item.date === itm.date))}
            })

        })
        try {
            data.forEach(
                attr => {
                    attr.date = attr.date.split('T')[0]
                })
        } catch (e) {
            console.error("There is probably an issue while cutting of Date From Time in GraphsWidget. See detailed error below")
            console.error(e)
        }

        return (data.flat())
    }

    render() {

        return (<ResponsiveContainer height="85%">{this.createGraph(this.state.attributeMapping)}</ResponsiveContainer>)
    }

}

