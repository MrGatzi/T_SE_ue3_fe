import React, {useEffect, useState} from 'react';
import Table from "@material-ui/core/Table";
import DataTable from "./components/DataTable";
import NewDataTable from "./components/NewDataTable";
import {SnackbarProvider, useSnackbar} from 'notistack';
import {DataContext} from "./context/data";
import axios from "./utils/axios";

export default function App() {

    const [data, setData] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    const getNewData = () => {
        const config = {headers: {'Content-Type': 'application/json'}};

        axios.get("/patient", config).then(
            result => {
                if (result.status === 200) {
                    setData(result.data);
                }
            }).catch(e => {
            enqueueSnackbar("Server Error", {variant: 'error'})
        });

    }

    useEffect(() => {
        getNewData();
    }, []);

    return (
        <div>

                <DataContext.Provider value={{data, getPatientData: getNewData}}>
                    <NewDataTable></NewDataTable>
                    <DataTable></DataTable>
                </DataContext.Provider>

        </div>
    );
}
