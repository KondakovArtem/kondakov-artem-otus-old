import React, {FunctionComponent, ReactElement} from 'react';
import {Header} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import {MainMenuContainer} from '../../container/main-menu/main-menu.container';

export interface IProps {
  titleComponent: () => ReactElement;
}

export interface IHandlers {}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: 50,
  },
});

export const HeaderBarComponent: FunctionComponent<IProps & IHandlers> = props => {
  const {titleComponent} = props;
  return (
    <Header
      placement="left"
      containerStyle={styles.header}
      leftComponent={{
        icon: 'menu',
        color: '#fff',
      }}
      centerComponent={titleComponent()}
      rightComponent={<MainMenuContainer />}
    />
  );
};
