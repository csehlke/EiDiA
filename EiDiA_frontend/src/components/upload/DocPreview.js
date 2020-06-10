"use strict";

import React from 'react';
import styled from "styled-components";


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ImageContainer = styled.div
    `
    width: 500px;
    height: 500px;
`;


class DocPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            base64Image: '',
        }


    }

    componentDidMount() {
        const fileArr = Object.values(this.props.picture)
        const firstItem = fileArr[0]
        if (typeof firstItem === 'object' && firstItem !== null) {
            this.readFile(firstItem)
        } else {
            console.log("Picture could not be loaded")
        }

    }

    readFile(file) {

        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            const base64Str = reader.result //Result in base64
            this.setState({
                base64Image: base64Str
            });
        }
        reader.readAsDataURL(file[0]) //read First File


    }


    render() {
        return (
            <Container>
                <h4>Image Preview:</h4>
                <ImageContainer>
                    <img src={this.state.base64Image} style={{maxWidth:"100%", maxHeight:"100%", border:"5px solid #555"}} alt="Uploaded Image"/>
                </ImageContainer>
            </Container>
        )
    }

}

export default DocPreview
