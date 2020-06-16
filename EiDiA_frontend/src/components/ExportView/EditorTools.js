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
import "draft-js/dist/Draft.css";

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
            alignments: {
                left: false,
                center: false,
                right: false,
                justify: false
            }
        }
        this.setEmphasis = this.setEmphasis.bind(this);
        this.setAlignment = this.setAlignment.bind(this);
    }

    setEmphasis(e, style) {
        e.preventDefault();
        this.props.onAction1(style);
        var newState = this.state;
        newState[style] = !newState[style] ;
        this.setState(newState);
    }

    setAlignment(e, align) {
        e.preventDefault()
        this.props.onAction2(align)
        var newState = this.state
        const newFlag = !newState.alignments[align]
        for (let key in newState.alignments) {
            newState.alignments[key] = false
        }

        newState.alignments[align] = newFlag;

        this.setState(newState)
    }

    render() {
        return(
            <div style={styles.div}>
                <IconButton 
                    style={this.state.bold ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "bold")}
                >
                    <FormatBoldIcon />
                </IconButton>
                <IconButton 
                    style={this.state.italic ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "italic")}
                >                    
                    <FormatItalicIcon />
                </IconButton>
                <IconButton 
                    style={this.state.underlined ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "underlined")}
                >                    
                    <FormatUnderlinedIcon />
                </IconButton>
                <IconButton 
                    style={this.state.striked ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "striked")}
                >                    
                    <StrikethroughSIcon />
                </IconButton>
                <IconButton 
                    style={this.state.alignments.left ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "left")}
                >
                    <FormatAlignLeftIcon />
                </IconButton>
                <IconButton 
                    style={this.state.alignments.center ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "center")}
                >
                    <FormatAlignCenterIcon />
                </IconButton>
                <IconButton
                    style={this.state.alignments.right ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "right")}
                >
                    <FormatAlignRightIcon />
                </IconButton>
                <IconButton
                    style={this.state.alignments.justify ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "justify")}
                >
                    <FormatAlignJustifyIcon />
                </IconButton>
            </div>
        )
    }
}