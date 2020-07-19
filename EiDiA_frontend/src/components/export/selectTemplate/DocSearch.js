import React from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import DocListItem from './DocListItem';
import {Column, Row} from '../../StyleElements';
import ExportService from '../../../services/ExportService'
import Button from '@material-ui/core/Button';

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
        this.clickSearch = this.clickSearch.bind(this);
    }

    search(event) {
        this.setState({textFieldValue: event.target.value});
        if (event.key === 'Enter') {
            ExportService.searchDocuments(event.target.value).then((data) => {
                let searchResults = data.documents;
                this.setState({searchResults: searchResults});
            })
        }
    }

    clickSearch() {
        ExportService.searchDocuments(this.state.textFieldValue).then((data) => {
            let searchResults = data.documents;
            this.setState({searchResults: searchResults});
        })
    }


    render() {
        const listItems = this.state.searchResults;
        const selectedItems = this.props.selectedDocs;
        return (
            <div style={styles.root}>
                <Row>
                    <TextField style={{margin: "5px"}} label="Search Document" variant="outlined"
                               onKeyPress={this.search}/>
                    <Button style={{margin: "5px"}} size="small" variant="contained" color="primary"
                            onClick={this.clickSearch}>Search</Button>
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
                            {selectedItems.map((elem) =>
                                <DocListItem
                                    key={elem["id"]}
                                    id={elem["id"]}
                                    name={elem["name"]}
                                    onSelect={this.props.onAction2_2}
                                    removable
                                />)}
                        </List>
                    </Column>
                </Row>
            </div>
        )
    }
}
