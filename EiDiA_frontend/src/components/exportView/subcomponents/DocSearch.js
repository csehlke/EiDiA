import React from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DocListItem from './DocListItem';
import {Column, Row} from '../../StyleElements';
import ExportService from '../../../services/ExportService'

const styles = {
    root: {
        margin: 10,
        height: "300px",
    },
    scrollable: {
        overflow: "auto",
        maxHeight: "200px"
    }
}

export default class DocSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }
        this.search = this.search.bind(this);
    }

    search(event) {
        if (event.key === 'Enter') {
            ExportService.searchDocuments(e.target.value).then((data) => {
                let searchResults = data.documents;
                this.setState({searchResults: searchResults});
            })
        }
    }

    render() {
        const listItems = this.state.searchResults;
        const selectedItems = this.props.selectedDocs;
        return (
            <div style={styles.root}>
                <Row>
                    <TextField label="Search Document" variant="outlined" onKeyPress={this.search}/>
                </Row>
                <Row>
                    <Column>
                        <Typography variant="subtitle2">
                            Search Results
                        </Typography>
                        <List dense={true} style={styles.scrollable}>
                            {listItems.map((elem) =>
                                <DocListItem
                                    key={elem["id"]}
                                    id={elem["id"]}
                                    name={elem["name"]}
                                    onSelect={this.props.onAction2_1}
                                />)}
                        </List>
                    </Column>
                    <Column>
                        <Typography variant="subtitle2">
                            Selected Documents
                        </Typography>
                        <List dense={true} className="docList" style={styles.scrollable}>
                            {selectedItems.map((doc) =>
                                <ListItem key={doc["id"]}>
                                    <ListItemText
                                        primary={doc["name"]}
                                    />
                                </ListItem>)}
                        </List>
                    </Column>
                </Row>
            </div>
        )
    }
}
