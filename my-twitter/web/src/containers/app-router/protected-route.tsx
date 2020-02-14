import React, {FC} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Routes} from 'models/router.model';
import {isAuth} from 'services/auth/auth.service';

export interface IProps {
  exact: boolean;
  path: string;
}

export const ProtectedRoute: FC<IProps> = ({children, ...rest}) => (
  <Route
    {...rest}
    render={({location}) =>
      isAuth() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: Routes.login,
            state: {from: location},
          }}
        />
      )
    }
  />
);
