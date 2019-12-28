import React, {FunctionComponent, memo} from 'react';
import {ListItem, CheckBox} from 'react-native-elements';
import {TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {isEqual} from 'lodash-es';

import {IGuest} from '../../model/guest.model';

export interface IProps {
  children: IGuest;
  editGuest?: IGuest;
}

export interface IHandlers {
  onDeleteGuest: (guest: IGuest) => void;
  onTogglePartner: (guest: IGuest) => void;
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

export const GuestItemComponent: FunctionComponent<IProps & IHandlers> = ({
  children: guest,
  editGuest,
  onDeleteGuest,
  onTogglePartner,
  setEditableGuest,
  updateGuestName,
}) => {
  const {uid, name, withPartner} = guest;

  function NameElement() {
    return editGuest && editGuest.uid === uid ? (
      <EditNameTextInput
        placeholder="Enter a new name"
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
          title="with partner"
          checked={withPartner}
          onPress={() => onTogglePartner(guest)}
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

export const GuestItem = memo(GuestItemComponent, (prevProps, nextProps) => {
  const {children: preData, editGuest: preEdit} = prevProps;
  const {children: nextData, editGuest: nextEdit} = nextProps;
  return !(!isEqual(preData, nextData) || (!preEdit && !!nextEdit && nextEdit.uid === nextData.uid));
});
