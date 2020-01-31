import React, {ReactElement, FC} from 'react';
import {Header} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import {MainMenuContainer} from '@app/container/main-menu/main-menu.container';

export interface IProps {
  titleComponent: () => ReactElement;
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: 50,
  },
});

export const HeaderBarComponent: FC<IProps> = ({titleComponent}) => {
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
