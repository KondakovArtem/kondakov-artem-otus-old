import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'antd';
import {ButtonType} from 'antd/lib/button';

export interface IProps {
  type?: ButtonType;
  icon?: string;
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
      // {...styles}
      // style={StyleSheet.compose<ViewStyle>(styles.buttonStyle, {borderColor, backgroundColor})}
      // titleStyle={StyleSheet.compose<TextStyle>(styles.titleStyle, {color})}
      type={type}
      icon={icon}
      // background={TouchableNativeFeedback.Ripple('white', true)}
      onClick={onPress}>
      {title}
    </Button>
  );
};

