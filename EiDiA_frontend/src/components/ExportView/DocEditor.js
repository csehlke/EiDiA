import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import {llorem} from '../../support files/constants';

export default class DocEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(llorem))
        };
        this.onChange = editorState => this.setState({editorState});
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };
    }

    componentDitMount() {
        this.setState({editorSate: EditorState.createEmpty()})
        this.focusEditor();
    }

    render() {
        return (
            <div style={styles.editor} onClick={this.focusEditor}>
                <Editor
                    ref={this.setEditor}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

const styles = {
    editor: {
        border: '1px solid gray',
        width: '14cm',
        height: '20cm',
        align: 'center',
        margin: 10,
        backgroundColor: "white"
    }
};