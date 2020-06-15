"use strict";

import React from 'react';
import styled from "styled-components";

import {createWorker} from 'tesseract.js';


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
            wrk: this.loadWorker()
        }


    }


    loadWorker() { //Initialize Worker only once an reuse it, to save startup time
        const worker = createWorker({
            logger: m => console.log(m)
        });

        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');

            //await worker.terminate(); Do not terminate worker so it can be reused
        })();
        return worker
    }


    componentDidMount() {

    }


    componentDidUpdate(prevProps) { //When new crop gets added
        (async () => {
            const {data: {text}} = await this.state.wrk.recognize(this.props.crop); //Do OCR on crop
            console.log(text);
        })();
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
