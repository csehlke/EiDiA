import React from 'react';
import {convertToRaw} from 'draft-js';
import Iframe from "react-iframe";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: null};
    }

    componentDidMount() {
        let editorState = this.props.editorState;
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const editorText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        var docDefinition = {content: editorText}
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
            this.setState({url: dataUrl});
        });
    }

    render() {
        let editorState = this.props.editorState;
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const editorText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return (
            <Iframe url={this.state.url}/>
            /*            <PDFViewer>
                            <Document>
                                <Page size="A4" style={styles.page}>
                                    <Text>{editorText}</Text>
                                </Page>
                            </Document>
                        </PDFViewer>*/

        )
    }
}
