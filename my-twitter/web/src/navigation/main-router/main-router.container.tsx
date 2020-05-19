import React, {FC} from 'react';
import {Switch, Route} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {motion} from 'framer-motion';

import {
  MAIN_SCREEN,
  EXPLORE_SCREEN,
  USER_PROFILE_SCREEN,
  USER_PROFILE_EDIT_SCREEN,
  FOLLOW_SCREEN,
  USER_INFO_SCREEN,
} from 'models/navigation.model';
import {MainPage, ExplorePage, UserProfilePage, UserProfileEditPage, Page404} from 'pages';
import {FollowsPage} from 'pages/follows/follows.page';
import {UserInfoPage} from 'pages/user-info/user-info.page';

export const MainRouter: FC = () => (
  <AnimatePresence exitBeforeEnter initial={false}>
    <motion.div
      exit={{opacity: 0}}
      style={{
        width: '100%',
        minHeight: '100%',
        maxWidth: '600px',
        border: '1px solid #9e9e9e52',
        borderBottom: 0,
        borderTop: 0,
      }}>
      <Switch>
        <Route exact={true} path={MAIN_SCREEN}>
          <MainPage />
        </Route>
        <Route exact={true} path={EXPLORE_SCREEN}>
          <ExplorePage />
        </Route>
        <Route exact={true} path={USER_PROFILE_SCREEN}>
          <UserProfilePage />
        </Route>
        <Route exact={true} path={USER_PROFILE_EDIT_SCREEN}>
          <UserProfileEditPage />
        </Route>
        <Route exact={true} path={FOLLOW_SCREEN}>
          <FollowsPage />
        </Route>
        <Route exact={true} path={USER_INFO_SCREEN}>
          <UserInfoPage />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </motion.div>
  </AnimatePresence>
);
