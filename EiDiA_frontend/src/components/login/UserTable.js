"use strict";

import React from 'react';
import MaterialTable from 'material-table';
import {
    AiOutlineSearch,
    IoMdAddCircle,
    MdArrowDownward,
    MdCheck,
    MdChevronLeft,
    MdChevronRight,
    MdClear,
    MdEdit,
    MdFilterList,
    MdFirstPage,
    MdLastPage,
    MdRemove,
    MdViewColumn,
    RiDeleteBinLine,
    RiSave3Line
} from "react-icons/all";
import UserService from "../../services/UserService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {ServerSideErrorSnackBar} from "../ServerSideErrorSnackBar";


const tableIcons = {
    Add: React.forwardRef((props, ref) => <span ref={ref}> <IoMdAddCircle {...props} /> </span>),
    Check: React.forwardRef((props, ref) => <span ref={ref}> <MdCheck {...props} /> </span>),
    Clear: React.forwardRef((props, ref) => <span ref={ref}> <MdClear {...props} /> </span>),
    Delete: React.forwardRef((props, ref) => <span ref={ref}> <RiDeleteBinLine {...props} /> </span>),
    DetailPanel: React.forwardRef((props, ref) => <span ref={ref}> <MdChevronRight {...props} /> </span>),
    Edit: React.forwardRef((props, ref) => <span ref={ref}> <MdEdit {...props} /> </span>),
    Export: React.forwardRef((props, ref) => <span ref={ref}> <RiSave3Line {...props} /> </span>),
    Filter: React.forwardRef((props, ref) => <span ref={ref}> <MdFilterList {...props} /> </span>),
    FirstPage: React.forwardRef((props, ref) => <span ref={ref}> <MdFirstPage {...props} /> </span>),
    LastPage: React.forwardRef((props, ref) => <span ref={ref}> <MdLastPage {...props} /> </span>),
    NextPage: React.forwardRef((props, ref) => <span ref={ref}> <MdChevronRight {...props} /> </span>),
    PreviousPage: React.forwardRef((props, ref) => <span ref={ref}> <MdChevronLeft {...props} /> </span>),
    ResetSearch: React.forwardRef((props, ref) => <span ref={ref}> <MdClear {...props} /> </span>),
    Search: React.forwardRef((props, ref) => <span ref={ref}> <AiOutlineSearch {...props} /> </span>),
    SortArrow: React.forwardRef((props, ref) => <span ref={ref}> <MdArrowDownward {...props} /> </span>),
    ThirdStateCheck: React.forwardRef((props, ref) => <span ref={ref}> <MdRemove {...props} /> </span>),
    ViewColumn: React.forwardRef((props, ref) => <span ref={ref}> <MdViewColumn {...props} /> </span>)
};

const columns = [
    {title: 'ID', field: 'id', readonly: true, hidden: true},
    {title: 'Username', field: 'username', readonly: true, defaultSort: 'asc'},
    {title: 'First Name', field: 'firstName'},
    {title: 'Last Name', field: 'lastName'},
    {title: 'Work Location', field: 'workLocation'},
    {title: 'Position', field: 'workPosition'},
    {title: 'Password', field: 'password', sorting: false, searchable: false},
    {
        title: 'User Role',
        field: 'userRole',
        lookup: {admin: 'Admin', user: 'Default'},
        searchable: false,
    },
];

export default class UserTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            isServerError: false,
            isSuccess: false,
        }
        this.handleSuccessBarClose = this.handleSuccessBarClose.bind(this);
        this.handleServerErrorBarClose = this.handleServerErrorBarClose.bind(this);
    }

    componentDidMount() {
        UserService.getAllUsersForAdministration().then((data) => {
            this.setState({
                data: [...data.users],
                isLoading: false,
            });
        }).catch((e) => {
            this.setState({
                isServerError: true,
            });
            console.error(e);
        });
    }

    handleSuccessBarClose() {
        this.setState({
            isSuccess: false,
        })
    }

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,
        })
    }

    render() {
        // https://material-table.com/#/docs/all-props
        return (
            <div>
                <MaterialTable title="Users"
                               columns={columns}
                               data={this.state.data}
                               icons={tableIcons}
                               isLoading={this.state.isLoading}
                               editable={{
                                   isDeletable: rowData => rowData.userRole !== "admin",
                                   onRowAdd: (newData) =>
                                       new Promise((resolve, reject) => {
                                           const user = {
                                               username: newData.username,
                                               firstName: newData.firstName,
                                               lastName: newData.lastName,
                                               password: newData.password,
                                               workPosition: newData.workPosition,
                                               workLocation: newData.workLocation,
                                               userRole: newData.userRole,
                                           }
                                           UserService.addUserAdmin(user)
                                               .then(newUser => {
                                                   resolve();
                                                   this.setState((prevState) => {
                                                       const data = [...prevState.data];
                                                       data.push(newUser);
                                                       prevState.isSuccess = true;
                                                       return {...prevState, data};
                                                   });
                                               })
                                               .catch(() => {
                                                   reject();
                                                   this.setState({
                                                       isServerError: true,
                                                   });
                                               });
                                       }),
                                   onRowUpdate: (newData, oldData) =>
                                       new Promise((resolve, reject) => {
                                           const user = {
                                               id: oldData.id,
                                               username: oldData.username,
                                               firstName: newData.firstName,
                                               lastName: newData.lastName,
                                               password: newData.password === '⬤⬤⬤⬤⬤' ? null : newData.password,
                                               workPosition: newData.workPosition,
                                               workLocation: newData.workLocation,
                                               userRole: newData.userRole,
                                           }
                                           UserService.updateUserAdmin(user)
                                               .then(newUser => {
                                                   if (oldData) {
                                                       this.setState((prevState) => {
                                                           const data = [...prevState.data];
                                                           data[data.indexOf(oldData)] = newUser;
                                                           prevState.isSuccess = true;
                                                           return {...prevState, data};
                                                       });
                                                   }
                                                   resolve();
                                               })
                                               .catch(() => {
                                                   reject();
                                                   this.setState({
                                                       isServerError: true,
                                                   });
                                               });
                                       }),
                                   onRowDelete: (oldData) =>
                                       new Promise((resolve, reject) => {
                                           UserService.deleteUserAdmin(oldData.id)
                                               .then(() => {
                                                   this.setState((prevState) => {
                                                       const data = [...prevState.data];
                                                       data.splice(data.indexOf(oldData), 1);
                                                       prevState.isSuccess = true;
                                                       return {...prevState, data};
                                                   });
                                                   resolve();
                                               })
                                               .catch(() => {
                                                   reject();
                                                   this.setState({
                                                       isServerError: true,
                                                   });
                                               });
                                       }),
                               }}
                />
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
                <Snackbar open={this.state.isSuccess}
                          autoHideDuration={5000}
                          onClose={this.handleSuccessBarClose}>
                    <Alert severity="success" onClose={this.handleSuccessBarClose}>
                        Successfully changed user
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}
