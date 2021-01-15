import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
    tableCell: {
        width: 50,
        height: 40
    },
    input: {
        width: 60,
        height: 40
    }
}));

export default function NumberTableCell({row, name, onChange}) {
    const classes = useStyles();
    const {isEditMode} = row;

    function changeNumber(input) {
        input.target.value = input.target.value * 31536000
        onChange(input, row);
    }

    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={Math.floor(row[name] / 31536000)}
                    name={name}
                    type="number"
                    onChange={e => changeNumber(e , row)}
                    className={classes.input}
                />
            ) : (
                Math.floor(row[name] / 31536000)
            )}
        </TableCell>
    );
};
