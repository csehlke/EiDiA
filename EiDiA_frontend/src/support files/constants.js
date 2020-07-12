import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
`;

export const Column = styled.div`
    flex: 50%;
`;

export const documentMockData = {
    "Document 1": {
        "VARIABLE1": "BMW",
        "VARIABLE2": "500.000€"
    }
};

export const endpoints = {
    getTemplateList: "exporttemplate/list",
    getTemplate: "exporttemplate/template/"
}

export const fontSizes = [
    {text: '4', value: 4},
    {text: '8', value: 8},
    {text: '10', value: 10},
    {text: '12', value: 12},
    {text: '14', value: 14},
    {text: '16', value: 16},
    {text: '20', value: 20},
    {text: '24', value: 24},
    {text: '30', value: 30},
    {text: '36', value: 36},
    {text: '42', value: 42},
    {text: '50', value: 50},
    {text: '64', value: 64},
    {text: '72', value: 72},
    {text: '90', value: 90},
];
