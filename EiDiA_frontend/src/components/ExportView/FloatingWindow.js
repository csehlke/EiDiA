import React from 'react';
import { Dialog, DialogTitle, Typography, Button, Box, Input } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import {Row, Column} from '../../support files/constants';
import {RecordSymbol} from "../fileCabinet/RecordSymbol";
import styled from "styled-components";


const styles={
    box: {
        width: '7cm',
        height: '10cm',
        align: 'center',
        padding: "20px",
    },
    button_left: {
        margin: "15px",
        align: "left",
        bottom: 0,
    },
    button_right: {
        margin: "15px",
        align: "right",
        bottom: 0,
        right:0,
    }
}

const FlexRow = styled.div`
    margin: 0 5% 0 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 50%;
`;

export default class FloatingWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records : ["Volkswagen","BMW","Thyssenkrup","Google","Facebook","Microsoft","ABC Company","Adidas","lenovo Limited","IBM","TrueThat","hello","abc","def"],
            search : ''
        }
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    render() {
        let filteredRecords = this.state.records.filter(
            (record) => {
                return record.indexOf(this.state.search) !== -1;
            }
        );
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
                        <Input placeholder="Template Name"  inputProps={{ 'aria-label': 'description' }} />
                        </Row>
                        <Row>
                            <Row>
                                <Typography variant="subtitle2" style={{margin: "5%"}}>
                                    Export to:
                                </Typography>
                                <div width="80%" style = {{margin: "3% 10% 3% 10%"}}>
                                    <Input placeholder="Search Records ..." fullWidth={true}  inputProps={{ 'aria-label': 'description' }} value={this.state.search} onChange={this.updateSearch.bind(this)} />
                                    <FlexRow>
                                        {filteredRecords.map(record =>  <RecordSymbol fontSize='3vw' labelFontSize='10px' key={record} name={record}/>)}
                                    </FlexRow>
                                </div>
                            </Row>
                            
                        </Row>
                        <Row>
                            <Button
                                style={styles.button_left}
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={this.props.onClose}
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