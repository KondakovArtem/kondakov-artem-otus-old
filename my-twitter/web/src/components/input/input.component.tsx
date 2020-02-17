import React, {FC, ChangeEvent} from 'react';
import {Input, Icon, Tooltip, Form} from 'antd';

export interface IProps {
  size?: 'small' | 'default' | 'large';
  placeholder?: string;
  leftIcon?: string;
  hint?: string;
  password?: boolean;
  children?: string;
  showPassword?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}

export interface IHandlers {
  onChangeText?(value: string): void;
  toggleShowPassword?(value: boolean): void;
}

export const InputComponent: FC<IProps & IHandlers> = ({
  placeholder,
  leftIcon,
  hint,
  size = 'large',
  password = false,
  children,
  onChangeText,
  toggleShowPassword,
  showPassword,
  disabled,
  errorMessage,
}) => {
  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(event.target.value || '');
  };

  const showPasswordClick = () => {
    toggleShowPassword && toggleShowPassword(!showPassword);
  };

  return (
    <Form.Item validateStatus={errorMessage && 'error'} help={errorMessage}>
      <Input
        disabled={disabled}
        onChange={changeValue}
        size={size}
        value={children}
        placeholder={placeholder}
        prefix={leftIcon && <Icon type={leftIcon} />}
        type={password && !showPassword ? 'password' : 'textfield'}
        allowClear={true}
        suffix={
          <>
            {hint && (
              <Tooltip title={hint}>
                <Icon type="info-circle" style={{marginLeft: '6px', color: 'rgba(0,0,0,.45)'}} />
              </Tooltip>
            )}
            {errorMessage && (
              <Tooltip title={errorMessage}>
                <Icon type="close-circle" style={{marginLeft: '6px', color: 'red'}} />
              </Tooltip>
            )}
            {password && (
              <Icon
                type={showPassword ? 'eye' : 'eye-invisible'}
                onClick={showPasswordClick}
                style={{marginLeft: '6px', color: 'rgba(0,0,0,.45)'}}
              />
            )}
          </>
        }
      />
    </Form.Item>
  );
};
