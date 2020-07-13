import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import DocListItem from './DocListItem';
import {endpoints} from '../../../support files/constants';

const styles = {
    div: {
        margin: 10,
        height: "300px",
    },
    scrollable: {
        overflow: "auto",
        maxHeight: "200px"
    }
}

const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    flex: 50%;
`;

export default class DocSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }

        this.search = this.search.bind(this);
    }

    search(e) {
        if (e.key === 'Enter') {
            fetch("http://localhost:3000/" + endpoints.searchDoc + e.target.value)
                .then(res => res.json())
                .then(
                    (result) => {
                        let results = result;
                        this.setState({searchResults: results});
                    }
                )
        }
    }

    render() {
        const listItems = this.state.searchResults;
        const selectedItems = this.props.selectedDocs;
        return (
            <div style={styles.div}>
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
                                    id={elem["name"]}
                                    onSelect={this.props.onAction2_2}
                                />)}
                        </List>
                    </Column>
                    <Column>
                        <Typography variant="subtitle2">
                            Selected Documents
                        </Typography>
                        <List dense={true} className="docList" style={styles.scrollable}>
                            {selectedItems.map((value) =>
                                <ListItem key={value}>
                                    <ListItemText
                                        primary={value}
                                    />
                                </ListItem>)}
                        </List>
                    </Column>
                </Row>
            </div>
        )
    }
}
