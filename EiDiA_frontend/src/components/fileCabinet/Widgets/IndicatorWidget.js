import React from 'react';
import {Flex, Table, TealRight} from "../../StyleElements";


/**
 * TODO:
 * Add Limit for Titles
 * Add Limit for Attributes
 */


export class IndicatorWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: props.data.sort(function (a, b) {
                return a.attributeNo - b.attributeNo
            }),
            elementPercentage: 100 / (props.positionInfo.cols * 2)
        }
        console.log(this.state.elementPercentage)

    }

    createAttribute(attr, index) {
        return (
            <Table elementPercentage={this.state.elementPercentage} key={index}>
                <p>{attr.name}</p>

                <TealRight>{attr.value} </TealRight>
            </Table>
        )
    }

    render() {
        return (<Flex>{this.state.attributes.map((attribute, index) => this.createAttribute(attribute, index))}</Flex>);
    }


}

