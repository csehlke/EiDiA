import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const styles = {
    div: {
        margin: 10
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
    }

    generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
    }

    render() {
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
                        <List dense={true}>
                            {this.generate(
                                <ListItem>
                                <ListItemText
                                    primary="Single-line item"
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                    <AddIcon />
                                    </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </Column>
                    <Column>
                    <Typography variant="subtitle2">
                        Selected Documents
                    </Typography>
                        <List dense={true}>
                            {this.generate(
                                <ListItem>
                                <ListItemText
                                    primary="Single-line item"
                                />
                                </ListItem>,
                            )}
                        </List>
                    </Column>
                </Row>
            </div>
        )
    }
}