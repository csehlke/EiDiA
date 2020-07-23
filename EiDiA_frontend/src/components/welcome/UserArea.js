"use strict";

import React from 'react';
import styled from "styled-components";
import {FaUser} from "react-icons/all";
import {Link} from "../Link";

import UserService from "../../services/UserService";
import {ServerSideErrorSnackBar} from "../ServerSideErrorSnackBar";

const Row = styled.div`
    display: flex;
    margin: 10px;
`;

const Picture = styled(Row)`
    font-size: 13em;
`;

const DefaultUserPicture = styled(FaUser)`
    margin: auto;
`;

const Image = styled.img`
    margin: auto;
    max-height: 1em;
`;

const NameRow = styled(Row)`
    font-size: 3.5em;
    font-weight: bold;
    color: grey;
    margin: 0;
`;

const WorkRow = styled(Row)`
    margin-top: 0;
`;

const LinkRow = styled(Row)`
    color: #6AC4C4;
`;

export default class UserArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            picture: null,
            firstName: '',
            lastName: '',
            workPosition: '',
            workLocation: '',
            isServerError: false,
        }

        this.handleServerErrorBarClose = this.handleServerErrorBarClose.bind(this);
    }

    componentDidMount() {
        UserService.getMe().then((data) => {
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                workPosition: data.workPosition,
                workLocation: data.workLocation,
                picture: data.picture ? data.picture : null,
            });
        }).catch((e) => {
            this.setState({
                isServerError: true,
            });
            console.error(e);
        });
    }

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,
        })
    }

    render() {
        return (
            <div>
                <Picture>
                    {this.state.picture === null ?
                        <DefaultUserPicture color='#0094C6'/> :
                        <Image src={this.state.picture} alt={"Profile Picture"}/>}
                </Picture>
                <NameRow>
                    {[this.state.firstName, this.state.lastName].filter(value => value).join(" ")}
                </NameRow>
                <WorkRow>
                    {[this.state.workPosition, this.state.workLocation].filter(value => value).join(", ")}
                </WorkRow>
                <LinkRow>
                    <Link to={'/settings'} style={{color: "#0094C6"}}>
                        Profile Settings
                    </Link>
                </LinkRow>
                <LinkRow>
                    <Link to={'/permissionRequests'} style={{color: "#0094C6"}}>
                        Open Permission Requests
                    </Link>
                </LinkRow>
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
            </div>
        );
    }
}
