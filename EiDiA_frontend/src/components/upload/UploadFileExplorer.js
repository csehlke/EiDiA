import React from 'react';
import Element from './uploadFiletable/Element'
import {databaseEntriesPlaceholder, fileTypes} from "../../assets/Constants";
import Grid from "@material-ui/core/Grid";

/**
 * TODO:
 * - Cant drag files to toplevel at the moment
 * - Design DnD operations
 */
export default class UploadFileExplorer extends React.Component {

    constructor(props) {
        super(props);

        let onlyFolders = []; // Does not contain elements other than folders
        databaseEntriesPlaceholder.forEach(function (element) {
            if (element.type === fileTypes.FOLDER) {
                element.activeFolder = true  // show all folders opened
                onlyFolders.push(element)
            }

        });
        this.state = {
            elements: onlyFolders
        }
    }

    componentDidMount() {
        //TODO get all elements based on this.props.recordId
    }

    setNewParent = (child) => (newParentId) => {
        child.parentId = newParentId;

        this.setState(this.state);
    }
    onFolderClicked = (element) => () => {
        this.props.sendFolder(element) // --> Current selected Folder to Dialog

        this.setState(this.state);
    }

    renderElement(element, index, level) {
        return ([
                <Grid key={index} item xs={12}>
                    <Element
                        level={level}
                        elementData={element}
                        handleDrop={this.setNewParent(element)}
                        onFolderClicked={this.onFolderClicked(element)}>
                    </Element>
                </Grid>
                ,
                element.activeFolder === true ?
                    this.state.elements.map((child, indexChild) =>
                        child.parentId === element.id ? this.renderElement(child, indexChild, level + 1) : null
                    ) : null
            ]


        );
    }


    render() {
        return (
            <Grid style={{flexGrow: 1}} container spacing={0}>
                <Grid item xs={12} sm={4}>
                    Name
                </Grid>
                <Grid item xs={12}>
                    <hr/>
                </Grid>
                {this.state.elements.map((element, index) => element.parentId === 0 ?
                    this.renderElement(element, index, 0) : null
                )}
            </Grid>
        );
    }
}
