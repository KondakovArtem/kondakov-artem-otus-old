import React, {FunctionComponent} from 'react';
import {Input, Header, ButtonGroup} from 'react-native-elements';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

export interface IProps {
  inputValue: string;
  guestTotal: number;
  guestFilter: number;
}

export interface IHandlers {
  setInputValue: (value: string) => void;
  onAddGuest: (value: string) => void;
  updateGuestFilter: (idx: number) => void;
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: 40,
  },
  input: {marginBottom: 5},
  buttonFilter: {color: 'white'},
});

export const HeaderComponent: FunctionComponent<IProps & IHandlers> = props => {
  const {
    setInputValue,
    inputValue,
    onAddGuest,
    updateGuestFilter,
    guestFilter = 0,
    guestTotal = 0,
  } = props;

  const buttons = [`Все`, `С парой`, `Без пары`];

  return (
    <>
      <Header
        placement="left"
        containerStyle={styles.header}
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{text: 'Список гостей', style: {color: '#fff'}}}
        rightComponent={{text: `Всего ${guestTotal}`, style: {color: '#fff'}}}
      />
      <View>
        <Input
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={e => {
            onAddGuest(e.nativeEvent.text);
          }}
          placeholder="Новый гость"
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
