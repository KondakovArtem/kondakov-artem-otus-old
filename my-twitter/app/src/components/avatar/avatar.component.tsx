import React, {FC, useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import {Image, StyleSheet} from 'react-native';
import {uniqueId} from 'lodash-es';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {getStorageFileUrl} from '@app/services/database/database.service';
import {COMMON_DURATION} from '@app/constants/theme';

export interface IProps {
  label?: string;
  imageUri?: string;
  style?: any;
  containerStyle?: any;
  icon?: string;
  path?: string;
  size?: number;
  color?: string;
  uid?: string;
  showEditButton?: boolean;
}

export interface IHandlers {
  onPress?: () => void;
  onLongPress?: () => void;
}

export const AvatarComponent: FC<IProps & IHandlers> = ({
  label,
  imageUri,
  onPress,
  onLongPress,
  icon,
  style,
  size = 34,
  path,
  color,
  showEditButton,
  uid,
  containerStyle,
}) => {
  const [pathUri, setPathUri] = useState();
  const [magicUid] = useState(uid || uniqueId('magicUid'));

  useEffect(() => {
    if (path) {
      getStorageFileUrl(path).then(uri => {
        setPathUri(uri);
      });
    }
  }, [path]);

  const uri = imageUri || pathUri;

  return (
    <MagicMove.View
      id={magicUid}
      transition={MagicMove.Transition.morph}
      duration={COMMON_DURATION}
      style={StyleSheet.compose(
        {
          borderRadius: 200,
          alignSelf: 'flex-start',
        },
        {...containerStyle},
      )}>
      {/* <TouchableOpacity> */}
      {/* {getAvatar()} */}
      <Avatar
        onLongPress={onLongPress}
        onPress={onPress}
        size={size}
        rounded
        source={uri && {uri}}
        title={label}
        showEditButton={showEditButton}
        imageProps={{
          ImageComponent: Image,
        }}
      />
      {/* <Image source={{uri}} style={{width: 100, height: 100}}></Image> */}
      {/* </TouchableOpacity> */}
    </MagicMove.View>
  );
};
