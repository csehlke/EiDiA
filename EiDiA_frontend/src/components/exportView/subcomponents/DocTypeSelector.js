import React from 'react';
import DocTypeSelectLine from "./DocTypeSelectLine";

export default class DocTypeSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const docTypes = [
            {name: "lalalalal", type: "lalala type"},
            {name: "lololo", type: "lololo type"},
        ]
        return (
            <DocTypeSelectLine
                docTypes={docTypes}
                number={1}
            />
        )
    }

}