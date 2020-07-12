import React from 'react';
import Divider from '@material-ui/core/Divider';
import EditorTools from './subcomponents/EditorTools';
import DocSearch from './subcomponents/DocSearch';
import ExportSection from './subcomponents/ExportSection';
import TemplateList from './subcomponents/TemplateList';
import SaveTemplateSection from './subcomponents/SaveTemplateSection';
import VariableList from './subcomponents/VariableList';
import SetValueSection from './subcomponents/SetValueSection';

const styles = {
    drawer: {
        position: "relative",
        align: "right",
        backgroundColor: "white",
        boxShadow: "-10px 0px 6px -10px rgba(0,0,0,0.5)",
    }
}

export default class RightSidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.changeInlineStyle = this.changeInlineStyle.bind(this);
        this.changeAlignment = this.changeAlignment.bind(this);

        this.typeComponents = {
            editorTools: EditorTools,
            docSearch: DocSearch,
            exportSection: ExportSection,
            templateList: TemplateList,
            saveTemplateSection: SaveTemplateSection,
            variableList: VariableList,
            setValueSection: SetValueSection
        }
    }

    changeInlineStyle(style) {
        this.props.onToggleInlineStyle(style);
    }

    changeAlignment(align) {
        this.props.onToggleBlockType(align);
    }

    render() {
        const TypeComponent1 = this.typeComponents[this.props.comp1]
        const TypeComponent2 = this.typeComponents[this.props.comp2]
        const TypeComponent3 = this.typeComponents[this.props.comp3]
        return (
            <div style={styles.drawer}>
                <Divider/>
                <TypeComponent1
                    onAction1={this.props.onAction1_1}
                    onAction2={this.props.onAction1_2}
                />
                <Divider/>
                <TypeComponent2
                    editorState={this.props.editorState}
                    variables={this.props.variables}
                    selectedDocs={this.props.selectedDocs}
                    onAction2_2={this.props.onAction2_2 || null}
                />
                <Divider/>
                <TypeComponent3
                    onAction1={this.props.onAction3_1}
                    onAction2={this.props.onAction3_2}
                    onAction3={this.props.onAction3_3}
                    open={this.props.open}
                    variables={this.props.variables}
                    selectedDocs={this.props.selectedDocs}
                    selectedVariable={this.props.selectedVariable}
                />
            </div>
        );
    }
}
