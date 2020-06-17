"use strict";

import React from 'react';
import styled from "styled-components";

import {createWorker} from 'tesseract.js';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CropIcon from "@material-ui/icons/Crop";
import FormControl from "@material-ui/core/FormControl";


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-basis: 50%
`;


class AttributeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            attributes: [
                {name: 'Attr1', id: '1'},
                {name: 'Attr2', id: '2'},
                {name: 'Attr3', id: '3'}
            ],
            wrk: this.loadWorker(),
            textValue: "",
        }

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


    componentDidMount() {
    }

    renderTextFields(attrName, attrID) {
        return <TextField
            label={attrName}
            variant="outlined"
            value={this.state.textValue}
            //onChange={}
            //inputRef={}
            //onBlur={}
            InputProps={{
                endAdornment: <InputAdornment>
                    <IconButton /*onClick={}*/>
                        <CropIcon/>
                    </IconButton>
                </InputAdornment>
            }}
        />
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
                <FormControl>
                    {this.state.attributes.map((item) => <div key={item.id}>{this.renderTextFields(item.name, item.id)}</div>)}
                </FormControl>
            </Container>
        )
    }

}

export default AttributeContainer
