import React, {FC, ChangeEvent} from 'react';
import {Input, Icon, Tooltip, Form} from 'antd';

const {TextArea} = Input;
export interface IProps {
  size?: 'small' | 'default' | 'large';
  placeholder?: string;
  leftIcon?: string;
  label?: string;
  hint?: string;
  password?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
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
  label,
  size = 'large',
  password = false,
  children,
  onChangeText,
  toggleShowPassword,
  showPassword,
  disabled,
  errorMessage,
  multiline,
  numberOfLines,
}) => {
  const changeValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeText && onChangeText(event.target.value || '');
  };

  const showPasswordClick = () => {
    toggleShowPassword && toggleShowPassword(!showPassword);
  };

  return (
    <Form.Item
      className={!errorMessage ? 'no-error-message' : ''}
      label={label}
      validateStatus={errorMessage && 'error'}
      help={errorMessage}>
      {multiline && (
        <TextArea
          value={children}
          onChange={changeValue}
          placeholder={placeholder}
          autoSize={{minRows: numberOfLines}}
        />
      )}
      {!multiline && (
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
      )}
    </Form.Item>
  );
};
