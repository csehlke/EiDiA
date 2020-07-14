import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
`;

export const Column = styled.div`
    flex: 50%;
`;

export const BASE_URL = "http://localhost:3000/";

export const pageNames = {
    selectTemplate: "Select Template",
    editTemplate: "Edit Template",
    edit: "Edit"
}

export const endpoints = {
    getTemplateList: "exporttemplate/list",
    getTemplate: "exporttemplate/template/",
    searchDoc: "exporttemplate/search/",
    getDocs: "exporttemplate/documents/",
    saveTemplate: "exporttemplate/save/",
    exportDocs: "exporttemplate/export/"
}