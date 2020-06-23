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

function convertData(arr) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
        out.push(createData(arr[i], "BMW", '05.05.2020'));
    }
    return out;
}

export default class SetValueSection extends React.Component {
    handleChange(event) {
        console.log(event.target.value);
    }

    render() {
        const variables = this.props.variables
        const rows = convertData(variables);
        return(
            <div>
                <FormControl style={{margin: "5px"}}>
                    <Select variant="outlined" onChange={this.handleChange}>
                        {variables.map((variable) => <MenuItem key={variable} value={variable}>{variable}</MenuItem>)}
                    </Select>
                    <FormHelperText>Variables</FormHelperText>
                </FormControl>
                <TextField style={{margin: "5px"}} variant="outlined" helperText="e.g. max(Doc_A/VALUE_A)" />
                <IconButton style={{margin: "5px"}} color="primary"><AddIcon/></IconButton>
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
                    >Export</Button>
                </div>

            </div>
        )
    }
}