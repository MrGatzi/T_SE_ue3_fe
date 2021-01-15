import React, {useEffect, useState, Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DataRow from "./DataRow";
import Typography from "@material-ui/core/Typography";
import {useData} from "../context/data";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";

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
        marginTop: 30,
    },
    head: {
        width: "90%",
    },
}));


export default function DataTable() {
    const classes = useStyles();
    const {data, getPatientData} = useData();
    const [rows, setRows] = React.useState([]);
    const [date1, setDate1] = React.useState(new Date());
    const [date2, setDate2] = React.useState(new Date());

    useEffect(() => {
        setRows(data);
    }, [data]);

    function checkFilter() {
        return date1 !== date2 && date1 < date2;
    };

    function sorter(a, b) {
        if (a.dateInfect < b.dateInfect) return -1;
        if (a.dateInfect > b.dateInfect) return 1;
        return 0;
    }
    return (
        <Paper className={classes.root}>
            <Grid className={classes.head} container direction="row" spacing={3}>
                <Grid item className={classes.title}>
                    <Typography variant="h6" component="h2">
                        Daten:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            variant="inline"
                            format="dd-MM-yyyy"
                            margin="normal"
                            label="von"
                            value={date1}
                            onChange={e => setDate1(e)}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            variant="inline"
                            format="dd-MM-yyyy"
                            margin="normal"
                            label="bis"
                            value={date2}
                            onChange={e => setDate2(e)}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
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
                    {checkFilter() ? (rows.filter(row => row.dateInfect>date1/1000 && row.dateInfect<date2/1000).sort(function(a, b) {
                        if (a.dateInfect < b.dateInfect) return -1;
                        if (a.dateInfect > b.dateInfect) return 1;
                        return 0;
                    }).map(row => (<DataRow data={row}/>))):(rows.sort(function(a, b) {
                        if (a.dateInfect < b.dateInfect) return -1;
                        if (a.dateInfect > b.dateInfect) return 1;
                        return 0;
                    }).map(row => (<DataRow data={row}/>)))

                    }
                </TableBody>
            </Table>
        </Paper>
    );

}
