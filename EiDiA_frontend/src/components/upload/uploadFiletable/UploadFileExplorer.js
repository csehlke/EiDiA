import React from 'react';
import Element from './Element'
import Grid from "@material-ui/core/Grid";
import RecordService from "../../../services/RecordService";

export default class UploadFileExplorer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: []
        }
    }

    componentDidMount() {
        RecordService.listFolders(this.props.recordId).then((data) => {
            let folders = []

            Object.values(data)[0].forEach(function (element) { //unpack response
                folders.push(element)
            });

            this.setState({
                elements: folders
            });

        }).catch((e) => {
            console.error(e);
        });
    }

    setNewParent = (child) => (newParentId) => {
        child.parentFolderId = newParentId;

    }
    onFolderClicked = (element) => () => {
        this.props.sendFolder(element) // --> Current selected Folder to Dialog

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
                this.state.elements.map((child, indexChild) =>
                    child.parentFolderId === element.id ? this.renderElement(child, indexChild, level + 1) : null
                )
            ]
        );
    }


    render() {
        return (
            <Grid style={{flexGrow: 1}} container spacing={0}>
                <Grid item xs={12} sm={12}>
                    Name
                </Grid>
                <Grid item xs={12}>
                    <hr/>
                </Grid>
                {this.state.elements.map((element, index) => element.parentFolderId === '000000000000000000000000' ? //24x 0 comes from backend (valid ObjectId)
                    this.renderElement(element, index, 0) : null
                )}
            </Grid>
        );
    }
}
