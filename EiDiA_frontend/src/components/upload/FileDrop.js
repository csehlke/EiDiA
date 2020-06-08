"use strict";

import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    flex-grow: 1;
`;

class FileDrop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <Container>

                <div>Hier DragDrop</div>


            </Container>
        )
    }

}

export default FileDrop
