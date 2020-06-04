"use strict";

import React from 'react';
import Page from "../components/Page";


export class WelcomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <Page title={"Welcome"}>
               <div>
                   Welcome to EiDiA
               </div>
           </Page>
        );
    }
}
