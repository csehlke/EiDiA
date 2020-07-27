import React from 'react';
import Element from './filetable/Element'
import ElementDropTarget from "./filetable/ElementDropTarget";
import {fileTypes, styleFabButton} from "../../../../constants";
import Grid from "@material-ui/core/Grid";
import RecordService from "../../services/RecordService";
import Fab from "@material-ui/core/Fab";
import {MdCreateNewFolder} from "react-icons/md/index";
import {ServerSideErrorSnackBar} from "../ServerSideErrorSnackBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    error: {
        color: theme.palette.error.main // see index.js
    }
});

class FileExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: this.props.elements,
            isServerError: false,
            deleteInProgress: false,
            toDeleteElement: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                elements: this.props.elements,
            })
        }
    }

    /**
     * Sets a new ParentId for an Element first in the database and then updates the state
     * @param child the element that should get a new Parent Id
     * @returns {function(...[*]=)}
     */
    setNewParent = (child) => (newParentId) => {
        let reqBody = {
            id: child.id,
            parentFolderId: newParentId + ""
        }
        RecordService.updateParentFolderId(reqBody).then(resp => {
                console.log(resp)
                child.parentFolderId = resp;
                this.setState(this.state);

            }
        ).catch((e) => this.setState({isServerError: true}))

    }
    activeToggle = (element) => () => {
        element.activeFolder = !element.activeFolder;

        this.setState(this.state);
    }
    /**
     * Adds a Folder with a specific parentId to the database, and then updates the state if succesfull
     * @param parentFolderId
     * @returns {function(...[*]=)}
     */
    handleAddFolder = (parentFolderId) => (e) => {
        let requestData = {
            name: "New Folder",
            parentFolderId: ("" + parentFolderId),
            recordId: this.props.recordId,
        }
        RecordService.addFolder(requestData)
            .then(
                resp => {
                    this.state.elements.push(resp);
                    this.setState({elements: this.state.elements})
                }
            ).catch((e) => this.setState({isServerError: true}))
    }
    /**
     * Edits the name of an element
     * @param element the element to be changed
     * @param name the new name
     * @returns {function(...[*]=)}
     */
    editName = (element) => (name) => {
        let reqBody = {
            id: element.id,
            name: name
        }
        RecordService.updateName(reqBody).then(resp => {
                element.name = resp;
                this.setState(this.state);

            }
        ).catch((e) => this.setState({isServerError: true}))
    }

    /**
     * Deletes an element from database and if succesfull from the state
     * The element to be deleted must be stored in this.state.toDeleteElement first e.g. by handleDeleteElement
     * @param e
     */
    handleDeleteElementApproved = (e) => {
        RecordService.deleteDocument(this.state.toDeleteElement.id).then(result => {
                if (result.ok) this.state.elements.splice(this.state.elements.findIndex(elem => elem.id === this.state.toDeleteElement.id), 1);
                this.setState(this.state)
                this.setState({deleteInProgress: false, toDeleteElement: null})
            }
        ).catch((e) => {
            this.setState({isServerError: true})
        })

    }
    /**
     * Sets the state variables deleteInProgress to true and specifies (in state) what should be deleted
     * @param element the element to be delete
     * @returns {function(...[*]=)}
     */
    handleDeleteElement = (element) => (e) => {
        //TODO if parent Element deleted, also delete all child elements (from database)
        this.setState({deleteInProgress: true, toDeleteElement: element})
    }

    renderElement(element, index, level) {
        return ([
                <Grid key={index} item xs={12}>
                    <ElementDropTarget
                        type={element.fileType}
                        id={element.id}
                    >
                        <Element
                            level={level}
                            elementData={element}
                            handleDrop={this.setNewParent(element)}
                            editName={this.editName(element)}
                            handleDeleteElement={this.handleDeleteElement(element)}
                            activeToggle={this.activeToggle(element)}
                            handleAddFolder={this.handleAddFolder(element.id)}
                            dragEnabled={this.props.dragEnabled}
                        >


                        </Element>
                    </ElementDropTarget>
                </Grid>,
                element.activeFolder === true ?

                    this.state.elements.map((child, indexChild) =>
                        child.parentFolderId === element.id ?
                            this.renderElement(child, indexChild, level + 1)
                            : null
                    ) : null,

            ]
        );
    }

    handleServerErrorBarClose = (e) => {
        this.setState({
            isServerError: false,

        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid style={{flexGrow: 1}} container spacing={0}>
                    <Grid item xl={4} sm={4}>
                        Name
                    </Grid>
                    <Grid item xl={1} sm={2}>
                        Created
                    </Grid>
                    <Grid item xl={1} sm={2}>
                        Last Modified
                    </Grid>
                    <Grid item xl={4} sm={3}>
                        Comment
                    </Grid>
                    <Grid item xl={2} sm={1}>
                        <span style={{textAlign: "center"}}>Actions</span>
                    </Grid>

                    <Grid item xs={12} sm={12} xl={12}>
                        <hr/>
                    </Grid>
                    {this.state.elements.map((element, index) => element.parentFolderId === 0 ?
                        this.renderElement(element, index, 0) : null
                    )}
                    <Grid container item xl={12} justify="center">

                        <ElementDropTarget id={0} type={fileTypes.FOLDER}>
                            <div style={{width: "80vw", height: "10vh", display: "block"}}/>
                        </ElementDropTarget>
                    </Grid>
                </Grid>
                {this.props.dragEnabled ?
                    <Fab style={styleFabButton} color="secondary" aria-label="edit"
                         onClick={this.handleAddFolder(0)}>
                        <MdCreateNewFolder size={32}/>
                    </Fab>
                    : null}
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
                <Dialog open={this.state.deleteInProgress}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Are you sure you want to perform Delete ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({deleteInProgress: false, toDeleteElement: null})
                        }} className={classes.error}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteElementApproved} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog></div>

        );
    }
}

export default withStyles(styles, {withTheme: true})(FileExplorer);
