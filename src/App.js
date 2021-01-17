import React, {useEffect, useState} from 'react';
import Table from "@material-ui/core/Table";
import DataTable from "./components/DataTable";
import NewDataTable from "./components/NewDataTable";
import {SnackbarProvider, useSnackbar} from 'notistack';
import {DataContext} from "./context/data";
import axios from "./utils/axios";
import {Auth} from "aws-amplify";


export default function App() {

    const [data, setData] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    const getNewData = () => {
        const crosA = {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}};
        axios.get("/patient", crosA).then(
            result => {
                if (result.status === 200) {
                    setData(result.data);
                }
            }).catch(e => {
            enqueueSnackbar("Server Error", {variant: 'error'})
        });

    }

    useEffect(async () => {
        await Auth.currentAuthenticatedUser().then(u => {
            let authToken = "Bearer " + u.getSignInUserSession().getIdToken().getJwtToken();
            axios.defaults.headers.common['Authorization'] = authToken;
        })
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
