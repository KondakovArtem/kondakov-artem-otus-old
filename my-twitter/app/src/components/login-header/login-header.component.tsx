import React, {FC} from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {COMMON_DURATION} from 'constants/theme';

const bottomLeftRadius = 150;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: bottomLeftRadius,
    backgroundColor: '#F06332',
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageBackground: {
    borderBottomLeftRadius: bottomLeftRadius,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 42,
  },
  logo: {
    height: 160,
    aspectRatio: 1,
  },
  titleContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  title: {
    color: 'white',
  },
});

export const LoginHeaderComponent: FC = () => {
  return (
    <MagicMove.View
      id="login_header"
      transition={MagicMove.Transition.morph}
      duration={COMMON_DURATION}
      style={styles.headerContainer}>
      <ImageBackground
        style={styles.header}
        imageStyle={styles.imageBackground}
        source={require('mytwitter/assets/images/launch_screen.jpg')}>
        <View style={styles.contentContainer}>
          <MagicMove.Image
            id="logo"
            transition={MagicMove.Transition.morph}
            duration={COMMON_DURATION - 50}
            source={require('mytwitter/assets/images/logo.png')}
            style={styles.logo}
            resizeMode={'contain'}
          />
          <View style={styles.titleContainer}>
            <MagicMove.Text id="logo_text" transition={MagicMove.Transition.morph} duration={150} style={styles.title}>
              Login
            </MagicMove.Text>
          </View>
        </View>
      </ImageBackground>
    </MagicMove.View>
  );
};
