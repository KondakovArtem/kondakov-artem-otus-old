import React, {FC, ReactElement} from 'react';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {Header} from 'react-native-elements';
import {StyleSheet, StatusBar} from 'react-native';
import {statusBackground, headerBackground, COMMON_DURATION} from '@app/constants/theme';

export interface IProps {
  children: string;
  leftComponent?: ReactElement;
}

export interface IHandlers {}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: 50,
    backgroundColor: headerBackground,
  },
});

export const HeaderComponent: FC<IProps & IHandlers> = ({children, leftComponent}) => {
  return (
    <>
      <StatusBar backgroundColor={statusBackground} barStyle="light-content" />
      <MagicMove.View
        // debug
        id="login_header"
        transition={MagicMove.Transition.morph}
        duration={COMMON_DURATION}>
        <Header
          containerStyle={styles.header}
          leftComponent={
            leftComponent ? (
              leftComponent
            ) : (
              <MagicMove.Image
                id="logo"
                transition={MagicMove.Transition.morph}
                duration={COMMON_DURATION}
                source={require('mytwitter/assets/images/logo.png')}
                style={{height: 60, aspectRatio: 1}}
                resizeMode={'contain'}
              />
            )
          }
          centerComponent={
            <MagicMove.Text
              id="logo_text"
              transition={MagicMove.Transition.morph}
              duration={COMMON_DURATION}
              style={{color: 'white', paddingLeft: 10}}>
              {children}
            </MagicMove.Text>
          }
        />
      </MagicMove.View>
    </>
  );
};
