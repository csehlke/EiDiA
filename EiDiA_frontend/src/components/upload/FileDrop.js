"use strict";

import React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'
import Dropzone from 'react-dropzone'

const Container = styled.div` // Outer Container
    flex-grow: 1; // For SplitView
    flex-basis: 50%;
`;


const DropZoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 400px;
  border: 2px dashed #DADADA;
  padding: 30px;
  margin: 8%;

`

const SelectContainer = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`


const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

class FileDrop extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            files: [],
            wrongFiletype: false
        };

        this.onDrop = (files) => { //Executed when drop
            this.setState({files})

        };

        this.assignRecord = this.assignRecord.bind(this);
        this.failedUpload = this.failedUpload.bind(this);

    }



    assignRecord() {
        console.log("Open FilePicker here");

    }

    failedUpload() {
        this.setState({
            wrongFiletype: true //For Alert Message
        });


    }


    render() {

        const files = this.state.files.map(file => ( //loop files
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        const wrongFiletype= this.state.wrongFiletype;
        let fileAlert;
        if(wrongFiletype){
            fileAlert = <Alert severity="error">This filetype is not supported! Please upload a .png file</Alert>
        }


        return (

            <Container>

                <Dropzone onDrop={this.onDrop}
                          onDropRejected={this.failedUpload}
                          accept="image/png"
                          multiple={false}
                          style={{}}
                >

                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => ( //Renderprops
                        <section className="container">
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <DropZoneContainer>
                                    {!isDragActive && 'Click here or drag a file to upload!'}
                                    {isDragActive && !isDragReject && "Drop your file here"}
                                    {isDragReject && "File type not accepted, please upload a .png file!"}
                                </DropZoneContainer>
                            </div>
                            <aside>
                                <SelectContainer>
                                    Selected File:
                                    <ul>{files}</ul>
                                </SelectContainer>
                            </aside>
                        </section>
                    )}
                </Dropzone>
                <ButtonContainer>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.assignRecord}
                        style={{display: "flex", width: '20%', margin: '0.5em', justifyContent: "center"}}> {/* MUI Theming */}
                        Assign to Record
                    </Button>
                </ButtonContainer>
                {fileAlert}
            </Container>
        )
    }

}

export default FileDrop
