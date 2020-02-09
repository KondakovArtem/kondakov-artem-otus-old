import React, {FC, useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {Input, Icon} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';

import {statusBackground, inputStyleProps} from '@app/constants/theme';
import {isEmpty} from 'lodash-es';

const styles = StyleSheet.create({
  inputView: {width: '100%', flexGrow: 1},
  containerStyle: {backgroundColor: statusBackground, borderRadius: 20, height: 34},
  inputContainerStyle: {height: 34, borderBottomWidth: 0},
  inputStyle: {color: 'white'},

  iconView: {flexDirection: 'row'},
  iconContainerStyle: {right: -8},
  iconStyle: {fontSize: 20},
});

export interface IProps {
  children: string;
}

export interface IHandlers {
  onChangeText(value: string): void;
}

export const InputSearchComponent: FC<IProps & IHandlers> = ({children = '', onChangeText}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded && !isEmpty(children)) {
      setExpanded(true);
    }
  }, [children, expanded]);

  const onInputBlur = () => {
    if (isEmpty(children)) {
      setExpanded(false);
    }
  };
  const onPressIcon = () => setExpanded(true);

  return (
    <>
      {expanded && (
        <Animatable.View style={styles.inputView} animation={'fadeInRight'}>
          <Input
            autoFocus={true}
            leftIcon={{type: 'material-community', name: 'magnify', color: 'white'}}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            leftIconContainerStyle={inputStyleProps.leftIconContainerStyle}
            onBlur={onInputBlur}
            onChangeText={onChangeText}
          />
        </Animatable.View>
      )}
      {!expanded && (
        <View style={styles.iconView}>
          <Icon
            type="material-community"
            name="magnify"
            color={statusBackground}
            selectionColor={'white'}
            containerStyle={styles.iconContainerStyle}
            iconStyle={styles.iconStyle}
            suppressHighlighting={true}
            size={16}
            reverse
            onPress={onPressIcon}
          />
        </View>
      )}
    </>
  );
};
