import React from 'react';
import {FaFilePdf, FaFileWord, FaFolder, FaFolderOpen} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'
import {fileTypes} from "../../assets/Constants";

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);

    }

    /*
     *TODO:
     * - Add more symbols like folder, excel etc.
     */


    render() {
        //TODO: size should ideally be scaled together with text
        let size = '1.5em';
        switch (this.props.type) {
            case fileTypes.PDF:
                return <FaFilePdf size={size}/>;
            case fileTypes.WORD:
                return <FaFileWord size={size}/>;
            case fileTypes.FOLDER:
                if (this.props.active) {
                    return <FaFolderOpen size={size}/>;
                } else {
                    return <FaFolder size={size}/>;
                }
            case fileTypes.NONE:
                return <div/>;
            default:
                return <AiFillFileUnknown size={size}/>;
        }
    }
}
