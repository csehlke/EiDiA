import React from 'react';
import {Column, llorem, Row} from '../../support files/constants';
import RightSidepanel from './RightSidepanel';
import TemplateList from './subcomponents/TemplateList';
import DocSearch from './subcomponents/DocSearch';
import ExportSection from './subcomponents/ExportSection';
import {ContentState, EditorState} from 'draft-js';
import DocEditor from './subcomponents/DocEditor';

export default class SelectTemplateView extends React.Component {
    constructor(props) {
        super(props);
        this.editorText = llorem["Template0"];
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.editorText)),
            textAlignment: "left",
            currentPage: "Select Template",
            selectedTemplate: null,
            seen: true,
            open: false,
            variables: []
        };
        this.docEditor = React.createRef();

        this.selectTemplate = this.selectTemplate.bind(this);
    }

    selectTemplate(value) {
        this.editorText = llorem[value] || this.editorText;
        var newState = this.state;
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(this.editorText));
        newState.selectedTemplate = value;
        this.setState(newState);
    }

    render() {
        const editorState = this.state.editorState;
        return (
            <div>
                <Row>
                    <Column>
                        Sidebar
                    </Column>
                    <Column>
                        <DocEditor
                            textAlignment={this.state.textAlignment}
                            ref={(docEditor) => {
                                this.docEditor = docEditor
                            }}
                            editorState={editorState}
                            onChange={this.onChange}
                        />
                    </Column>
                    <Column>
                        <RightSidepanel
                            comp1={TemplateList}
                            comp2={DocSearch}
                            comp3={ExportSection}
                            onAction1_1={this.selectTemplate}
                            onAction1_2={() => false}
                            onAction3_1={() => false}
                            onAction3_2={() => false}
                            editorState={() => false}
                            variables={this.state.variables}
                        />
                    </Column>
                </Row>
            </div>
        )
    }
}
