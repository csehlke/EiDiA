import React from 'react';
import styled from "styled-components";
import {Widget} from "./Widgets/Widget";
import {Widgets} from "../Constants";


const Grid = styled.div`
    height: 50vh;
    margin: 0 5% 0 5%;
    
    text-align:center;
    vertical-align:middle;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    
    

`;


export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: Widgets

        }
    }

    render() {
        return (
            <Grid>

                {this.state.widgets.map((widget) => <Widget positionInfo={widget.positionInfo}/>)}

            </Grid>
            /* <div>
                 <FlexRow>
                     <Widget></Widget>
                     <Widget></Widget>
                     <Widget></Widget>

                 </FlexRow>
                 <FlexRow>
                     <LogWidget >
                         <p>Dashboard</p>
                     </LogWidget>
                     <LogWidget>
                         <p>Dashboard</p>
                     </LogWidget>
                     <LogWidget>
                         <p>Dashboard</p>
                     </LogWidget>
                 </FlexRow>


             </div>*/
        );
    }
}

