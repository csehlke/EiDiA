"use strict";

import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    flex-grow: 1;
    flex-basis: 50%;
`;

class TypePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <Container>

                <div>Here Typepicker </div>


            </Container>
        )
    }

}

export default TypePicker
