import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import 'react-navigation-magic-move';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';
import initStoreData from './src/redux/store';
import {NavigationContainer} from './src/container/navigation/navigation.container';
import {theme} from './src/constants/theme';

//@ts-ignore;
import * as MagicMove from 'react-native-magic-move';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const {store, persistor} = initStoreData();

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
