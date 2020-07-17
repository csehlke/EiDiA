import React from 'react';
import {FlexRow, IndicatorElement, TealRight} from "../../StyleElements";

/**
 * TODO:
 * Add Limit for Titles
 * Add Limit for Attributes
 * - get only newest attribute
 */


export class IndicatorWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributeMapping: props.attributeMapping,
            attributeValues: this.props.attributeValues

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                attributeMapping: this.props.attributeMapping,
                attributeValues: this.props.attributeValues

            })
        }
    }

    createAttribute(attr, index) {
        return (
            <IndicatorElement key={index}>
                <p>{attr.displayName}</p>

                <TealRight>{attr.value} </TealRight>
            </IndicatorElement>
        )
    }


    getData(attributeMapping) {
        let data = [];
        let tmp = this.state.attributeValues;
        if (tmp.length > 0) {
            attributeMapping.map(mapping => data.push(
                tmp
                    .filter(attr => attr.attributeId === mapping.attributeId)

                    .map(function (foundAttribute) {
                            return {
                                displayName: mapping.displayName,
                                value: foundAttribute.value,
                                date: foundAttribute.date
                            }
                        }
                    )
                    .reduce(function (prev, current) {
                        return (prev.date > current.date) ? prev : current
                    })
                )
            )
        }
        return data.flat();
    }

    render() {

        let data = this.getData(this.state.attributeMapping);
        return (

            <FlexRow>{data.map((attribute, index) => this.createAttribute(attribute, index))}</FlexRow>);
    }


}
