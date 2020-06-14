"use strict";

import React from 'react';
import styled from "styled-components";


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-basis: 50%
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
