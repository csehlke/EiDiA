import React from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import IconButton from '@material-ui/core/IconButton'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';

const styles = {
    div: {
        padding: "7px"
    },
    formControl: {
        height: 20
    }
}



export default class EditorTools extends React.Component {
    constructor(props) {
        super(props)
    }

    logClick(mode) {
        console.log(mode);
    }

    render() {
        return(
            <div style={styles.div}>
                <IconButton onClick={() => this.logClick("BOLD")}>
                    <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("ITALIC")}>
                    <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("alighn justify")}>
                    <FormatUnderlinedIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("STRIKETHROUGH")}>
                    <StrikethroughSIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("Align left")}>
                    <FormatAlignLeftIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("Align center")}>
                    <FormatAlignCenterIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("align riht")}>
                    <FormatAlignRightIcon />
                </IconButton>
                <IconButton onClick={() => this.logClick("alighn justify")}>
                    <FormatAlignJustifyIcon />
                </IconButton>
                <FormControl variant="outlined">
                <InputLabel>Size</InputLabel>
                    <Select label="Size">
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }
}