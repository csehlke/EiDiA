"use strict";

import React from "react";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import Dropzone from "react-dropzone";
import Snackbar from "@material-ui/core/Snackbar";
import DescriptionIcon from '@material-ui/icons/Description';

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
  min-height: 60vh;
  border: 2px dashed #dadada;
  padding: 30px;
  margin: 8%;
`;

class FileDrop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            wrongFiletype: false,
            open: true //Snackbar ready to be rendered
        };




        this.assignRecord = this.assignRecord.bind(this);
        this.failedUpload = this.failedUpload.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
    }

    onDropAccepted(files){
        this.setState(files)
        this.props.callbackUploadView(files);
        /* See DocPreview

                    const reader = new FileReader()

                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')
                    reader.onload = () => {
                        // Do whatever you want with the file contents
                        const binaryStr = reader.result
                        console.log(binaryStr)
                    }
                    reader.readAsDataURL(files[0]) //read First File
        */
    }

    assignRecord() {
        console.log("Open FilePicker here");
    }

    failedUpload() {
        this.setState({
            wrongFiletype: true, //Condition to show Snackbar
            open: true //Allow Snackbar to open multiple times
        });
    }


    handleClose() {
        //Snackbar-Close
        this.setState({
            open: false,
        });
    }


    render() {
        const wrongFiletype = this.state.wrongFiletype;
        let fileAlert;
        let snackBar;
        if (wrongFiletype) {
            fileAlert = (
                <Alert severity="error" onClose={this.handleClose}>
                    This filetype is not supported! Please upload a .png file
                </Alert>
            );
            snackBar = (
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
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
                    style={{}}
                >
                    {(
                        {getRootProps, getInputProps, isDragActive, isDragReject} //Renderprops
                    ) => (
                        <section className="container">
                            <div {...getRootProps({className: "dropzone"})}>
                                <input {...getInputProps()} />
                                <DropZoneContainer>
                                    <DescriptionIcon style={{fontSize: '200px'}}/>
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
