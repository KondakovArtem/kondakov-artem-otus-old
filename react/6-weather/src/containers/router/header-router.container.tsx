import React from "react";
import { Switch, Route } from "react-router-dom";

import { CityFormHeader } from "../city-form-header/city-form-header.container";
import { CityDashboardHeader } from "../city-dashboard-header/city-dashboard-header.container";
import { Routes } from "../../models/router.model";



export const HeaderRouterContainer: React.FunctionComponent<{}> = () => {
    return (
        <Switch>
            <Route exact={true} path={Routes.root}>
                <CityDashboardHeader />
            </Route>
            <Route path={Routes.cityForm}>
                <CityFormHeader />
            </Route>
        </Switch>
    );
}
