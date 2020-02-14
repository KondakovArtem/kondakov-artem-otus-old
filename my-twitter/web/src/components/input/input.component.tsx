import React, {FC} from 'react';
import {Input, Icon, Tooltip} from 'antd';

export interface IProps {
  size?: 'small' | 'default' | 'large';
  placeholder?: string;
  leftIcon?: string;
  hint?: string;
  password?: boolean;
}

const getElement = (password: boolean) => {
  return password ? Input.Password : Input;
};

export const InputComponent: FC<IProps> = ({placeholder, leftIcon, hint, size = 'large', password = false}) => {
  const InputElement = getElement(password);

  return (
    <InputElement
      size={size}
      placeholder={placeholder}
      prefix={leftIcon && <Icon type={leftIcon} />}
      suffix={
        hint && (
          <Tooltip title={hint}>
            <Icon type="info-circle" style={{color: 'rgba(0,0,0,.45)'}} />
          </Tooltip>
        )
      }
    />
  );
};
