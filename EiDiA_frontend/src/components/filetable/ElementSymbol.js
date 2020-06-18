import React from 'react';
import {FaFilePdf, FaFileWord, FaFolder, FaFolderOpen} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'
import {fileTypes} from "../Constants";

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);
    }

    /*
     *TODO:
     * - Add more symbols like folder, excel etc.
     */
    symbolSelection(type) {
        switch (type) {
            case fileTypes.PDF:
                return <FaFilePdf/>;
            case fileTypes.WORD:
                return <FaFileWord/>;
            case fileTypes.FOLDER:
                if (this.props.active) return <FaFolderOpen/>;
                else return <FaFolder/>;

            case fileTypes.NONE:
                return <div/>
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

