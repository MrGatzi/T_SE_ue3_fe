import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    tableCell: {
        width: 110,
        height: 40
    },
}));

export default function DateTableCell({row, name, onChange}) {
    const classes = useStyles();
    const {isEditMode} = row;

    function changeDate(input) {
        let e = {
            target: {
                value: true,
                name: true
            }
        };
        e.target.value = input.getTime() / 1000;
        e.target.name = name;
        onChange(e, row);
    };

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }


    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        value={new Date(row[name]) * 1000}
                        onChange={e => changeDate(e)}
                    />
                </MuiPickersUtilsProvider>
            ) : (
                timeConverter(row[name])
            )}
        </TableCell>
    );
};