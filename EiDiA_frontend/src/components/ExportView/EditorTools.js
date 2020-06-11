import React from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import IconButton from '@material-ui/core/IconButton'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { Dropdown, Modal, Button, Icon } from 'semantic-ui-react';
import { StepLabel } from '@material-ui/core';

const styles = {
    div: {
        padding: "7px"
    },
    iconClicked: {
        color: "black"
    }
}

const fontSizes = [
    { text: '4', value: 4 },
    { text: '8', value: 8 },
    { text: '10', value: 10 },
    { text: '12', value: 12 },
    { text: '14', value: 14 },
    { text: '16', value: 16 },
    { text: '20', value: 20 },
    { text: '24', value: 24 },
    { text: '30', value: 30 },
    { text: '36', value: 36 },
    { text: '42', value: 42 },
    { text: '50', value: 50 },
    { text: '64', value: 64 },
    { text: '72', value: 72 },
    { text: '90', value: 90 },
  ];


export default class EditorTools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bold: false,
            italic: false,
            underlined: false,
            striked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(style) {
        this.props.onChangeInlineStyle(style)
        var newState = this.state
        newState[style] = !newState[style] 
        this.setState(newState)
    }

    render() {
        return(
            <div style={styles.div}>
                <IconButton 
                    style={this.state.bold ? styles.iconClicked : null}
                    onMouseDown={() => this.handleClick("bold")}
                >
                    <FormatBoldIcon />
                </IconButton>
                <IconButton 
                    style={this.state.italic ? styles.iconClicked : null}
                    onMouseDown={() => this.handleClick("italic")}
                >                    
                    <FormatItalicIcon />
                </IconButton>
                <IconButton 
                    style={this.state.underlined ? styles.iconClicked : null}
                    onMouseDown={() => this.handleClick("underlined")}
                >                    
                    <FormatUnderlinedIcon />
                </IconButton>
                <IconButton 
                    style={this.state.striked ? styles.iconClicked : null}
                    onMouseDown={() => this.handleClick("striked")}
                >                    
                    <StrikethroughSIcon />
                </IconButton>
                <IconButton onMouseDown={() => this.handleClick("Align left")}>
                    <FormatAlignLeftIcon />
                </IconButton>
                <IconButton onMouseDown={() => this.handleClick("Align center")}>
                    <FormatAlignCenterIcon />
                </IconButton>
                <IconButton onMouseDown={() => this.handleClick("align riht")}>
                    <FormatAlignRightIcon />
                </IconButton>
                <IconButton onMouseDown={() => this.logClick("alighn justify")}>
                    <FormatAlignJustifyIcon />
                </IconButton>
            </div>
        )
    }
}