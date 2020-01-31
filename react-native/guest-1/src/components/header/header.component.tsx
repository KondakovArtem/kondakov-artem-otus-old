import React, {ReactElement, FC} from 'react';
import {Input, ButtonGroup} from 'react-native-elements';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

import {HeaderBarComponent} from '@app/components/header-bar/header-bar.component';

export interface IProps {
  inputValue: string;
  guestTotal: number;
  guestFilter: number;
  titleComponent: () => ReactElement;
}

export interface IHandlers {
  setInputValue: (value: string) => void;
  onAddGuest: (value: string) => void;
  updateGuestFilter: (idx: number) => void;
}

const styles = StyleSheet.create({
  input: {marginBottom: 5},
  buttonFilter: {color: 'white'},
});

export const HeaderComponent: FC<IProps & IHandlers> = props => {
  const {setInputValue, inputValue, onAddGuest, updateGuestFilter, guestFilter = 0, titleComponent} = props;

  const buttons = [`All`, `With partner`, `Without partner`];

  return (
    <>
      <HeaderBarComponent titleComponent={titleComponent} />
      <View>
        <Input
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={e => {
            onAddGuest(e.nativeEvent.text);
          }}
          placeholder="New guest"
          containerStyle={styles.input}
          rightIcon={{
            Component: TouchableOpacity,
            onPress: () => {
              onAddGuest(inputValue);
            },
            name: 'person-add',
            type: 'Ionicons',
            color: '#517fa4',
          }}
        />
      </View>
      <View>
        <ButtonGroup
          selectedIndex={guestFilter}
          selectedTextStyle={styles.buttonFilter}
          onPress={(idx: number) => updateGuestFilter(idx)}
          buttons={buttons}
        />
      </View>
    </>
  );
};
