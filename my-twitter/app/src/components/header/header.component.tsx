import React, {FC, ReactElement} from 'react';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {Header} from 'react-native-elements';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';

import {headerBackground, COMMON_DURATION, statusBarProps} from 'constants/theme';

export interface IProps {
  children?: string;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
  centerComponent?: ReactElement;
  rootId?: string;
  centerContainerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
}

export interface IHandlers {}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    paddingHorizontal: 0,
    height: 50,
    backgroundColor: headerBackground,
  },
  logoImage: {
    height: 60,
    aspectRatio: 1,
  },
  leftContainerStyle: {
    flexShrink: 1,
  },
  centerContainerStyle: {
    alignItems: 'flex-start',
    flexGrow: 10,
  },
  rightContainerStyle: {
    flexShrink: 1,
  },

  centerText: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 18,
  },
});

export const HeaderComponent: FC<IProps & IHandlers> = ({
  children,
  centerComponent,
  leftComponent,
  rightComponent,
  centerContainerStyle,
  leftContainerStyle,
  rightContainerStyle,
  rootId = 'login_header',
}) => {
  const getLeftComponent = () => {
    return (
      <>
        {leftComponent && leftComponent}
        {!leftComponent && (
          <MagicMove.Image
            id="logo"
            transition={MagicMove.Transition.morph}
            duration={COMMON_DURATION}
            source={require('mytwitter/assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode={'contain'}
          />
        )}
      </>
    );
  };

  const getCenterComponent = () => (
    <>
      {centerComponent && centerComponent}
      {children && (
        <MagicMove.Text
          id="logo_text"
          transition={MagicMove.Transition.morph}
          duration={COMMON_DURATION}
          style={styles.centerText}>
          {children}
        </MagicMove.Text>
      )}
    </>
  );

  return (
    <MagicMove.View id={rootId} transition={MagicMove.Transition.morph} duration={COMMON_DURATION}>
      <Header
        statusBarProps={statusBarProps}
        centerContainerStyle={StyleSheet.flatten([styles.centerContainerStyle, centerContainerStyle])}
        leftContainerStyle={StyleSheet.flatten([styles.leftContainerStyle, leftContainerStyle])}
        rightContainerStyle={StyleSheet.flatten([styles.rightContainerStyle, rightContainerStyle])}
        containerStyle={styles.header}
        leftComponent={getLeftComponent()}
        centerComponent={getCenterComponent()}
        rightComponent={rightComponent}
      />
    </MagicMove.View>
  );
};
