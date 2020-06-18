import React from 'react';
import {FaFilePdf, FaFileWord} from 'react-icons/fa'
import {AiFillFileUnknown} from 'react-icons/ai'

const IconSize = '1.5em';

export class ElementSymbol extends React.Component {
    constructor(props) {
        super(props);
    }
    /*
     *TODO:
     * - Add more symbols like folder, excel etc.
     */
    symbolSelection(type){
        switch (type) {
            case 'PDF':
                return <FaFilePdf size={IconSize}/>;
            case 'WORD':
                return <FaFileWord size={IconSize}/>;
            case 'HEADING':
                return <div/>;
            default:
                return <AiFillFileUnknown size={IconSize}/>;
        }
    }

    render() {
        return (
            this.symbolSelection(this.props.type)
        );
    }
}
