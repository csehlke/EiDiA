import React from 'react';
import {Editor} from 'draft-js';
import 'draft-js/dist/Draft.css'


const styles = {
    editor: {
        width: '21cm',
        height: '30cm',
        align: 'center',
        margin: 10,
        backgroundColor: "white",
        boxShadow: "0px 0px 6px 1px rgba(0,0,0,0.5)",
        padding: "20px",
    }
};

export default class DocEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editor: null} // reference to editor component
        this.setEditor = this.setEditor.bind(this);
        this.focusEditor = this.focusEditor.bind(this);
    }

    setEditor(editor) {
        this.setState({editor: editor})
    }

    focusEditor() {
        if (this.state.editor) {
            this.state.editor.focus();
        }
    }

    render() {
        return (
            <div style={styles.editor} onClick={this.focusEditor}>
                <Editor
                    readOnly={this.props.readOnly}
                    textAlignment={this.props.textAlignment}
                    ref={this.setEditor}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}
