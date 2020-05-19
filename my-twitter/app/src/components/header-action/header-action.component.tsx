import React, {FC} from 'react';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import {statusBackground} from 'constants/theme';

const styles = StyleSheet.create({
  headerIcon: {fontSize: 20},
});

export interface IProps {
  type?: string;
  name: string;
}

export interface IHandlers {
  onPress(): void;
}

export const HeaderActionComponent: FC<IProps & IHandlers> = ({onPress, type = 'material-community', name}) => {
  return (
    <Icon
      type={type}
      name={name}
      color={statusBackground}
      selectionColor={'white'}
      iconStyle={styles.headerIcon}
      size={16}
      reverse
      onPress={onPress}
    />
  );
};
