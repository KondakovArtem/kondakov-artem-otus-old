import React from 'react';
import {Icon} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {navUtils} from '@app/services/navigation/navigation.service';
import {NEW_POST_SCREEN} from '@app/models/navigation.model';
import {headerBackground} from '@app/constants/theme';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-start',
  },
});

const onNewPost = () => navUtils.navigate(NEW_POST_SCREEN);

export const AddPostButtonComponent = () => {
  return (
    <MagicMove.View id="newPost" transition={MagicMove.Transition.morph} style={styles.button}>
      <Icon
        name="fountain-pen-tip"
        type="material-community"
        color={headerBackground}
        reverseColor={'white'}
        raised
        reverse
        onPress={onNewPost}
      />
    </MagicMove.View>
  );
};
