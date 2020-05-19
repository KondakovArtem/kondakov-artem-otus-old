import React, {FC} from 'react';
import {Icon} from 'react-native-elements';

export interface IProps {
  tintColor?: string;
  name: string;
  type: string;
}

export const TabbarIconComponent: FC<IProps> = ({tintColor, name, type}) => {
  return <Icon name={name} type={type} size={24} color={tintColor} />;
};
