import React, {FunctionComponent} from 'react';
import {ListItem, CheckBox} from 'react-native-elements';
import {TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {IGuest} from '../../model/guest';

export interface IProps {
  children: IGuest;
  editGuest?: IGuest;
}

export interface IHandlers {
  onDeleteGuest: (guest: IGuest) => void;
  onToggleCouple: (guest: IGuest) => void;
  setEditableGuest: (guest?: IGuest) => void;
  updateGuestName: (uid: string, text: string) => void;
}

const EditNameTextInput = styled.TextInput`
  padding: 0;
  margin: 0;
  font-size: 18px;
  height: 24px;
`;
const NameText = styled.Text`
  font-size: 18px;
  height: 24px;
`;

const styles = StyleSheet.create({
  listItemContainer: {
    margin: 0,
    paddingTop: 3,
    paddingBottom: 0,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: -5,
    marginBottom: 0,
  },
});

export const GuestItem: FunctionComponent<IProps & IHandlers> = ({
  children: guest,
  editGuest,
  onDeleteGuest,
  onToggleCouple,
  setEditableGuest,
  updateGuestName,
}) => {
  const {uid, name, withPartner} = guest;

  function NameElement() {
    return editGuest && editGuest.uid === uid ? (
      <EditNameTextInput
        placeholder="Введите новое имя"
        defaultValue={name}
        onEndEditing={e => updateGuestName(guest.uid, e.nativeEvent.text)}
        onSubmitEditing={e => updateGuestName(guest.uid, e.nativeEvent.text)}
        ref={ref => {
          ref?.focus();
        }}
      />
    ) : (
      <NameText onLongPress={() => setEditableGuest(guest)}>{name}</NameText>
    );
  }

  return (
    <ListItem
      title={<NameElement />}
      containerStyle={styles.listItemContainer}
      subtitle={
        <CheckBox
          title="С парой"
          checked={withPartner}
          onPress={() => onToggleCouple(guest)}
          containerStyle={styles.checkBoxContainer}
        />
      }
      rightIcon={{
        Component: TouchableOpacity,
        onPress: () => onDeleteGuest(guest),
        name: 'close',
        type: 'Ionicons',
        color: '#000',
      }}
      topDivider={true}
      bottomDivider={true}
    />
  );
};
