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
            attributeValues: this.props.attributeValues,


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
        try {
            if (this.state.attributeValues.length > 0) {
                attributeMapping.map(mapping => data.push(
                    this.state.attributeValues
                        .filter(attr => attr.attributeId === mapping.attributeId)
                        .map((foundAttribute) => {
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
        } catch (e) {
            console.error(e)
            return data;
        }

    }

    render() {

        let data = this.getData(this.state.attributeMapping);
        return (

            <FlexRow>{data.map((attribute, index) => this.createAttribute(attribute, index))}</FlexRow>);
    }


}
