import React, {FC, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import {isEmpty} from 'lodash-es';
import * as Animatable from 'react-native-animatable';

import {usePrevious} from '@app/services/core/core.service';
import {COMMON_DURATION} from '@app/constants/theme';
import {IPost} from '@app/models/post.model';

export interface IProps {
  children: IPost;
  userUid: string;
}

export interface IHandlers {
  onPress?(post: IPost): void;
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
  },
  view: {
    width: 140,
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

export const HeartComponent: FC<IProps & IHandlers> = ({children: post, userUid, onPress}) => {
  const {likes} = post;
  const lottieRef = useRef<AnimatedLottieView>();
  const preLikes = usePrevious(likes);

  useEffect(() => {
    if (lottieRef.current) {
      let frames;
      const curIncludes = likes && likes.includes(userUid);
      const preIncludes = preLikes && preLikes.includes(userUid);
      if (!preLikes) {
        frames = curIncludes ? [130, 130] : [0, 0];
      } else {
        if ((preIncludes && curIncludes) || (!preIncludes && !curIncludes)) {
          return;
        }
        frames = likes && likes.includes(userUid) ? [59, 107] : [140, 150];
      }
      lottieRef.current.play(...frames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  return (
    <View style={styles.constainer}>
      <LottieView
        ref={ref => (lottieRef.current = ref as AnimatedLottieView)}
        style={styles.view}
        source={require('mytwitter/assets/animation/heart')}
        loop={false}
        autoPlay={false}
        autoSize={false}
        colorFilters={[
          {
            keypath: 'Heart Fill',
            color: '#F00000',
          },
          {
            keypath: 'Heart Small 1',
            color: '#F00000',
          },
          {
            keypath: 'Heart Small 2',
            color: '#00f000',
          },
          {
            keypath: 'Heart Small 3',
            color: '#0000F0',
          },
          {
            keypath: 'Heart Small 4',
            color: '#f000F0',
          },
          {
            keypath: 'Heart Small 4',
            color: '#f0F000',
          },
          {
            keypath: 'Heart Small 5',
            color: '#f00000',
          },
          {
            keypath: 'Heart Small 6',
            color: '#00F0F0',
          },
          {
            keypath: 'Heart Small 6',
            color: '#F0F000',
          },
        ]}
      />

      <TouchableWithoutFeedback onPress={() => onPress && onPress(post)}>
        <View style={styles.textWrapper}>
          {!isEmpty(likes) && (
            <Animatable.Text key={likes.length} style={styles.text} animation={'fadeIn'} duration={COMMON_DURATION}>
              {likes.length}
            </Animatable.Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
