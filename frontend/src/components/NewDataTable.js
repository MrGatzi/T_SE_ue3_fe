import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import NewDataRow from "./NewDataRow";
import Typography from "@material-ui/core/Typography";

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
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    },
    title: {
        marginLeft: 30,
        marginTop: 20,
    },
}));

export default function NewDataTable() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6" component="h2">
                Neuer Eintrag:
            </Typography>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Datum Infektion</TableCell>
                        <TableCell align="left">Datum Ende</TableCell>
                        <TableCell align="left">Alter</TableCell>
                        <TableCell align="left">Geschlecht</TableCell>
                        <TableCell align="left">Vorerkrankung</TableCell>
                        <TableCell align="left">Bezirk</TableCell>
                        <TableCell align="left">Bundesland</TableCell>
                        <TableCell align="left"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <NewDataRow/>
                </TableBody>
            </Table>
        </Paper>
    );
}
