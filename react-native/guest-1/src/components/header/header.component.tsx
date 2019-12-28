import React, {FunctionComponent} from 'react';
import {Input, Header, ButtonGroup, Avatar} from 'react-native-elements';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

export interface IProps {
  inputValue: string;
  guestTotal: number;
  guestFilter: number;
  initial: string;
}

export interface IHandlers {
  setInputValue: (value: string) => void;
  onAddGuest: (value: string) => void;
  updateGuestFilter: (idx: number) => void;
  signOut: () => void;
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: 50,
  },
  input: {marginBottom: 5},
  buttonFilter: {color: 'white'},
});

export const HeaderComponent: FunctionComponent<IProps & IHandlers> = props => {
  const {
    signOut,
    setInputValue,
    inputValue,
    onAddGuest,
    updateGuestFilter,
    guestFilter = 0,
    guestTotal = 0,
    initial,
  } = props;

  const buttons = [`All`, `With partner`, `Without partner`];

  return (
    <>
      <View>
        <ButtonGroup
          selectedIndex={guestFilter}
          selectedTextStyle={styles.buttonFilter}
          onPress={(idx: number) => updateGuestFilter(idx)}
          buttons={buttons}
        />
      </View>
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
      <Header
        placement="left"
        containerStyle={styles.header}
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{text: `Guests list ${guestTotal ? `(${guestTotal})` : ''}`, style: {color: '#fff'}}}
        rightComponent={
          <Menu>
            <MenuTrigger>
              <Avatar title={initial} rounded />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => signOut()} text="Sign out" />
            </MenuOptions>
          </Menu>
        }
      />
    </>
  );
};
