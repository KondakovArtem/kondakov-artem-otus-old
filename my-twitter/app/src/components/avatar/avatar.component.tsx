import React, {FC, useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {uniqueId} from 'lodash-es';
import * as MagicMove from 'react-native-magic-move';

import {getStorageFileUrl} from 'services/database/database.service';
import {COMMON_DURATION} from 'constants/theme';
import FastImage from 'react-native-fast-image';

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

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 200,
  },
});

export interface IHandlers {
  onPress?: () => void;
  onLongPress?: () => void;
}

export const AvatarComponent: FC<IProps & IHandlers> = ({
  label,
  imageUri,
  onPress,
  onLongPress,
  size = 34,
  path,
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
      style={StyleSheet.flatten([styles.containerStyle, containerStyle])}>
      <Avatar
        onLongPress={onLongPress}
        onPress={onPress}
        size={size}
        rounded
        source={uri && {uri}}
        title={label}
        showEditButton={showEditButton}
        imageProps={{
          ImageComponent: FastImage,
        }}
      />
    </MagicMove.View>
  );
};
