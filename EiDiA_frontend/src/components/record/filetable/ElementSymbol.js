import React from 'react';
import {FaFileWord} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'
import {elementIconSize, fileTypes} from "../../../../../constants";
import {MdFolder, MdFolderOpen, MdImage, MdPictureAsPdf} from "react-icons/all";
import {IconContext} from "react-icons";

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        switch (this.props.fileType) {
            case fileTypes.PDF:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <MdPictureAsPdf size={elementIconSize}/>
                </IconContext.Provider>
            case fileTypes.WORD:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <FaFileWord size={elementIconSize}/>
                </IconContext.Provider>
            case fileTypes.FOLDER:
                if (this.props.activeFolder) {
                    return <IconContext.Provider value={{className: 'react-icons'}}>
                        <MdFolderOpen size={elementIconSize}/>
                    </IconContext.Provider>
                } else {
                    return <IconContext.Provider value={{className: 'react-icons'}}>
                        <MdFolder size={elementIconSize}/>
                    </IconContext.Provider>
                }
            case fileTypes.NONE:
                return <div/>;
            case fileTypes.IMAGE:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <MdImage size={elementIconSize}/>
                </IconContext.Provider>
            default:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <AiFillFileUnknown size={elementIconSize}/>
                </IconContext.Provider>
        }
    }
}
