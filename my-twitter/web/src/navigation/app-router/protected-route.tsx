import React, {FC} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isAuth} from 'services/auth/auth.service';
import {LOGIN_SCREEN} from 'models/navigation.model';

export interface IProps {
  exact?: boolean;
  path: string;
}

export const ProtectedRoute: FC<IProps> = ({children, ...rest}) => (
  <Route
    {...rest}
    render={({location}) => {
      return isAuth() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: LOGIN_SCREEN,
            state: {from: location},
          }}
        />
      );
    }}
  />
);
