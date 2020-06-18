import React from 'react';
import { Dialog, DialogTitle, Typography, Button, Box } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import {Row, Column} from '../../support files/constants';

const styles={
    box: {
        width: '7cm',
        height: '10cm',
        align: 'center',
        padding: "20px",
    },
    button_left: {
        margin: "15px",
        align: "left"
    },
    button_right: {
        margin: "15px",
        align: "right"
    }
}

export default class FloatingWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Dialog onClose={this.props.onClose} fullWidth={true} maxWidth={'md'} id="temp" aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Store Template</DialogTitle>
                <Row style={{margin: "10px"}}>
                    <Column>
                        <Typography variant="subtitle2">
                            Created Template (Preview)
                        </Typography>
                        <Box style={styles.box} component="span" display="block" p={1} m={1} bgcolor="LightGray">
                        </Box>
                    </Column>
                    <Column>
                        <Row>
                            <Typography variant="subtitle2">
                                Template Name
                            </Typography>
                        </Row>
                        <Row>    
                            <input style={{margin: "15px"}} type="text"/>
                        </Row>
                        <Row>
                            File Cabinet
                        </Row>
                        <Row>
                            <Button
                                style={styles.button_left}
                                variant="contained"
                                color="primary"
                                disableElevation
                            >
                                Cancel
                            </Button>
                            <Button
                                style={styles.button_right}
                                variant="contained"
                                color="primary"
                                disableElevation
                            >
                                Save Template
                            </Button>
                        </Row>
                    </Column>
                </Row>
          </Dialog>       
        );
    }
}