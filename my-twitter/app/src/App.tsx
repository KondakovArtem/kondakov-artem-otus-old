import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-navigation-magic-move';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
//@ts-ignore;
import * as MagicMove from 'react-native-magic-move';

import {NavigationContainer} from 'containers/navigation/navigation.container';
import initStoreData from 'store';
import {AddPostButton} from 'containers/add-post-button/add-post-button.container';
import {DialogManager} from 'containers/dialog-manager/dialog-manager.container';
// import {HeartComponent} from './components/heart/heart.component';

const {store, persistor} = initStoreData();
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const App = () => {
  // const [likes, setLikes] = useState(['123']);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MagicMove.Provider>
          <PaperProvider>
            <SafeAreaView style={styles.safeArea}>
              <NavigationContainer />
              <AddPostButton />
              <DialogManager />
            </SafeAreaView>
          </PaperProvider>
        </MagicMove.Provider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
