import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import {GrTextAlignCenter, GrTextAlignFull, GrTextAlignLeft, GrTextAlignRight} from 'react-icons/gr';
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
            // If true: mark as active
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
        this.setInlineStyle = this.setInlineStyle.bind(this);
        this.setAlignment = this.setAlignment.bind(this);
    }

    setInlineStyle(event, inlineStyle) {
        event.preventDefault();
        this.props.onAction1(inlineStyle);
        let newState = this.state;
        newState[inlineStyle] = !newState[inlineStyle];
        this.setState(newState);
    }

    setAlignment(event, alignmentStyle) {
        event.preventDefault()
        this.props.onAction2(alignmentStyle);
        let newState = this.state;
        for (let key in newState.alignments) {
            newState.alignments[key] = false
        }
        newState.alignments[alignmentStyle] = true;
        this.setState(newState)
    }

    render() {
        return (
            <div style={styles.div}>
                <IconButton
                    style={this.state.bold ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setInlineStyle(event, "bold")}
                >
                    <AiOutlineBold/>
                </IconButton>
                <IconButton
                    style={this.state.italic ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setInlineStyle(event, "italic")}
                >
                    <AiOutlineItalic/>
                </IconButton>
                <IconButton
                    style={this.state.underlined ? styles.iconClicked : null}
                    onMouseDown={(event,) => this.setInlineStyle(event, "underline")}
                >
                    <AiOutlineUnderline/>
                </IconButton>
                <IconButton
                    style={this.state.strikethrough ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setInlineStyle(event, "strikethrough")}
                >
                    <AiOutlineStrikethrough/>
                </IconButton>
                <IconButton
                    style={this.state.alignments.left ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setAlignment(event, "left")}
                >
                    <GrTextAlignLeft/>
                </IconButton>
                <IconButton
                    style={this.state.alignments.center ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setAlignment(event, "center")}
                >
                    <GrTextAlignCenter/>
                </IconButton>
                <IconButton
                    style={this.state.alignments.right ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setAlignment(event, "right")}
                >
                    <GrTextAlignRight/>
                </IconButton>
                <IconButton
                    style={this.state.alignments.justify ? styles.iconClicked : null}
                    onMouseDown={(event) => this.setAlignment(event, "justify")}
                >
                    <GrTextAlignFull/>
                </IconButton>
            </div>
        )
    }
}
