import React from 'react';
import styled from "styled-components";
import {Widget} from "./Widgets/Widget";
import {LogWidget} from "./Widgets/Log";
import {logs,WidgetTypes} from "../Constants";

const FlexRow = styled.div`
    height: 50vh;
    margin: 0 5% 0 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
    padding: 50%;
    text-align:center;
    vertical-align:middle;
    
    

`;



export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <div>
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


            </div>
        );
    }
}

