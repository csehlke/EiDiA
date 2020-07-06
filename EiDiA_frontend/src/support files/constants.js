import styled from 'styled-components';

export const llorem = {
    "Template0": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 25%. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
    "Template1": 'On the date of $DATE ,\n $\/Document1\/VARIABLE1 has made a revenue of $VARIABLE2',
    "Template2": 'Eins Zwei Drei Vier \n mit zeilenbruch'
}

export const Row = styled.div`
    display: flex;
`;

export const Column = styled.div`
    flex: 50%;
`;

export const documentMockData = {
    "Document A": {
        "VARIABLE1": "BMW",
        "VARIABLE2": "500.000€"
    }
};