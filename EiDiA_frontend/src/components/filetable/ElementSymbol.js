import React from 'react';
import styled from "styled-components";
import {FaFileWord} from 'react-icons/fa'
import {FaFilePdf} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);
    }

    symbolSelection(type){
        switch(type){
            case 'pdf':
                return <FaFilePdf/>;
            case 'word':
                return <FaFileWord/>;
            default:
                return <AiFillFileUnknown/>;
        }
    }
    render() {
        return (
            this.symbolSelection(this.props.type)
        );
    }
}

