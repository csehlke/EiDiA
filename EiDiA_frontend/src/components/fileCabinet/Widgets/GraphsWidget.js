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
import {Attributes, GraphType} from "../../Constants";

/**
 * TODO:
 *
 */


export class GraphsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributeMapping: props.attributeMapping,
            type: GraphType.Bar

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
                <Tooltip/>
                <Legend/>
                {attributeMapping.map((mapping, i) => <Line key={i} type="monotone" dataKey={mapping.name}
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
                <Tooltip/>
                <Legend/>
                {attributeMapping.map((mapping, i) => <Bar key={i} dataKey={mapping.name} fill={mapping.color}/>)}

            </BarChart>
        )
    }

    //TODO Pie chart attribute mapping especially
    createPieChart() {
        return (
            <PieChart>
                <Pie data={this.props.data} dataKey="value" nameKey="date" cx="50%" cy="50%" fill="#8884d8" label/>
            </PieChart>
        )
    }

    createGraph(attributeMapping) {
        let data = this.getData(attributeMapping);
        switch (this.state.type) {
            case GraphType.line:
                return this.createLineChart(attributeMapping, data);
            case GraphType.Bar:
                return this.createBarChart(attributeMapping, data)
        }

        return (
            this.createLineChart(attributeMapping, data)
        )
    }

    getData(attributeMapping) {
        let data = []


        let tmp = JSON.parse(JSON.stringify(Attributes));


        attributeMapping.map(mapping => data.push(
            tmp
                .filter(attr => attr.attrId === mapping.attrId)
                .map(foundAttribute => {
                    foundAttribute[mapping.name] = foundAttribute.value;
                    return foundAttribute
                })
            )
        )
        //Taken from https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key
        const mergeByDate = (a1, a2) =>
            a1.map(itm => Object.assign(itm, a2.find((item) => (item.date === itm.date)))
            );
        /*
         *TODO: Do this for multiple attributes not only two
         * - check wether datapoints where left out
         */
        data = mergeByDate(data[0], data[1]);

        return (data)
    }

    render() {

        return (<ResponsiveContainer height="95%">{this.createGraph(this.state.attributeMapping)}</ResponsiveContainer>)
    }

}

