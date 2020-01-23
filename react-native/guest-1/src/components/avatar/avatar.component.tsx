import React, {FC, useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {getStorageFileUrl} from '@app/services/database/database.service';

export interface IProps {
  label?: string;
  imageUri?: string;
  style?: any;
  containerStyle?: any;
  icon?: string;
  path?: string;
  size: number;
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
  size,
  path,
  containerStyle,
}) => {
  const [pathUri, setPathUri] = useState();

  useEffect(() => {
    if (path) {
      getStorageFileUrl(path).then(uri => {
        setPathUri(uri);
      });
    }
  }, [path]);

  const uri = imageUri || pathUri;

  const getAvatar = () => {
    return uri ? (
      <Avatar.Image size={size} source={{uri}} />
    ) : !uri && label ? (
      <Avatar.Text style={style} size={size} label={label} />
    ) : !uri && icon ? (
      <Avatar.Icon style={style} size={size} icon={icon} />
    ) : (
      <></>
    );
  };

  return (
    <Animatable.View animation="fadeIn" style={containerStyle} useNativeDriver={true}>
      <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
        {getAvatar()}
      </TouchableOpacity>
    </Animatable.View>
  );
};
