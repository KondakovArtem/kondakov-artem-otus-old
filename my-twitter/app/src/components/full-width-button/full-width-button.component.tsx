import React, {FC} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';

import {commonStyles, fullWidthButtonProps} from 'constants/theme';
import {setTestId} from 'services/core/core.service';

export interface IProps {
  children: string;
  disabled: boolean;
  loading: boolean;
  id?: string;
}

export interface IHandlers {
  onPress(): void;
}

export const FullWidthButtonComponent: FC<IProps & IHandlers> = ({children, disabled, loading, onPress, id}) => {
  return (
    <View style={commonStyles.fullWidthContainer}>
      <Button
        {...setTestId(id)}
        disabled={disabled}
        loading={loading}
        {...fullWidthButtonProps}
        title={children}
        onPress={onPress}
      />
    </View>
  );
};
