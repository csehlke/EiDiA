import React from 'react';
import {FaFilePdf, FaFileWord} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);
    }
    /*
     *TODO:
     * - Add more symbols like folder, excel etc.
     */
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

