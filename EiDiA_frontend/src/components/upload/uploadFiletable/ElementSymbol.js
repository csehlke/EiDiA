import React from 'react';
import {FaFolderOpen} from 'react-icons/fa'

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
        return <FaFolderOpen size={size}/>;
        }
}
