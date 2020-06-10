"use strict";

import React from 'react';
import styled from "styled-components";


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-direction: column;
    flex-grow: 1; //For Splitview
`;


class AttributeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}

    }


    render() {
        return (
            <Container>
                <div>Attributecontainer</div>
            </Container>
        )
    }

}

export default AttributeContainer
