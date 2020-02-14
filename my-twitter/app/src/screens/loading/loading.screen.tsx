import React, {FC} from 'react';
import {StatusBar, ImageBackground, View, Image, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import {statusBarProps} from 'constants/theme';

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  background: {flex: 1},
  imageContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  logo: {aspectRatio: 1, height: 160},
  preloaderContainer: {flex: 2, alignItems: 'center', justifyContent: 'center'},
});

export const LoadingScreenComponent: FC = () => {
  return (
    <>
      <StatusBar {...statusBarProps} />
      <View style={styles.wrapper}>
        <ImageBackground source={require('mytwitter/assets/images/launch_screen.jpg')} style={styles.background}>
          <View style={styles.imageContainer}>
            <Image style={styles.logo} source={require('mytwitter/assets/images/logo.png')} resizeMode="contain" />
          </View>
          <View style={styles.preloaderContainer}>
            <LottieView source={require('mytwitter/assets/animation/preloader')} loop={true} autoPlay={true} autoSize />
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export const LoadingScreen = LoadingScreenComponent;
