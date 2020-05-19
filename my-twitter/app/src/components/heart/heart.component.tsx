import React, {FC, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import {isEmpty} from 'lodash-es';
import * as Animatable from 'react-native-animatable';

import {usePrevious} from 'services/core/core.service';
import {COMMON_DURATION} from 'constants/theme';

export interface IProps {
  children: string[];
  userUid: string;
}

export interface IHandlers {
  onPress?(): void;
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: 30,
  },
  view: {
    width: 150,
  },
  textWrapper: {
    marginLeft: -10,
    width: 45,
    height: 20,
    position: 'absolute',
    left: '50%',
    overflow: 'visible',
  },
  text: {
    color: 'black',
    paddingLeft: 26,
  },
});

export const HeartComponent: FC<IProps & IHandlers> = ({children: likes, userUid, onPress}) => {
  const lottieRef = useRef<AnimatedLottieView>();
  const inited = useRef(false);
  const progress = useRef(isLike() ? 116 / 116 : 0);
  const preLikes = usePrevious(likes);

  function isLike() {
    return likes && likes.includes(userUid);
  }

  useEffect(() => {
    if (lottieRef.current && inited.current) {
      const preIncludes = preLikes && preLikes.includes(userUid);
      const curIncludes = likes && likes.includes(userUid);
      if ((preIncludes && curIncludes) || (!preIncludes && !curIncludes)) {
        return;
      }
      const frames = isLike() ? [30, 116] : [0, 0];
      lottieRef.current.play(...frames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  useEffect(() => {
    inited.current = true;
  }, []);

  return (
    <View style={styles.constainer}>
      <LottieView
        progress={progress.current}
        ref={ref => (lottieRef.current = ref as AnimatedLottieView)}
        style={styles.view}
        source={require('mytwitter/assets/animation/heart')}
        loop={false}
        autoPlay={false}
        autoSize={false}
        resizeMode="cover"
      />

      <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
        <View style={styles.textWrapper}>
          {!isEmpty(likes) && (
            <Animatable.Text
              useNativeDriver={true}
              key={likes.length}
              style={styles.text}
              animation={'fadeIn'}
              duration={COMMON_DURATION}>
              {likes.length}
            </Animatable.Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
