import React, {memo, FC} from 'react';
import {ListItem, CheckBox} from 'react-native-elements';
import {TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {isEqual} from 'lodash-es';
import * as Animatable from 'react-native-animatable';
//@ts-ignore;
import {Text as MagicText, Transition, View as MagicView} from 'react-native-magic-move';

import {IGuest, IGuestMeta} from '@app/model/guest.model';
import {COMMON_DURATION} from '@app/services/style/style.service';
import {AvatarComponent} from '../avatar/avatar.component';
import { setTestId } from '@app/services/core/core.service';

export interface IProps {
  children: IGuest;
  editGuest?: IGuestMeta;
  removedUids: string[];
  userUid: string;
}

export interface IHandlers {
  onDeleteGuest: (guest: IGuest) => void;
  onMarkDeleteGuest: (guest: IGuest) => void;
  onTogglePartner: (guest: IGuest) => void;
  onSetEditableGuest: (guest?: IGuest) => void;
  onUpdateGuestName: (uid: string, text: string) => void;
  onSelect: (guest: IGuest) => void;
  onTakeGuestPhoto: (guest: IGuest) => void;
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
  onSetEditableGuest,
  onUpdateGuestName,
  onTakeGuestPhoto,
  userUid,
}) => {
  const {uid, name, withPartner, photoPath} = guest;

  const onSubmitEditing = (e: any) => onUpdateGuestName(guest.uid, e.nativeEvent.text);
  const takeGuestPhoto = () => onTakeGuestPhoto(guest);
  const onAnimationEnd = () => {
    if (removedUids.includes(uid)) {
      onDeleteGuest(guest);
    }
  };
  const selectGuest = () => onSelect(guest);
  const togglePartner = () => onTogglePartner(guest);
  const markDeleteGuest = () => onMarkDeleteGuest(guest);
  const setEditableGuest = () => onSetEditableGuest(guest);

  const NameElement = () => {
    return editGuest && editGuest.uid === uid && !editGuest.withDetails ? (
      <EditNameTextInput
        {...setTestId('guestEditName')}
        placeholder="Enter a new name"
        defaultValue={name}
        autoFocus={true}
        onEndEditing={onSubmitEditing}
        onSubmitEditing={onSubmitEditing}
      />
    ) : (
      <MagicView style={styles.nameContainer} id={`mv_${uid}`} transition={Transition.morph} duration={COMMON_DURATION}>
        <MagicText
          id={`mt_${uid}`}
          {...setTestId('guestName')}
          style={styles.name}
          transition={Transition.morph}
          duration={COMMON_DURATION}
          onLongPress={setEditableGuest}
          onPress={selectGuest}>
          {name}
        </MagicText>
      </MagicView>
    );
  };

  return (
    <Animatable.View
      animation={removedUids.includes(uid) ? 'bounceOutLeft' : 'fadeIn'}
      useNativeDriver={true}
      duration={COMMON_DURATION}
      onAnimationEnd={onAnimationEnd}>
      <ListItem
        title={<NameElement />}
        onPress={selectGuest}
        containerStyle={styles.listItemContainer}
        subtitle={
          <CheckBox
            title="with partner"
            {...setTestId('withPartner')}
            checked={withPartner}
            onPress={togglePartner}
            containerStyle={styles.checkBoxContainer}
          />
        }
        leftElement={
          <AvatarComponent
            {...setTestId('guestAvatar')}
            onLongPress={takeGuestPhoto}
            onPress={selectGuest}
            size={50}
            path={photoPath ? `${userUid}/${photoPath}` : undefined}
            icon={withPartner ? 'account-multiple-outline' : 'account-outline'}
          />
        }
        rightIcon={{
          ...setTestId('removeGuestButton'),
          Component: TouchableOpacity,
          onPress: markDeleteGuest,
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
