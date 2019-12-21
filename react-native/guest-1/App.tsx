import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { AppComponent } from './src/components/app/app.component';

import configuredStore from "./src/redux/store";


const App = () => {
  return (
    <>
      <Provider store = {configuredStore}>
        <SafeAreaView style={{flex: 1}}>
          <AppComponent/>
        </SafeAreaView>
      </Provider>
    </>
  );
};

export default App;
