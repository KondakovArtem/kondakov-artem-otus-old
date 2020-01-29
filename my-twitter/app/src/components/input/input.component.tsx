import React, {FC, createRef, useEffect} from 'react';
import {Input, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {View} from 'react-native';

import {inputStyleProps} from '@app/constants/theme';
import {usePrevious} from '@app/services/core/core.service';

export interface IProps {
  children: string;
  disabled: boolean;
  placeholder: string;
  leftIcon?: {
    name: string;
    type: string;
  };
  errorMessage: string;
}

export interface IHandlers {
  onChangeText(value: string): void;
}

export const InputComponent: FC<IProps & IHandlers> = props => {
  const {children, disabled, placeholder, leftIcon, onChangeText, errorMessage = ''} = props;
  const animRef = createRef<any>();
  const prevErrorMessage = usePrevious(errorMessage);

  useEffect(() => {
    if (animRef.current && errorMessage !== '' && prevErrorMessage !== errorMessage) {
      console.log(`Animating ${placeholder}`);
      (animRef.current.shake as any)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <Animatable.View ref={animRef} useNativeDriver={true} duration={200}>
      <Input
        {...inputStyleProps}
        disabled={disabled}
        value={children}
        leftIcon={leftIcon && <Icon name={leftIcon.name} type={leftIcon.type} />}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      <View style={inputStyleProps.errorContainer}>
        {errorMessage !== '' && (
          <Animatable.Text animation={'fadeInDown'} duration={200} useNativeDriver style={inputStyleProps.errorStyle}>
            {errorMessage}
          </Animatable.Text>
        )}
      </View>
    </Animatable.View>
  );
};
