import styled from 'styled-components';


export const Row = styled.div`
    display: flex;
`;

export const Column = styled.div`
    flex: 50%;
`;

const BASE_URL = "http://localhost:3000/";

export const pageNames = {
    selectTemplate: "Select Template",
    editTemplate: "Edit Template",
    edit: "Edit"
}

export const endpoints = {
    getTemplateList: BASE_URL + "exporttemplate/list",
    getTemplate: BASE_URL + "exporttemplate/template/",
    searchDoc: BASE_URL + "exporttemplate/search/",
    getDocs: BASE_URL + "exporttemplate/documents/",
    saveTemplate: BASE_URL + "exporttemplate/save/",
    exportDocs: BASE_URL + "exporttemplate/export/"
}