"use strict";

import React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";

const Container = styled.div`
    flex-grow: 1;
`;

class FileDrop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    assignRecord() {
        console.log("Open FilePicker here");
    }

    render() {
        return (
            <Container>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.assignRecord}
                        style={{width: '20%', margin: '0.5em'}}>
                        Assign to Record
                    </Button>
                </div>
            </Container>
        )
    }

}

export default FileDrop
