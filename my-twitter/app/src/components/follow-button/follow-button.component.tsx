import React, {FC} from 'react';
import {Button, IconProps} from 'react-native-elements';
import {StyleSheet, TouchableNativeFeedback, ViewStyle, TextStyle} from 'react-native';

export interface IProps {
  type?: 'outline' | 'solid' | 'clear';
  icon?: IconProps;
  title?: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}

export interface IHandlers {
  onPress?(): void;
}

const styles = StyleSheet.create({
  containerStyle: {
    zIndex: 1,
  },
  buttonStyle: {
    borderRadius: 40,
    // borderColor: headerBackground,
    borderWidth: 2,
    height: 30,
  },
  titleStyle: {
    // color: headerBackground,
  },
});

export const FollowButtonComponent: FC<IProps & IHandlers> = ({
  icon,
  type,
  onPress,
  title,
  borderColor,
  color,
  backgroundColor,
}) => {
  return (
    <Button
      {...styles}
      containerStyle={styles.containerStyle}
      buttonStyle={StyleSheet.compose<ViewStyle>(styles.buttonStyle, {borderColor, backgroundColor})}
      titleStyle={StyleSheet.compose<TextStyle>(styles.titleStyle, {color})}
      type={type}
      icon={icon}
      title={title}
      background={TouchableNativeFeedback.Ripple('white', true)}
      onPress={onPress}
    />
  );
};
