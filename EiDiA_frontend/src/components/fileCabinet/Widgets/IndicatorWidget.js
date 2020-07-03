import React from 'react';
import {FlexRow, IndicatorElement, TealRight} from "../../StyleElements";


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
    }

    createAttribute(attr, index) {
        return (
            <IndicatorElement elementPercentage={this.state.elementPercentage} key={index}>
                <p>{attr.name}</p>

                <TealRight>{attr.value} </TealRight>
            </IndicatorElement>
        )
    }

    render() {
        return (
            <FlexRow>{this.state.attributes.map((attribute, index) => this.createAttribute(attribute, index))}</FlexRow>);
    }


}

