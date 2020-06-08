import React from 'react';
import styled from 'styled-components';

export class RightSidepanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Sidepanel>
                <p>Test</p>
            </Sidepanel>
        )
    }
}

const Sidepanel = styled.div`
    height: 100%;
    width: 160px;
    position: relative;
    z-index: 1;
    top: 50%;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
`