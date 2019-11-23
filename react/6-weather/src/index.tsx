import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'

import "core-js/stable";
import "regenerator-runtime/runtime";

import { AppContainer } from "./containers/app/app.container";
import configuredStore from "./redux/store";



const mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store = {configuredStore}>
        <AppContainer/>
    </Provider>

, mountNode);