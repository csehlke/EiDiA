"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import FileDrop from "../components/upload/FileDrop";
import TypePicker from "../components/upload/TypePicker";

const SplitView = styled.div` 
    display: flex;
    flex-direction:row;
`;

export class UploadView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            picture: '',
        }

        this.passPicture = this.passPicture.bind(this);
    }

    passPicture(uploadedPicture) { //Callback to be able to hand picture to TypePicker, where it gets passed to DocPreview
        this.setState({
            picture: uploadedPicture
        });
        // console.log("UploadView:")
        // console.log(typeof this.state.picture);
        // console.log(this.state.picture)
    }

    render() {
        return (
            <Page title={"Upload Document"}>
                <SplitView>
                    <FileDrop callbackUploadView={this.passPicture}/>
                    <TypePicker picture={this.state.picture}/>
                </SplitView>
            </Page>
        );
    }
}