
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from "react-dom";

import { AppContainer } from "./containers/app/app.container";

var mountNode = document.getElementById("app");
ReactDOM.render(<AppContainer />, mountNode);