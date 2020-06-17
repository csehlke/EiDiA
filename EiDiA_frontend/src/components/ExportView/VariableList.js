import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class VariableList extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <p/>
                Use 3 documents.
                <p/>
                <p/>
                <p/>
                <Typography variant="subtitle2">
                    Variables
                </Typography>
                <Box component="span" display="block" p={1} m={1} bgcolor="LightGray">
                    <li>$VARIABLE1</li>
                    <li>$DATE</li>
                </Box>
            </div>
        )
    }
}