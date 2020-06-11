"use strict";

import React from 'react';
import styled from "styled-components";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-direction: column;
    align-items: center;

`;

const ImageContainer = styled.div
    `
    width: 300px;
    height: 300px;
`;


class DocPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            base64Image: '',
            src: null,
            crop: { //set crop state
                unit: "%"
            },
        }

        this.onCropChange = this.onCropChange.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
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
                base64Image: base64Str,
                src: base64Str
            });
        }
        reader.readAsDataURL(file[0]) //read First File


    }

    onImageLoaded(image){
        this.imageRef = image;
    };

    onCropChange(crop) {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({crop});
    };

    onCropComplete(crop){
        this.makeClientCrop(crop);
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }


    render() {
        return (
            <Container>
                <h4>Image Preview:</h4>
                <ImageContainer>
                    <img src={this.state.base64Image}
                         style={{maxWidth: "100%", maxHeight: "100%", border: "5px solid #555"}} alt="Uploaded Image"/>
                </ImageContainer>
                <h4>Crop Image:</h4>
                <ImageContainer>
                    <ReactCrop
                        src={this.state.base64Image}
                        crop={this.state.crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                </ImageContainer>
                <h4>Cropped Image Preview:</h4>
                <ImageContainer>
                <img alt="Crop" style={{ maxWidth: '100%' }} src={this.state.croppedImageUrl} />
                    </ ImageContainer>
            </Container>
        )
    }

}

export default DocPreview
