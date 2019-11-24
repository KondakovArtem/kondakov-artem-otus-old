import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'

import "core-js/stable";
import "regenerator-runtime/runtime";

import configuredStore from "./redux/store";
import { AppComponent } from './components/app/app.component';

const mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store = {configuredStore}>
        <AppComponent/>
    </Provider>
, mountNode);