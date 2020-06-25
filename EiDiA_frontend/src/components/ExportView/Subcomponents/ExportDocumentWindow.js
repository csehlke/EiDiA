import React from 'react';
import { Dialog, DialogTitle, Typography, Button, Box, Input } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import {Row, Column} from '../../../support files/constants';
import {RecordSymbol} from "../../fileCabinet/RecordSymbol";
import styled from "styled-components";
import SaveTemplateWindow from './SaveTemplateWindow';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';



const styles={
    column: {
        margin: "15px",
    },
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


export default class ExportDocumentWindow extends React.Component {
    render() {
        let filteredRecords = this.props.filteredRecords;
        let selectedDocs = this.props.selectedDocs;
        return(
            <Row style={{margin: "10px"}}>
                <Column style={styles.column}>
                    <Typography variant="subtitle2">
                        Created Template (Preview)
                    </Typography>
                    <Box style={styles.box} component="span" display="block" p={1} m={1} bgcolor="LightGray">
                    </Box>
                </Column>
                <Column style={styles.column}>
                    <Typography variant="subtitle2">
                        Used Documents
                    </Typography>
                    <FormGroup>
                        {selectedDocs.map((doc) => <FormControlLabel control={<Checkbox color="primary"/>} label={doc}/>)}
                    </FormGroup>
                </Column>
                <Column style={styles.column}>
                    <Row>
                        <Typography variant="subtitle2">
                            Template Name
                        </Typography>
                    </Row>
                    <Row>    
                    <Input placeholder="Template Name"  inputProps={{ 'aria-label': 'description' }} />
                    </Row>
                    <Row>
                        <div width="80%">
                            <Typography variant="subtitle2">
                                Template Name
                            </Typography>
                            <Input placeholder="Search Records ..." fullWidth={true}  inputProps={{ 'aria-label': 'description' }} value={this.props.value} onChange={this.props.updateSearch.bind(this)} />
                            <FlexRow>
                                {filteredRecords.map(record =>  <RecordSymbol fontSize='3vw' labelFontSize='10px' key={record} name={record}/>)}
                            </FlexRow>
                        </div>
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
                            Send as E-Mail
                        </Button>
                        <Button
                            style={styles.button_right}
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={this.props.download}
                        >
                            Download
                        </Button>
                        <Button
                            style={styles.button_right}
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={this.props.save}
                        >
                            Export
                        </Button>
                    </Row>
                </Column>
            </Row>
        )
    }
}