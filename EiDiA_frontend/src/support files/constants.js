import styled from 'styled-components';

export const llorem = {
    "Template 0": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 25%. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
    "Template 1": '$\/Document1\/VARIABLE1 On the date of $DATE ,\n $\/Document1\/VARIABLE1 has made a revenue of $VARIABLE2',
    "Template 2": 'Eins Zwei Drei Vier \n mit zeilenbruch'
}

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
    getTemplateList: "exporttemplate/list"
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
