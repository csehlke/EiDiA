import React from 'react';
import {Centering, FoggyDiv, H2WithOutMargin, WidgetWrapper} from "../../StyleElements";
import {FiEdit2} from "react-icons/fi";
import Fab from "@material-ui/core/Fab";

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
            height: (this.props.positionInfo.rows === 1 ? 33 : (33 * 2 + 2))
        }

    }



    MainPart() {
        return (
            <WidgetWrapper edit={this.props.edit} height={this.state.height} positionInfo={this.state.positionInfo}
                           color={this.state.color}>

                {this.props.edit ? <Centering><Fab color="#1CA6A6" aria-label="edit">
                    {/*<EditIcon />*/}
                    <FiEdit2 size={32}/>
                </Fab></Centering> : ""}

                <FoggyDiv edit={this.props.edit}>
                    <H2WithOutMargin> {this.props.title} </H2WithOutMargin>
                    {this.props.children}
                </FoggyDiv>
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

