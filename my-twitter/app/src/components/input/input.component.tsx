import React, {FC, createRef, useEffect} from 'react';
import {Input, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {View} from 'react-native';

import {inputStyleProps} from 'constants/theme';
import {usePrevious} from 'services/core/core.service';

export interface IProps {
  children?: string;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  leftIcon?: {
    name: string;
    type: string;
  };
  leftComponent?: any;
  errorMessage?: string;
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export interface IHandlers {
  onChangeText?(value: string): void;
  onEndEditing?(): void;
  onSubmitEditing?(): void;
}

export const InputComponent: FC<IProps & IHandlers> = ({
  children,
  disabled,
  placeholder,
  leftIcon,
  leftComponent,
  onChangeText,
  errorMessage = '',
  onEndEditing,
  onSubmitEditing,
  autoFocus,
  label,
  multiline,
  numberOfLines,
}) => {
  const animRef = createRef<any>();
  const prevErrorMessage = usePrevious(errorMessage);

  useEffect(() => {
    if (animRef.current && errorMessage !== '' && prevErrorMessage !== errorMessage) {
      (animRef.current.shake as any)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const getLeftComponent = () => {
    if (leftIcon) {
      return <Icon name={leftIcon.name} type={leftIcon.type} />;
    }
    if (leftComponent) {
      return leftComponent;
    }
  };

  return (
    <Animatable.View ref={animRef} useNativeDriver={true} duration={200}>
      <Input
        {...inputStyleProps}
        label={label}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
        value={children}
        leftIcon={getLeftComponent()}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
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
