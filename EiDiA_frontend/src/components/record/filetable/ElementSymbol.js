import React from 'react';
import {FaFileImage, FaFilePdf, FaFileWord, FaFolder, FaFolderOpen} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'
import {fileTypes} from "../../../../../constants";
import {IconContext} from "react-icons";

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
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <FaFilePdf size={size}/>
                </IconContext.Provider>
            case fileTypes.WORD:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <FaFileWord size={size}/>
                </IconContext.Provider>
            case fileTypes.FOLDER:
                if (this.props.activeFolder) {
                    return <IconContext.Provider value={{className: 'react-icons'}}>
                        <FaFolderOpen size={size}/>
                    </IconContext.Provider>
                } else {
                    return <IconContext.Provider value={{className: 'react-icons'}}>
                        <FaFolder size={size}/>
                    </IconContext.Provider>
                }
            case fileTypes.NONE:
                return <div/>;
            case fileTypes.IMAGE:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <FaFileImage size={size}/>
                </IconContext.Provider>
            default:
                return <IconContext.Provider value={{className: 'react-icons'}}>
                    <AiFillFileUnknown size={size}/>
                </IconContext.Provider>
        }
    }
}
