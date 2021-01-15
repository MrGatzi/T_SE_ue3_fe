import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
    tableCell: {
        width: 60,
        height: 40
    },
    input: {
        width: 60,
        height: 40
    }
}));

export default function GenderTableCell({row, name, onChange}) {
    const classes = useStyles();
    const {isEditMode} = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Select
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                >
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"W"}>W</MenuItem>
                    <MenuItem value={"U"}>U</MenuItem>
                </Select>
            ) : (
                row[name]
            )}
        </TableCell>
    );
};