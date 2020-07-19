import React from 'react';
import {FaFileWord} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'
import {elementIconSize, fileTypes} from "../../../../../constants";
import {MdFolder, MdFolderOpen, MdImage, MdPictureAsPdf} from "react-icons/md/index";

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        //TODO: size should ideally be scaled together with text
        switch (this.props.fileType) {
            case fileTypes.PDF:
                return <MdPictureAsPdf size={elementIconSize}/>;
            case fileTypes.WORD:
                return <FaFileWord size={elementIconSize}/>;
            case fileTypes.FOLDER:
                if (this.props.activeFolder) {
                    return <MdFolderOpen size={elementIconSize}/>;
                } else {
                    return <MdFolder size={elementIconSize}/>;
                }
            case fileTypes.NONE:
                return <div/>;
            case fileTypes.IMAGE:
                return <MdImage size={elementIconSize}/>;
            default:
                return <AiFillFileUnknown size={elementIconSize}/>;
        }
    }
}
