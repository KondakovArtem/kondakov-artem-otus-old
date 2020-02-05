import React, {FC, createRef, useEffect, useState} from 'react';
import {Input, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, set} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';
import * as RNLocalize from 'react-native-localize';

import {inputStyleProps} from '@app/constants/theme';
import {usePrevious} from '@app/services/core/core.service';

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
  disabled,
  placeholder,
  onChangeValue,
  errorMessage = '',
  label,
}) => {
  const animRef = createRef<any>();
  const prevErrorMessage = usePrevious(errorMessage);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (animRef.current && errorMessage !== '' && prevErrorMessage !== errorMessage) {
      (animRef.current.shake as any)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  useEffect(() => {
    setShowCalendar(false);
  }, []);

  const valueNumber = typeof children === 'string' || !children ? new Date() : children;
  const forematterValue = children != null ? format(valueNumber, 'dd.MM.yyyy') : '';

  return (
    <Animatable.View ref={animRef} useNativeDriver={true} duration={200}>
      <Input
        {...inputStyleProps}
        label={label}
        disabled={disabled}
        value={forematterValue}
        rightIcon={<Icon name={'calendar'} type={'material-community'} onPress={() => setShowCalendar(true)} />}
        placeholder={placeholder}
        editable={false}
        onTouchStart={() => setShowCalendar(true)}
      />
      <View style={inputStyleProps.errorContainer}>
        {errorMessage !== '' && (
          <Animatable.Text animation={'fadeInDown'} duration={200} useNativeDriver style={inputStyleProps.errorStyle}>
            {errorMessage}
          </Animatable.Text>
        )}
      </View>
      {showCalendar && (
        <DateTimePicker
          value={valueNumber as Date}
          mode={'date'}
          onTouchCancel={() => {
            setShowCalendar(false);
          }}
          onChange={(event, date) => {
            setShowCalendar(false);
            if (date != null) {
              onChangeValue(
                zonedTimeToUtc(
                  set(date, {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                  }),
                  RNLocalize.getTimeZone(),
                ),
              );
            }
          }}
        />
      )}
    </Animatable.View>
  );
};
