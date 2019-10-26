import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './components/app/app.component';


var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);