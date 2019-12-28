import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainerComponent} from 'react-navigation';
import {MenuProvider} from 'react-native-popup-menu';

import configuredStore from './src/redux/store';
import {setTopLevelNavigator} from './src/services/navigation/navigation.service';
import {Navigation} from './src/navigation/navigation';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default () => {
  return (
    <MenuProvider>
      <Provider store={configuredStore}>
        <SafeAreaView style={styles.safeArea}>
          <Navigation
            ref={navigatorRef => {
              setTopLevelNavigator(navigatorRef as NavigationContainerComponent);
            }}
          />
        </SafeAreaView>
      </Provider>
    </MenuProvider>
  );
};
