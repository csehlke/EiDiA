"use strict";

import React from 'react';
import styled from "styled-components";

// import { createWorker } from 'tesseract.js';
// <script src='https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js'></script>


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

        this.state = {

        }


    }




    componentDidUpdate(prevProps) { //WHen new crop gets added


        //Handle OCR here
         console.log(this.props.crop)


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
