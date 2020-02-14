import React, {FC} from 'react';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {headerBackground, COMMON_DURATION} from 'constants/theme';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    alignSelf: 'flex-start',
  },
});

export interface IProps {
  visible: boolean;
}

export interface IHandlers {
  onPress(): void;
}

export const AddPostButtonComponent: FC<IProps & IHandlers> = ({visible, onPress}) => {
  return (
    <>
      {visible && (
        <Animatable.View animation={'zoomIn'} duration={COMMON_DURATION} style={styles.button}>
          <Icon
            name="fountain-pen-tip"
            type="material-community"
            color={headerBackground}
            reverseColor={'white'}
            raised
            reverse
            onPress={onPress}
          />
        </Animatable.View>
      )}
    </>
  );
};
