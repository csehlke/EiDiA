import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import DocListItem  from './DocListItem';

const styles = {
    div: {
        margin: 10
    },
    scrollable: {
        overflowY: scroll,
        height: "25%"
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
            selected:  []
        };
        this.addToList = this.addToList.bind(this);
    }

    addToList(element) {
        var selectedElems = this.state.selected;
        if (!selectedElems.includes(element)) {
            selectedElems.push(element);
            console.log("select" + element)
            this.setState({selected: selectedElems})
        }
    }

    render() {
        const listItems = ['Document A', 'Document B', 'Document C']
        const selectedItems = this.state.selected;
        return(
            <div style={styles.div}>
                <Row>
                    <TextField label="Search Document" variant="outlined"/>
                </Row>
                <Row>
                    <Column>
                    <Typography variant="subtitle2">
                        Search Results
                    </Typography>
                        <List dense={true} style={styles.scrollable}>
                            {listItems.map((value) =>
                                <DocListItem 
                                    key={value}
                                    id={value}
                                    onSelect={this.addToList}
                                    />)}
                        </List>
                    </Column>
                    <Column>
                    <Typography variant="subtitle2">
                        Selected Documents
                    </Typography>
                        <List dense={true} className="docList">
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