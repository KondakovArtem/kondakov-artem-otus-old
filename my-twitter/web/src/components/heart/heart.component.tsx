import React, {FC, useEffect, useRef, CSSProperties} from 'react';

import Lottie from 'react-lottie';
import {isEmpty} from 'lodash-es';

import {usePrevious} from 'services/core/core.service';
import {COMMON_DURATION} from 'constants/theme';
import animationData from 'assets/animation/heart.json';

export interface IProps {
  children: string[];
  userUid: string;
}

export interface IHandlers {
  onPress?(): void;
}

const styles: {
  [key: string]: CSSProperties;
} = {
  constainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    position: 'relative',
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
    top: '4px',
  },
  text: {
    color: 'black',
    paddingLeft: 26,
  },
};

export const HeartComponent: FC<IProps & IHandlers> = ({children: likes, userUid, onPress}) => {
  const lottieRef = useRef<Lottie>(null);
  const inited = useRef(false);
  const preLikes = usePrevious(likes);

  function isLike() {
    return likes && likes.includes(userUid);
  }

  useEffect(() => {
    if (lottieRef.current) {
      if (inited.current) {
        const preIncludes = preLikes && preLikes.includes(userUid);
        const curIncludes = likes && likes.includes(userUid);
        if ((preIncludes && curIncludes) || (!preIncludes && !curIncludes)) {
          return;
        }
        // debugger;
        isLike()
          ? (lottieRef.current as any).anim.goToAndPlay(30, true)
          : (lottieRef.current as any).anim.goToAndStop(0, true);
      } else {
        // debugger;
        isLike()
          ? (lottieRef.current as any).anim.goToAndStop(116, true)
          : (lottieRef.current as any).anim.goToAndStop(0, true);
      }
    }
    return () => {
      console.log('destroy');
    };
  }, [likes]);

  useEffect(() => {
    inited.current = true;
  }, []);

  return (
    <div style={styles.constainer} onClick={() => onPress && onPress()}>
      <Lottie
        // progress={progress.current}
        ref={ref => ((lottieRef as any).current = ref)}
        // style={styles.view}
        options={{
          loop: false,
          autoplay: false,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={30}
        width={110}
      />
      <div style={styles.textWrapper}>
        {!isEmpty(likes) && (
          <span key={likes.length} style={styles.text}>
            {likes.length}
          </span>
        )}
      </div>
    </div>
  );
};
