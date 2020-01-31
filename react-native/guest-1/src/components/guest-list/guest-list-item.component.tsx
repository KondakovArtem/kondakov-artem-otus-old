import React, {memo, FC} from 'react';
import {ListItem, CheckBox} from 'react-native-elements';
import {TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {isEqual} from 'lodash-es';
import * as Animatable from 'react-native-animatable';
//@ts-ignore;
import {Text as MagicText, Transition, View as MagicView} from 'react-native-magic-move';

import {IGuest, IGuestMeta} from '@app/model/guest.model';
import {COMMON_DURATION} from '@app/services/style/style.service';

export interface IProps {
  children: IGuest;
  editGuest?: IGuestMeta;
  removedUids: string[];
}

export interface IHandlers {
  onDeleteGuest: (guest: IGuest) => void;
  onMarkDeleteGuest: (guest: IGuest) => void;
  onTogglePartner: (guest: IGuest) => void;
  setEditableGuest: (guest?: IGuest) => void;
  updateGuestName: (uid: string, text: string) => void;
  onSelect: (guest: IGuest) => void;
}

const EditNameTextInput = styled.TextInput`
  padding: 0;
  margin: 0;
  font-size: 18px;
  height: 24px;
`;

const styles = StyleSheet.create({
  listItemContainer: {
    margin: 0,
    paddingTop: 3,
    paddingBottom: 0,
  },
  name: {
    fontSize: 18,
    height: 24,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 6,
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: -6,
    marginBottom: 0,
  },
});

export const GuestItemComponent: FC<IProps & IHandlers> = ({
  children: guest,
  editGuest,
  removedUids,
  onDeleteGuest,
  onMarkDeleteGuest,
  onSelect,
  onTogglePartner,
  setEditableGuest,
  updateGuestName,
}) => {
  const {uid, name, withPartner} = guest;

  const onEndEditing = (e: any) => updateGuestName(guest.uid, e.nativeEvent.text);
  const onSubmitEditing = (e: any) => updateGuestName(guest.uid, e.nativeEvent.text);

  const NameElement = () => {
    return editGuest && editGuest.uid === uid && !editGuest.withDetails ? (
      <EditNameTextInput
        placeholder="Enter a new name"
        defaultValue={name}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        ref={(ref: TextInput) => {
          ref?.focus();
        }}
      />
    ) : (
      <MagicView style={styles.nameContainer} id={`mv_${uid}`} transition={Transition.morph} duration={COMMON_DURATION}>
        <MagicText
          id={`mt_${uid}`}
          style={styles.name}
          transition={Transition.morph}
          duration={COMMON_DURATION}
          onLongPress={() => setEditableGuest(guest)}
          onPress={() => onSelect(guest)}>
          {name}
        </MagicText>
      </MagicView>
    );
  };

  function onAnimationEnd() {
    if (removedUids.includes(uid)) {
      onDeleteGuest(guest);
    }
  }

  return (
    <Animatable.View
      animation={removedUids.includes(uid) ? 'bounceOutLeft' : 'fadeIn'}
      useNativeDriver={true}
      duration={COMMON_DURATION}
      onAnimationEnd={onAnimationEnd}>
      <ListItem
        title={<NameElement />}
        onPress={() => onSelect(guest)}
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
          onPress: () => onMarkDeleteGuest(guest),
          name: 'close',
          type: 'Ionicons',
          color: '#000',
        }}
        topDivider={true}
        bottomDivider={true}
      />
    </Animatable.View>
  );
};

export const GuestItem = memo<IProps & IHandlers>(GuestItemComponent, (prevProps, nextProps) => {
  const {children: preData, editGuest: preEdit} = prevProps;
  const {children: nextData, editGuest: nextEdit, removedUids, children: guest} = nextProps;
  return !(
    !isEqual(preData, nextData) ||
    (!isEqual(preEdit, nextEdit) &&
      ((nextEdit && nextEdit.uid === nextData.uid) || (preEdit && preEdit.uid === nextData.uid))) ||
    (removedUids && removedUids.includes(guest.uid))
  );
});
