import React from 'react';
import {H2WithOutMargin, WidgetWrapper} from "../../StyleElements";

/**
 * TODO:
 *
 */

/*
 *Reason for no use of inheritance
 * https://reactjs.org/docs/composition-vs-inheritance.html#so-what-about-inheritance
 */
export class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionInfo: this.props.positionInfo,
            color: "#8C8C8C",
            height: (this.props.positionInfo.rows == 1 ? 35 : (35 * 2 + 2))
        }

    }



    MainPart() {
        return (
            <WidgetWrapper height={this.state.height} positionInfo={this.state.positionInfo} color={this.state.color}>
                <H2WithOutMargin> {this.props.title} </H2WithOutMargin>
                {this.props.children}
            </WidgetWrapper>


        )

    }

    childPart(){
        return (<p>No Child Part</p>);
    }
    render() {
        return this.MainPart();
    }
}

