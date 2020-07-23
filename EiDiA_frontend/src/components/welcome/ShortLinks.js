"use strict";

import React from 'react';
import styled from "styled-components";
import ShortLinkTile from "./ShortLinkTile";
import {AiOutlineSearch, FiHardDrive} from "react-icons/all";

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default class ShortLinks extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlexRow>
                <ShortLinkTile name={"Browse File Cabinet"} icon={FiHardDrive} link={"/browse"}/>
                <ShortLinkTile name={"Intelligent Search"} icon={AiOutlineSearch} link={"/search"}/>
            </FlexRow>
        );
    }
}
