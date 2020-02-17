import React, {FC} from 'react';
// import {FirestoreProvider} from 'react-firestore';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter, Route} from 'react-router-dom';

import {AppRouter} from 'containers/app-router/app-router.container';
import initStoreData from 'store';
import {RootProvider} from 'containers/root-provider/root-provider';
import {navUtils} from 'services/navigation';

const {store, persistor} = initStoreData();

export const App: FC = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Route
          render={({location, history, match}) => {
            navUtils.setTopLevelNavigator(history);
            return (
              <RootProvider>
                <AppRouter location={location} />
              </RootProvider>
            );
          }}
        />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
