import React from 'react';
import {Box} from '@material-ui/core';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import {convertToRaw} from 'draft-js';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

export default class Preview extends React.Component {
    
    render() {
        let editorState = this.props.editorState;
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const editorText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

        return(
            <PDFViewer>
                <Document>
                    <Page size="A4" style={styles.page}>
                    <Text>{editorText}</Text>
                    </Page>
                </Document>
            </PDFViewer>
        )
    }
}