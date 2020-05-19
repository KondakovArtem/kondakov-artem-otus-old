import React, {FC} from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Button} from 'react-native-elements';

interface IProps {
  icon?: string;
  children: string;
}
interface IHandlers {
  onPress?(): void;
}

const styles = StyleSheet.create({
  containerStyle: {zIndex: 1},
  buttonStyle: {borderRadius: 40, borderColor: 'white', borderWidth: 2},
  titleStyle: {color: 'white'},
});

export const RoundButton: FC<IProps & IHandlers> = ({onPress, children, icon}) => {
  const iconProp = icon ? {icon: {type: 'material-community', name: icon, color: 'white'}} : {};
  return (
    <Button
      type="outline"
      {...iconProp}
      {...styles}
      title={children}
      background={TouchableNativeFeedback.Ripple('white', true)}
      onPress={onPress}
    />
  );
};
