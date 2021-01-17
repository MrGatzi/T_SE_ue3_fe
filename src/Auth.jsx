import Amplify, {Auth} from "aws-amplify";
import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
import * as config from "./aws-exports.json";
import App from "./App";
import React from "react";
import axios from './utils/axios';
import {AppBar, Menu, Toolbar} from "@material-ui/core";

Amplify.configure({
    Auth: {
        region: config.userPoolRegion,
        userPoolId: config.userPoolId,
        userPoolWebClientId: config.userPoolWebClientId,
        identityPoolId: config.identityPoolID,
    },
});


const Main = () => {
    return (
        <div>
            <AppBar position="static">
                <AmplifySignOut/>
            </AppBar>
            <App/>
        </div>
    );
};

// Wrap your export so that it will require auth to access this page
export default withAuthenticator(Main);
