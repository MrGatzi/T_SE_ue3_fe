import React, {useEffect, useState} from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from "@material-ui/icons/EditOutlined";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles} from "@material-ui/core/styles";
import TextTableCell from "./Cells/TextTableCell";
import GenderTableCell from "./Cells/GenderTableCell";
import StateTableCell from "./Cells/StateTableCell";
import NumberTableCell from "./Cells/NumberTableCell";
import DateTableCell from "./Cells/DateTableCell";
import {useSnackbar} from "notistack";
import axios from '../utils/axios';
import {useData} from "../context/data";

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
        width: 40
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

export default function DataRow() {
    const initalState = {
        id: Math.floor(Math.random() * 1100),
        dateInfect: new Date() / 1000,
        dateEnd: new Date() / 1000,
        birthday: 0,
        gender: "U",
        preConditions: "",
        district: "",
        state: "OOE",
        isEditMode: true
    }
    const [row, setRow] = React.useState(initalState);
    const {data, getPatientData} = useData();
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();

    const onChange = (e, row) => {
        const value = e.target.value;
        const name = e.target.name;
        const newRow = row => {
            return {...row, [name]: value};
        };
        setRow(newRow);
    };

    const onAdd = () => {
        const config = {headers: {'Content-Type': 'application/json'}};
        const input = {
            id: row.id,
            dateInfect: row.dateInfect,
            dateEnd: row.dateEnd,
            birthday: row.birthday,
            gender: row.gender,
            preConditions: row.preConditions,
            district: row.district,
            state: row.state
        }
        axios.post("/patient", input, config).then(
            result => {
                if (result.status === 200) {
                    enqueueSnackbar("Data Added", {variant: 'success'});
                    initalState.id = Math.floor(Math.random() * 1100);
                    setRow(initalState);
                    getPatientData();
                }
            }).catch(e => {
            enqueueSnackbar("Server Error", {variant: 'error'});
        });

    };

    return (
        <TableRow key={row.id}>
            <DateTableCell {...{row, name: "dateInfect", onChange}} />
            <DateTableCell {...{row, name: "dateEnd", onChange}} />
            <NumberTableCell {...{row, name: "birthday", onChange}} />
            <GenderTableCell {...{row, name: "gender", onChange}} />
            <TextTableCell {...{row, name: "preConditions", onChange}} />
            <TextTableCell {...{row, name: "district", onChange}} />
            <StateTableCell {...{row, name: "state", onChange}} />
            <TableCell className={classes.selectTableCell}>
                <IconButton aria-label="add" onClick={() => onAdd()}>
                    <AddIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
