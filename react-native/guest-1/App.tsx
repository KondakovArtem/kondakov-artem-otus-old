import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import 'react-navigation-magic-move';
import {PersistGate} from 'redux-persist/integration/react';
import {DefaultTheme, Theme, Provider as PaperProvider} from 'react-native-paper';
import initStoreData from './src/redux/store';
import {NavigationContainer} from './src/container/navigation/navigation.container';
//@ts-ignore;
import * as MagicMove from 'react-native-magic-move';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const {store, persistor} = initStoreData();

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2089dc',
    accent: '#f1c40f',
    // text: 'white',
  },
};

export default () => {
  return (
    <MagicMove.Provider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView style={styles.safeArea}>
              <NavigationContainer />
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </PaperProvider>
    </MagicMove.Provider>
  );
};
