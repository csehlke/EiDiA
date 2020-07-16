import React from 'react';
import Divider from '@material-ui/core/Divider';

const styles = {
    drawer: {
        position: "relative",
        align: "right",
        backgroundColor: "white",
        boxShadow: "-10px 0px 6px -10px rgba(0,0,0,0.5)",
        maxWidth: "52vh",
        minWidth: "52vh",
        minHeight: '83vh',
        maxHeight: '83vh'
    }
}

export default class RightSidePanel extends React.Component {
    render() {
        const TypeComponent1 = this.props.componentSet.comp1;
        const TypeComponent2 = this.props.componentSet.comp2;
        const TypeComponent3 = this.props.componentSet.comp3;
        return (
            <div style={styles.drawer}>
                <Divider/>
                { typeof TypeComponent1 !== 'undefined' ? <TypeComponent1
                    onAction1={this.props.actionSet.onAction1_1}
                    onAction2={this.props.actionSet.onAction1_2}
                /> : <div/>}
                <Divider/>
                <TypeComponent2
                    editorState={this.props.editorState}
                    variables={this.props.variables}
                    selectedDocs={this.props.selectedDocs}
                    onAction2_1={this.props.actionSet.onAction2_1}
                    onAction2_2={this.props.actionSet.onAction2_2}
                />
                <Divider/>
                <TypeComponent3
                    onAction1={this.props.actionSet.onAction3_1}
                    onAction2={this.props.actionSet.onAction3_2}
                    onAction3={this.props.actionSet.onAction3_3}
                    open={this.props.showDialog}
                    variables={this.props.variables}
                    selectedDocs={this.props.selectedDocs}
                    selectedVariable={this.props.selectedVariable}
                />
            </div>
        );
    }
}
