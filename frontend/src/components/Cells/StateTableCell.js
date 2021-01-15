import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 200,
        height: 40
    },
    input: {
        width: 200,
        height: 40
    }
}));

export default function StateTableCell({row, name, onChange}) {
    const classes = useStyles();
    const {isEditMode} = row;

    function renderState(input) {
        switch (input) {
            case 'OOE':
                return 'Oberösterreich';
            case 'W':
                return 'Wien';
            case 'NOE':
                return 'Niederösterreich';
            case 'BGLD':
                return 'Burgenland';
            case 'STMK':
                return 'Steiermark';
            case "KTN":
                return 'Kärnten';
            case 'T':
                return 'Tirol';
            case 'SBG':
                return 'Salzburg';
            case 'VBG':
                return 'Vorarlberg';
        }
    }

    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Select
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                >
                    <MenuItem value={"OOE"}>Oberösterreich</MenuItem>
                    <MenuItem value={"W"}>Wien</MenuItem>
                    <MenuItem value={"NOE"}>Niederösterreich</MenuItem>
                    <MenuItem value={"BGLD"}>Burgenland</MenuItem>
                    <MenuItem value={"STMK"}>Steiermark</MenuItem>
                    <MenuItem value={"KTN"}>Kärnten</MenuItem>
                    <MenuItem value={"T"}>Tirol</MenuItem>
                    <MenuItem value={"SBG"}>Salzburg</MenuItem>
                    <MenuItem value={"VBG"}>Vorarlberg</MenuItem>
                </Select>
            ) : (
                renderState(row[name])
            )}
        </TableCell>
    );
};