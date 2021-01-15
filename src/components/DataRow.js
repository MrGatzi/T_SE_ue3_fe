import React, {useEffect, useState} from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
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
        width: 60
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

export default function DataRow(props) {
    const [previous, setPrevious] = React.useState({});
    const {data, getPatientData} = useData();
    const [row, setRow] = React.useState(props.data);
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setRow(props.data);
    }, [props.data]);

    const onToggleEditMode = () => {
        const newRow = row => {
            return {...row, ["isEditMode"]: !row.isEditMode};
        };
        setRow(newRow);
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({...state, [row.id]: row}));
        }
        const value = e.target.value;
        const name = e.target.name;
        const newRow = row => {
            return {...row, [name]: value, updated: true};
        };
        setRow(newRow);
    };

    const onDelete = () => {
        const config = {headers: {'Content-Type': 'application/json'}};

        axios.delete("/patient/" + row.id, config).then(
            result => {
                if (result.status === 200) {
                    enqueueSnackbar("Data Deleted", {variant: 'success'});
                    getPatientData();
                }
            }).catch(e => {
            enqueueSnackbar("Server Error", {variant: 'error'});
        });

        onToggleEditMode();
    };

    const onUpdate = () => {
        if (row.updated) {
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
            axios.put("/patient/" + row.id, input, config).then(
                result => {
                    if (result.status === 200) {
                        enqueueSnackbar("Data Updated", {variant: 'success'});
                        getPatientData();
                    }
                }).catch(e => {
                enqueueSnackbar("Server Error", {variant: 'error'});
            });
        }

        onToggleEditMode();
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
                {row.isEditMode ? (
                    <>
                        <IconButton aria-label="done" onClick={() => onUpdate()}>
                            <DoneIcon/>
                        </IconButton>
                        <IconButton aria-label="revert" onClick={() => onDelete()}>
                            <RevertIcon/>
                        </IconButton>
                    </>
                ) : (
                    <IconButton aria-label="delete" onClick={() => onToggleEditMode()}>
                        <EditIcon/>
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
}
