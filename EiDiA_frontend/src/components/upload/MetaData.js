"use strict";

import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const MetaContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

class MetaData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            priority: '',
            department: [],
            comment: '',
        }

        this.handleOnPriorityChange = this.handleOnPriorityChange.bind(this);
        this.handleOnDepartmentChange = this.handleOnDepartmentChange.bind(this);
        this.handleOnCommentChange = this.handleOnCommentChange.bind(this);
    }

    sendData() {
        return [this.state.priority, this.state.department, this.state.comment]
    }

    handleOnPriorityChange(event) {
        this.setState({priority: event.target.value}, () => { //setState is not always synchronous
            this.props.callbackAttributeContainer(this.sendData());
        });
    }

    handleOnDepartmentChange(event) {
        let copyArr = this.state.department
        let idx = (this.state.department.indexOf(event.target.value))
        if (idx === -1 && event.target.checked) { //add to array if hasn't been added before
            copyArr.push(event.target.value)
            this.setState({department: copyArr}, () => { //setState is not always synchronous
                this.props.callbackAttributeContainer(this.sendData());
            });
        } else if (idx !== -1 && !event.target.checked) { // If uncheck, remove from array
            copyArr.splice(idx, 1)
            this.setState({department: copyArr}, () => { //setState is not always synchronous
                this.props.callbackAttributeContainer(this.sendData());
            });
        }
    }

    handleOnCommentChange(event) {
        this.setState({comment: event.target.value}, () => { //setState is not always synchronous
            this.props.callbackAttributeContainer(this.sendData());
        });
    }

    render() {
        return <Grid item xs={12}>
            <MetaContainer>
                <FormControl>
                    <FormLabel>Priority:</FormLabel>
                    <RadioGroup value={this.state.priority} onChange={this.handleOnPriorityChange}>
                        <FormControlLabel value="high" control={<Radio/>} label="high"/>
                        <FormControlLabel value="medium" control={<Radio/>} label="medium"/>
                        <FormControlLabel value="low" control={<Radio/>} label="low"/>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Relevant for Departments:</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={this.handleOnDepartmentChange} value="Accounting"/>}
                            label="Accounting"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={this.handleOnDepartmentChange} value="Human Resources"/>}
                            label="Human Resources"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={this.handleOnDepartmentChange} value="Sales"/>}
                            label="Sales"
                        />
                    </FormGroup>
                </FormControl>

                <TextField
                    style={{maxWidth: "227px"}} // in case of multiline, keep original width
                    multiline
                    rowsMax={5}
                    label={"Comment"}
                    variant="outlined"
                    onChange={this.handleOnCommentChange}/>
            </MetaContainer>
        </Grid>
    }
}

export default MetaData;
