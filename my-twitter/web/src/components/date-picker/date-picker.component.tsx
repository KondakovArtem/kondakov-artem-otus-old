import React, {FC} from 'react';
import moment, {Moment} from 'moment';
import {DatePicker, Form} from 'antd';

export interface IProps {
  children?: Date;
  disabled?: boolean;
  placeholder?: string;
  leftIcon?: {
    name: string;
    type: string;
  };
  errorMessage?: string;
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export interface IHandlers {
  onChangeValue(value?: Date): void;
  onEndEditing?(): void;
  onSubmitEditing?(): void;
}

export const DatePickerComponent: FC<IProps & IHandlers> = ({
  children,
  placeholder,
  onChangeValue,
  errorMessage = '',
  label,
}) => {
  const dateFormat = 'DD.MM.YYYY';

  return (
    <Form.Item
      className={!errorMessage ? 'no-error-message' : ''}
      label={label}
      validateStatus={errorMessage && 'error'}
      help={errorMessage}>
      <DatePicker
        size="large"
        placeholder={placeholder}
        defaultValue={children && moment(children, dateFormat)}
        format={dateFormat}
        value={children && moment(children, dateFormat)}
        onChange={(date: Moment | null) => {
          if (date && date.isValid) {
            date
              .hour(0)
              .minute(0)
              .second(0)
              .millisecond(0);
          }
          const newValue = date && date.isValid() ? date.toDate() : null;

          onChangeValue && onChangeValue(newValue as Date);
        }}
      />
    </Form.Item>
  );
};
