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
    flex-basis: 50%;
    justify-content: center;
`;

const ImageContainer = styled.div`
    object-fit: cover;
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
        const fileArr = Object.values(this.props.picture) //Picture from Uploadview
        if (typeof fileArr === 'object' && fileArr !== null) {
            this.readFile(fileArr)
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
            this.props.sendB64Image(base64Str) //send to UploadView
        }
        reader.readAsDataURL(file[0]) //read First File
    }

    onImageLoaded(image) {
        this.imageRef = image;
    };

    onCropChange(crop) {
        this.setState({crop});
    };

    onCropComplete(crop) {
        this.makeClientCrop(crop);
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImage = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.props.callbackUploadView(croppedImage); //Callback to UploadView getCropBlob()
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
                <ImageContainer>
                    <ReactCrop
                        src={this.state.base64Image}
                        crop={this.state.crop}
                        ruleOfThirds
                        disabled={this.props.cropDisabled}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}/>
                </ImageContainer>
            </Container>
        )
    }
}

export default DocPreview
