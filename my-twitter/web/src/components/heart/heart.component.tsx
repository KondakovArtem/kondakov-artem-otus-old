import React, {FC, useEffect, useRef, useState} from 'react';
import {createUseStyles} from 'react-jss';

import Lottie from 'react-lottie';
import {isEmpty} from 'lodash-es';

import {usePrevious} from 'services/core/core.service';
import animationData from 'assets/animation/heart.json';
import {Badge} from 'antd';

export interface IProps {
  children: string[];
  userUid: string;
}

export interface IHandlers {
  onPress?(): void;
}

const useStyles = createUseStyles({
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
    marginLeft: 26,
  },
  badge: {
    '&>sup': {
      backgroundColor: 'transparent',
      color: '#222',
      boxShadow: 'none',
    },
    marginLeft: 0,
    left: 'calc(50% + 10px)',
    top: '-1px',
  },
});

export const HeartComponent: FC<IProps & IHandlers> = ({children: likes, userUid, onPress}) => {
  const lottieRef = useRef<Lottie>(null);
  const inited = useRef(false);
  const preLikes = usePrevious(likes);
  const [isAnimStop, setAnimStop] = useState(false);
  const classes = useStyles();

  function isLike() {
    return likes && likes.includes(userUid);
  }

  function stopFrame(anim: any, frame: number) {
    anim.goToAndStop(frame, true);
    setAnimStop(true);
  }
  function runFrame(anim: any, frame: number) {
    anim.goToAndPlay(frame, true);
    setAnimStop(false);
  }

  useEffect(() => {
    if (lottieRef.current) {
      const anim = (lottieRef.current as any).anim;
      if (inited.current) {
        const preIncludes = preLikes && preLikes.includes(userUid);
        const curIncludes = likes && likes.includes(userUid);
        if ((preIncludes && curIncludes) || (!preIncludes && !curIncludes)) {
          return;
        }
        isLike() ? runFrame(anim, 30) : stopFrame(anim, 0);
      } else {
        isLike() ? stopFrame(anim, 115) : stopFrame(anim, 0);
      }
    }
    // eslint-disable-next-line
  }, [likes]);

  useEffect(() => {
    inited.current = true;
  }, []);

  return (
    <div className={classes.constainer} onClick={() => onPress && onPress()}>
      <Lottie
        ref={ref => ((lottieRef as any).current = ref)}
        isPaused={isAnimStop}
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
      <div className={classes.textWrapper}>
        {!isEmpty(likes) && <Badge count={likes.length} className={classes.badge} />}
      </div>
    </div>
  );
};
