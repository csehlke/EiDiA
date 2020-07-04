"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import FileDrop from "../components/upload/FileDrop";
import TypePicker from "../components/upload/TypePicker";
import DocPreview from "../components/upload/DocPreview";
import AttributeContainer from "../components/upload/AttributeContainer";
import {createWorker} from 'tesseract.js';

const SplitView = styled.div` 
    display: flex;
    flex-direction:row;
`;


export class UploadView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            picture: '',
            isUploaded: false, //if picture has not been dropped yet
            isNextPressed: false, //Next-button
            pageTitle: '',
            ocrProgress: '',
            ocrWorker: this.loadWorker(), // Worker already initializes in UploadView to save startup time in AttributeContainer
            selectedDocumentTypeId: '',
            documentName: ''
        }

        this.passPicture = this.passPicture.bind(this);
        this.getTypePickerData = this.getTypePickerData.bind(this);
        this.getCropBlob = this.getCropBlob.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Upload Document");
    }

    handlePageTitleChange(newTitle) {
        this.props.setTitle(newTitle)
    }

    passPicture(uploadedPicture) { //Callback to be able to hand picture to DocPreview
        this.setState({
            picture: uploadedPicture,
            isUploaded: true
        });
    }


    getTypePickerData(documentTypeId, documentName) { //Callback to be able get Document Type + Assigned Record + Document name
        this.setState({
            selectedDocumentTypeId: documentTypeId,
            documentName: documentName,
            isNextPressed: true
            //assignedRecord:

            //TODO Add Assigned record
        });
    }

    getCropBlob(crop) { //Callback to be able to hand cropped Image Attributecontainer
        this.setState({
            cropBlob: crop
        });
    }

    loadWorker() { //Initialize Worker only once an reuse it, to save startup time
        const that = this
        const worker = createWorker({
            logger(m) {
                if (m.status === "recognizing text") {
                    that.setState({
                        ocrProgress: m.progress
                    })
                }
            }
        });


        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            //await worker.terminate(); Do not terminate worker so it can be reused
        })();
        return worker;
    }

    render() {
        if (!this.state.isUploaded && !this.state.isNextPressed) { //Standard
            return (
                <Page>
                    <SplitView>
                        <FileDrop callbackUploadView={this.passPicture}
                                  cropDisabled={true}/>
                        <TypePicker/>
                    </SplitView>
                </Page>
            );
        } else if (this.state.isUploaded && !this.state.isNextPressed) { //If picture has been dropped but no Document Type picked
            return (
                <Page>
                    <SplitView>
                            <DocPreview picture={this.state.picture}
                                        cropDisabled={true} /* Picture from FileDrop, disable crop for preview */ />
                        <TypePicker
                            callbackUploadView={this.getTypePickerData}
                            picUploaded={this.state.isUploaded} /* Get ID to fill Attributecontainer fields *//>
                    </SplitView>
                </Page>
            );
        } else if (this.state.isUploaded && this.state.isNextPressed) {
            return (
                <Page>
                    <SplitView>
                            <DocPreview picture={this.state.picture}
                                        cropDisabled={false}
                                        callbackUploadView={this.getCropBlob}
                                        ocrProgress={this.state.ocrProgress}/>
                        <AttributeContainer picture={this.state.picture}
                                            crop={this.state.cropBlob}
                                            title={this.state.pageTitle}
                                            documentName={this.state.documentName}
                                            setTitle={(newTitle) => this.handlePageTitleChange(newTitle)}
                                            ocrWorker={this.state.ocrWorker}
                                            selectedDocumentTypeId={this.state.selectedDocumentTypeId}/>
                    </SplitView>
                </Page>
            );
        } else {
            return (
                <p> Something went wrong </p>
            );
        }
    }
}
