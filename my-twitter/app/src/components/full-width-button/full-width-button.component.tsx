import React, {FC} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';

import {commonStyles, fullWidthButtonProps} from 'constants/theme';

export interface IProps {
  children: string;
  disabled: boolean;
  loading: boolean;
}

export interface IHandlers {
  onPress(): void;
}

export const FullWidthButtonComponent: FC<IProps & IHandlers> = props => {
  const {children, disabled, loading, onPress} = props;
  return (
    <View style={commonStyles.fullWidthContainer}>
      <Button disabled={disabled} loading={loading} {...fullWidthButtonProps} title={children} onPress={onPress} />
    </View>
  );
};
