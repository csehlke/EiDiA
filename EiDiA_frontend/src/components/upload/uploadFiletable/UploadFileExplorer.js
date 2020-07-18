import React from 'react';
import Element from './Element'
import Grid from "@material-ui/core/Grid";
import RecordService from "../../../services/RecordService";
import {ServerSideErrorSnackBar} from "../../ServerSideErrorSnackBar";

export default class UploadFileExplorer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            isServerError: false,
        }

        this.handleServerErrorBarClose = this.handleServerErrorBarClose.bind(this);
    }

    componentDidMount() {
        RecordService.listFolders(this.props.recordId).then((data) => {
            this.setState({
                elements: data.documents
            });

        }).catch((e) => {
            this.setState({
                isServerError: true,
            });
            console.error(e);
        });
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

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,
        })
    }

    render() {
        return (
            <div>
                <Grid style={{flexGrow: 1}} container spacing={0}>
                    <Grid item xs={12} sm={12}>
                        Name
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                    {this.state.elements.map((element, index) => element.parentFolderId === '0' ?
                        this.renderElement(element, index, 0) : null
                    )}
                </Grid>
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
            </div>
        );
    }
}
