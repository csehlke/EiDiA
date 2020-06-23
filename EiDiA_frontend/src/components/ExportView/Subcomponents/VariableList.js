import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class VariableList extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const variable_arr = this.props.variables;
        return(
            <div style={{margin: "3%"}}>
                <p/>
                Use <input defaultValue="3" width="10px" type="number"/> documents.
                <p/>
                <p/>
                <p/>
                <Typography variant="subtitle2">
                    Variables
                </Typography>
                <Box component="span" display="block" p={1} m={1} bgcolor="LightGray">
                    {variable_arr.map((variable) => <li key={variable}>{variable}</li>)}
                </Box>
            </div>
        )
    }
}