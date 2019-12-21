import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import {MainScreen} from './src/screens/main/main.screen';
import configuredStore from './src/redux/store';

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});

const App = () => {
  return (
    <Provider store={configuredStore}>
      <SafeAreaView style={styles.safeArea}>
        <MainScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
