import React from "react";
import { Switch, Route } from "react-router-dom";

import { CityDashboard } from "../city-dashboard/city-dashboard.container";
import { CityForm } from "../city-form/city-form.container";
import { Routes } from "../../models/router.model";

export const BodyRouterContainer: React.FunctionComponent<{}> = () => {
    return (
        <Switch>
            <Route exact={true} path={Routes.root}>
                <CityDashboard />
            </Route>
            <Route path={Routes.cityForm}>
                <CityForm/>
            </Route>
        </Switch>
    );
}
