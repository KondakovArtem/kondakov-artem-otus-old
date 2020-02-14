import React, {FC} from 'react';
// import {FirestoreProvider} from 'react-firestore';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {AppRouter} from 'containers/app-router/app-router.container';
// import firebase from 'services/firebase/firebase.service';

const {store, persistor} = initStoreData();

export const App: FC = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <FirestoreProvider firebase={firebase}> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      {/* </FirestoreProvider> */}
    </PersistGate>
  </ReduxProvider>
);
