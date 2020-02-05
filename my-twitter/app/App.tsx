import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-navigation-magic-move';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
//@ts-ignore;
import * as MagicMove from 'react-native-magic-move';

// import {theme} from './src/constants/theme';
import {NavigationContainer} from './src/containers/navigation/navigation.container';
import initStoreData from './src/redux/store';

const {store, persistor} = initStoreData();
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const App = () => {
  return (
    <ReduxProvider store={store}>
      <MagicMove.Provider>
        <PaperProvider>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView style={styles.safeArea}>
              <NavigationContainer />
            </SafeAreaView>
          </PersistGate>
        </PaperProvider>
      </MagicMove.Provider>
    </ReduxProvider>
  );
};

export default App;
