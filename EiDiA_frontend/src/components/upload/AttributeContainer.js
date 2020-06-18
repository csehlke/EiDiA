"use strict";

import React from 'react';
import styled from "styled-components";

import {createWorker} from 'tesseract.js';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CropIcon from "@material-ui/icons/Crop";
import Grid from "@material-ui/core/Grid";


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
`;

const GridContainer = styled.div
    `
    display: flex;
    height: 50%
`;


class AttributeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            attributes: [
                {name: 'Attr1', id: '1'},
                {name: 'Attr2', id: '2'},
                {name: 'Attr3', id: '3'},
                {name: 'Attr4', id: '4'},
                {name: 'Attr5', id: '5'},
                {name: 'Attr6', id: '6'},
                {name: 'Attr7', id: '7'},
                {name: 'Attr8', id: '8'},
                {name: 'Attr9', id: '9'},
                {name: 'Attr10', id: '10'}
            ],
            attributeData: [
                {}

            ],
            wrk: this.loadWorker(),
            textValue: "",
        }

        this.saveData = this.saveData.bind(this);
        this.findData = this.findData.bind(this);

    }

    componentDidMount() {
        this.props.setTitle("Attribute Picker");
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

    saveData(attrID) {
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))
        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {id: attrID, text: this.state.textValue}]
            });
        } else {
            copyArr.splice(idx, 1, {id: attrID, text: this.state.textValue}) //If ID exists already, overwrite it with new value
            this.setState({
                attributeData: copyArr
            });
        }

    }

    findData(attrID) {
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID)) //find index of ID
        if (idx !== -1) {
            return Object.values(this.state.attributeData)[idx].text // Get text at index
        } else {
            return ""
        }
    }


    handleOnChange(event, attrID) { //Updates attributeData based on user input
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))

        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {id: attrID, text: event.target.value}]
            });
        } else {
            copyArr.splice(idx, 1, {id: attrID, text: event.target.value}) //Overwrite with new value
            this.setState({
                attributeData: copyArr
            });
        }

    }


    renderTextFields(attrName, attrID) {
        return <Grid item xs>
            <TextField
                label={attrName}
                variant="outlined"
                value={this.findData(attrID)}
                onChange={(evt) => this.handleOnChange(evt, attrID)}
                InputProps={{
                    endAdornment: <InputAdornment>
                        <IconButton onClick={() => this.saveData(attrID)}>
                            <CropIcon/>
                        </IconButton>
                    </InputAdornment>
                }}
            />
        </Grid>
    }

    sendFulltextToBackend() { //TODO Send to Backend (OCR IS VERY SLOW) --> Do it on backend?
        const worker = createWorker({
            logger: m => console.log(m)
        });

        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const {data: {text}} = await worker.recognize(this.props.picture[0]);
            console.log(text);
            await worker.terminate();
        })();
    }


    componentDidUpdate(prevProps) {
        if (prevProps.crop !== this.props.crop) { //When new crop gets added
            (async () => {
                const {data: {text}} = await this.state.wrk.recognize(this.props.crop); //Do OCR on crop
                console.log(text);
                this.setState({
                    textValue: text
                });
            })();

        }
    }


    render() {
        return ( // Render TextFields dynamically from state
            <Container>
                <GridContainer>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="flex-end"
                    >
                        {this.state.attributes.map((item) => <div
                            key={item.id}>{this.renderTextFields(item.name, item.id)}</div>)}
                    </Grid>
                </GridContainer>
            </Container>
        )
    }

}

export default AttributeContainer