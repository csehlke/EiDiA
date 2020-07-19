"use strict";

import React from "react";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import Dropzone from "react-dropzone";
import Snackbar from "@material-ui/core/Snackbar";
import {MdCloudUpload} from "react-icons/all";
import {IconContext} from "react-icons";

const Container = styled.div`
  // Outer Container
  flex-grow: 1; // For SplitView
  flex-basis: 50%;
`;

const DropZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-height: calc(100vh - 16em);
  min-height: calc(100vh - 16em);
  border: 2px dashed #dadada;
  padding: 30px;
  margin: 3em;
`;

class FileDrop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            wrongFiletype: false,
            snackbarOpen: true //Snackbar ready to be rendered
        };

        this.assignRecord = this.assignRecord.bind(this);
        this.failedUpload = this.failedUpload.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
    }

    onDropAccepted(files) {
        this.setState(files);
        this.props.callbackUploadView(files);
    }

    assignRecord() {
        console.log("Open FilePicker here");
    }

    failedUpload() {
        this.setState({
            wrongFiletype: true, //Condition to show Snackbar
            snackbarOpen: true //Allow Snackbar to open multiple times
        });
    }

    handleSnackbarClose() {
        //Snackbar-Close
        this.setState({
            snackbarOpen: false,
        });
    }

    render() {
        let fileAlert;
        let snackBar;
        if (this.state.wrongFiletype) {
            fileAlert = (
                <Alert severity="error" onClose={this.handleSnackbarClose}>
                    This file type is not supported! Please upload a *.png file.
                </Alert>
            );
            snackBar = (
                <Snackbar
                    open={this.state.snackbarOpen}
                    autoHideDuration={5000}
                    onClose={this.handleSnackbarClose}>
                    {fileAlert}
                </Snackbar>
            );
        }

        return (
            <Container>
                <Dropzone
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.failedUpload}
                    accept="image/png"
                    multiple={false}
                    style={{}}>
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => ( //Renderprops
                        <section className="container">
                            <div {...getRootProps({className: "dropzone"})}>
                                <input {...getInputProps()} />
                                <DropZoneContainer>
                                    <IconContext.Provider value={{className: 'react-icons'}}>
                                        <MdCloudUpload style={{fontSize: '20vw'}}/>
                                    </IconContext.Provider>
                                    <p>
                                        {!isDragActive && "Click here or drag a file to upload!"}
                                        {isDragActive && !isDragReject && "Drop your file here"}
                                        {isDragReject &&
                                        "File type not accepted, please upload a .png file!"}
                                    </p>
                                </DropZoneContainer>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {snackBar}
            </Container>
        );
    }
}

export default FileDrop;
