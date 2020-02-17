import React, {FC} from 'react';
import {Avatar} from 'antd';

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
  size = 34,
  path,
  showEditButton,
}) => {
  const uri = imageUri;

  return (
    <Avatar size={size} src={uri}>
      {label}
    </Avatar>
  );
};
