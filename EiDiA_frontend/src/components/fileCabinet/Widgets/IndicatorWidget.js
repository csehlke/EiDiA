import React from 'react';
import {FlexRow, IndicatorElement, TealRight} from "../../StyleElements";
import {Attributes} from "../../../assets/Constants";

/**
 * TODO:
 * Add Limit for Titles
 * Add Limit for Attributes
 */


export class IndicatorWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributeMapping: props.attributeMapping,
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


    getData(attributeMapping) {
        let data = [];
        let tmp = JSON.parse(JSON.stringify(Attributes));

        attributeMapping.map(mapping => data.push(
            tmp
                .filter(attr => attr.attrId === mapping.attrId)
                .map(foundAttribute => {
                    foundAttribute['name'] = mapping.name;
                    return foundAttribute
                })
            )
        )
        return data.flat();
    }
    render() {
        let data = this.getData(this.state.attributeMapping);
        return (
            <FlexRow>{data.map((attribute, index) => this.createAttribute(attribute, index))}</FlexRow>);
    }


}

