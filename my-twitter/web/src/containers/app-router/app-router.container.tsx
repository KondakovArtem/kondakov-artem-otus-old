import React, {FC} from 'react';
import {Switch, Route} from 'react-router-dom';

import {Routes} from 'models/router.model';
import {ProtectedRoute} from 'containers/app-router/protected-route';
import {LoginPage, Page404} from 'pages';

export const AppRouter: FC<{}> = () => (
  <Switch>
    <ProtectedRoute exact={true} path={Routes.root}></ProtectedRoute>
    <Route exact={true} path={Routes.login}>
      <LoginPage />
    </Route>
    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
);
