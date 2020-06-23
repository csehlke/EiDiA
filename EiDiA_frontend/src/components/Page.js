"use strict";

import React from 'react';

import HeaderExport from './HeaderExport';
import {Footer} from './Footer';


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }

    render() {
        return (
            <section>
                <HeaderExport title={this.props.title} changeView={this.props.changeView}/>
                {this.props.children}
                <Footer />
            </section>
        );
    }
}
