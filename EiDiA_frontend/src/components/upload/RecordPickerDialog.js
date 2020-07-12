"use strict";

import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

class RecordPickerDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: ["Volkswagen",
                "BMW",
                "Thyssenkrup",
                "Google",
                "Facebook",
                "Microsoft",
                "ABC Company",
                "Adidas",
                "lenovo Limited",
                "IBM",
                "TrueThat",
                "hello",
                "abc",
                "def"
            ],
            search: '',
        }
        this.closeDialog = this.closeDialog.bind(this);
    }

    closeDialog() {
        this.props.onClose();
    }


    render() {
        return (
            <Dialog open={this.props.open} onClose={this.closeDialog}>
                <DialogTitle>
                    Assign To Record
                </DialogTitle>
            </Dialog>
        )
    }
}

export default RecordPickerDialog;
