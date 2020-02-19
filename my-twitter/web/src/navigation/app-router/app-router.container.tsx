import React, {FC} from 'react';
import {Switch, Route} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {Location} from 'history';
import {motion} from 'framer-motion';

import {ProtectedRoute} from 'navigation/app-router/protected-route';
import {LoginPage, SignUpPage, EmailVerificationPage} from 'pages';
import {MAIN_SCREEN, LOGIN_SCREEN, SIGN_UP_SCREEN, EMAIL_VERIFICATION} from 'models/navigation.model';
import {navUtils} from 'services/navigation';
import {AppWrapper} from 'containers/app-wrapper/app-wrapper';
import styled from 'styled-components';

const Motion = styled(motion.div)`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  background: #f0f2f5;
`;

export const AppRouter: FC<{location: Location}> = ({location}) => {
  navUtils.onNavigationChange(location);
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Motion exit={{opacity: 0}}>
        <Switch>
          <Route exact={true} path={LOGIN_SCREEN}>
            <LoginPage />
          </Route>
          <Route exact={true} path={SIGN_UP_SCREEN}>
            <SignUpPage />
          </Route>
          <ProtectedRoute exact={true} path={EMAIL_VERIFICATION}>
            <EmailVerificationPage />
          </ProtectedRoute>
          <ProtectedRoute path={MAIN_SCREEN}>
            <AppWrapper />
          </ProtectedRoute>
        </Switch>
      </Motion>
    </AnimatePresence>
  );
};
