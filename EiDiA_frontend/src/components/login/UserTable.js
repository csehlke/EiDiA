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

export default class UserTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {title: 'Username', field: 'username', readonly: true, defaultSort: 'asc'},
                {title: 'First Name', field: 'firstName'},
                {title: 'Last Name', field: 'lastName'},
                {title: 'Work Location', field: 'location'},
                {title: 'Position', field: 'position'},
                {title: 'Password', field: 'password', sorting: false, searchable: false},
                {
                    title: 'User Role',
                    field: 'role',
                    lookup: {admin: 'Admin', user: 'Default'},
                    searchable: false,
                },
            ],
            data: [
                {
                    username: 'carsten',
                    firstName: 'Carsten',
                    lastName: 'Sehlke',
                    location: 'Munich',
                    position: 'Software Engineer',
                    password: '⬤⬤⬤⬤⬤',
                    role: 'admin'
                },
                {
                    username: 'carsten1',
                    firstName: 'Carsten',
                    lastName: 'Sehlke',
                    location: 'Munich',
                    position: 'Software Engineer',
                    password: '⬤⬤⬤⬤⬤',
                    role: 'admin'
                },
                {
                    username: 'carsten2',
                    firstName: 'Carsten',
                    lastName: 'Sehlke',
                    location: 'Munich',
                    position: 'Software Engineer',
                    password: '⬤⬤⬤⬤⬤',
                    role: 'admin'
                },
            ],
        }
    }

    render() {
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

        return (
            <MaterialTable title="Users"
                           columns={this.state.columns}
                           data={this.state.data}
                           icons={tableIcons}
                           editable={{
                               isDeletable: rowData => rowData.role !== "admin",
                               onRowAdd: (newData) =>
                                   new Promise((resolve) => {
                                       setTimeout(() => {
                                           resolve();
                                           this.setState((prevState) => {
                                               const data = [...prevState.data];
                                               newData['password'] = '⬤⬤⬤⬤⬤';
                                               data.push(newData);
                                               return {...prevState, data};
                                           });
                                       }, 600);
                                   }),
                               onRowUpdate: (newData, oldData) =>
                                   new Promise((resolve) => {
                                       setTimeout(() => {
                                           resolve();
                                           if (oldData) {
                                               this.setState((prevState) => {
                                                   const data = [...prevState.data];
                                                   newData['password'] = '⬤⬤⬤⬤⬤';
                                                   data[data.indexOf(oldData)] = newData;
                                                   return {...prevState, data};
                                               });
                                           }
                                       }, 600);
                                   }),
                               onRowDelete: (oldData) =>
                                   new Promise((resolve) => {
                                       setTimeout(() => {
                                           resolve();
                                           this.setState((prevState) => {
                                               const data = [...prevState.data];
                                               data.splice(data.indexOf(oldData), 1);
                                               return {...prevState, data};
                                           });
                                       }, 600);
                                   }),
                           }}
            />
        );
    }
}
