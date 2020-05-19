import React, {FC} from 'react';
import {Button} from 'antd';
import {ButtonType} from 'antd/lib/button';

export interface IProps {
  type?: ButtonType;
  icon?: string;
  title?: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}

export interface IHandlers {
  onPress?(): void;
}

export const FollowButtonComponent: FC<IProps & IHandlers> = ({icon, type, onPress, title}) => {
  return (
    <Button type={type} icon={icon} onClick={onPress}>
      {title}
    </Button>
  );
};
