import React from 'react';
import {Icon} from 'react-native-elements';

import {navUtils} from '@app/services/navigation/navigation.service';
import {EXPLORE_SCREEN} from '@app/models/navigation.model';
import {View} from 'react-native';
import {headerBackground} from '@app/constants/theme';

export const AddPostButtonComponent = () => {
  return (
    <View style={{position: 'absolute', bottom: 10, right: 10, alignSelf: 'flex-start'}}>
      <Icon
        name="fountain-pen-tip"
        type="material-community"
        color={headerBackground}
        reverseColor={'white'}
        raised
        reverse
        onPress={() => navUtils.navigate(EXPLORE_SCREEN)}
      />
    </View>
  );
};
