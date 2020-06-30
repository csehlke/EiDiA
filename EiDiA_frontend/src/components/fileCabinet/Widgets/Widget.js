import React from 'react';
import styled from "styled-components";

const Body = styled.div`
     /*width:30%;
     height: auto;
     font-size:3vw;*/
     text-align:center;
     
     border: 2px dotted ${props => props.color};
     grid-row-start:${props => props.positionInfo.y};
     grid-row-end:${props => props.positionInfo.rows};
     grid-column-start:${props => props.positionInfo.x};
     grid-column-end:${props => props.positionInfo.cols};
     

`;
/**
 * TODO:
 *
 */

export class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionInfo: this.props.positionInfo,

            color: "red"


        }

    }



    MainPart() {
        return (
            <Body positionInfo={this.state.positionInfo} color={this.state.color}>
                {/*this.childPart()+*/<div>
                    <p>x/y</p>
                    <p>{this.state.positionInfo.x + "," + this.state.positionInfo.y}</p>
                    <p>Rows/Cols</p>
                    <p>{this.state.positionInfo.rows + "," + this.state.positionInfo.cols}</p>
                </div>}
            </Body>


        )

    }
    childPart(){
        return (<p>No Child Part</p>);
    }
    render() {
        return this.MainPart();
    }
}

