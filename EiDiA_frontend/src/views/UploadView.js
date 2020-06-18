"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import FileDrop from "../components/upload/FileDrop";
import TypePicker from "../components/upload/TypePicker";
import DocPreview from "../components/upload/DocPreview";
import AttributeContainer from "../components/upload/AttributeContainer";

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
            nextPressed: false, //Next-button
            pageTitle: ""
        }

        this.passPicture = this.passPicture.bind(this);
        this.getDocumentTypeId = this.getDocumentTypeId.bind(this);
        this.getCropBlob = this.getCropBlob.bind(this);

        this.props.setTitle("Upload Document");
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

    getDocumentTypeId(documentTypeId) { //Callback to be able get Document Type + Assigned Record
        this.setState({
            documentTypeId: documentTypeId,
            nextPressed: true
            //assignedRecord:

            //TODO Add Assigned record
        });

    }

    getCropBlob(crop) { //Callback to be able to hand cropped Image Attributecontainer
        this.setState({
            cropBlob: crop
        });
    }

    render() {

        if (!this.state.isUploaded && !this.state.nextPressed) { //Standard
            return <Page>
                <SplitView>
                    <FileDrop callbackUploadView={this.passPicture} cropDisabled={true}/>
                    <TypePicker />
                </SplitView>
            </Page>

        } else if (this.state.isUploaded && !this.state.nextPressed) { //If picture has been dropped but no Document Type picked
            return <Page>
                <SplitView>
                    <DocPreview picture={this.state.picture}
                                cropDisabled={true} /* Picture from FileDrop, disable crop for preview */ />
                    <TypePicker
                        callbackUploadView={this.getDocumentTypeId}  /* Get ID to fill Attributecontainer fields *//>
                </SplitView>
            </Page>
        } else if (this.state.isUploaded && this.state.nextPressed) {
            return <Page>
                <SplitView>
                    <DocPreview picture={this.state.picture} cropDisabled={false} callbackUploadView={this.getCropBlob} />
                    <AttributeContainer picture={this.state.picture} crop={this.state.cropBlob} title={this.state.pageTitle}
                                        setTitle={(newTitle) => this.handlePageTitleChange(newTitle)} />
                </SplitView>
            </Page>
        } else {
            return <p> Something went wrong </p>
        }


    }
}