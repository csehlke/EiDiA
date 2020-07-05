import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Row, Column} from '../../../support files/constants';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {documentMockData} from '../../../support files/constants'; 

const styles = {
    textField: {
        left: "5px",
    },
    button: {
        margin: "15px",
        right: 0
    }
}

function createData(variable, value, source) {
    return { variable, value, source };
  }

function convertData(variables, value=null) {
    var out = [];
    for (let k of Object.keys(variables)) {
        let variable = variables[k];
        out.push(createData(k, variable["value"], variable["source"]));
    }
    return out;
}

export default class SetValueSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",    
        }

        this.handleChangeTextfield = this.handleChangeTextfield.bind(this);
        this.setValueToVariable = this.setValueToVariable.bind(this);
    }

    setValueToVariable() {
        this.props.onAction3(this.state.input);
    }


    handleChangeTextfield(event) {
        this.setState({input: event.target.value});
    }

    render() {
        const variableState = this.props.variables;
        const variableKeys = Object.keys(variableState);
        const rows = convertData(variableState);
        return(
            <div>
                <FormControl style={{margin: "5px"}}>
                    <Select variant="outlined" onChange={this.props.onAction2}>
                        {variableKeys.map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                    </Select>
                    <FormHelperText>Variables</FormHelperText>
                </FormControl>
                <TextField style={{margin: "5px"}} variant="outlined" helperText="e.g. 01.01.2020" onChange={this.handleChangeTextfield}/>
                <IconButton style={{margin: "5px"}} color="primary" onClick={this.setValueToVariable}><AddIcon/></IconButton>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Variable</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Source</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.variable}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                        <TableCell align="right">{row.source}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <div>
                    <Button
                        style={styles.button}
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={this.props.onAction1}
                    >Export</Button>
                </div>
            </div>
        )
    }
}