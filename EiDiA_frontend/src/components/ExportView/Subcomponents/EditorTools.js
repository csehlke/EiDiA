import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import {GrTextAlignFull, GrTextAlignLeft, GrTextAlignCenter, GrTextAlignRight} from 'react-icons/gr';
import {AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline} from 'react-icons/ai';
import "draft-js/dist/Draft.css";

const styles = {
    div: {
        padding: "7px"
    },
    iconClicked: {
        color: "black"
    }
}

export default class EditorTools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bold: false,
            italic: false,
            underlined: false,
            strikethrough: false,
            alignments: {
                left: true,
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
                    <AiOutlineBold />
                </IconButton>
                <IconButton 
                    style={this.state.italic ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "italic")}
                >                    
                    <AiOutlineItalic />
                </IconButton>
                <IconButton 
                    style={this.state.underlined ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "underline")}
                >                    
                    <AiOutlineUnderline />
                </IconButton>
                <IconButton 
                    style={this.state.striked ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setEmphasis(e, "strikethrough")}
                >                    
                    <AiOutlineStrikethrough />
                </IconButton>
                <IconButton 
                    style={this.state.alignments.left ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "left")}
                >
                    <GrTextAlignLeft />
                </IconButton>
                <IconButton 
                    style={this.state.alignments.center ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "center")}
                >
                    <GrTextAlignCenter />
                </IconButton>
                <IconButton
                    style={this.state.alignments.right ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "right")}
                >
                    <GrTextAlignRight />
                </IconButton>
                <IconButton
                    style={this.state.alignments.justify ? styles.iconClicked : null}
                    onMouseDown={(e) => this.setAlignment(e, "justify")}
                >
                    <GrTextAlignFull />
                </IconButton>
            </div>
        )
    }
}