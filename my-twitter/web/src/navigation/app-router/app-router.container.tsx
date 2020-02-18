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

export const AppRouter: FC<{location: Location}> = ({location}) => {
  navUtils.onNavigationChange(location);
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div exit={{opacity: 0}} style={{width: '100%', minHeight: '100%', display: 'flex'}}>
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
      </motion.div>
    </AnimatePresence>
  );
};
