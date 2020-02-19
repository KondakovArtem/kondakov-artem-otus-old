import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {View, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {Actions as editUserInfoActions} from 'store/edit-user-info/edit-user-info.actions';
import {HeaderProfileComponent} from 'components/header-profile/header-profile.component';
import {InputComponent} from 'components/input/input.component';
import {COMMON_DURATION, commonStyles} from 'constants/theme';
import {DatePickerComponent} from 'components/date-picker/date-picker.component';

interface IProps {
  name: string;
  about: string;
  location: string;
  webSite: string;
  birthDate?: Date;
  userUid: string;
}
interface IHandlers {
  onSaveUserProfile: () => void;
  takeAvatar: () => void;
  setName(value: string): void;
  setAbout(value: string): void;
  setLocation(value: string): void;
  setWebSite(value: string): void;
  setBirthDate(value?: Date): void;
}

export const UserProfileEditScreenComponent: FC<IProps & IHandlers> = ({
  onSaveUserProfile,
  takeAvatar,
  name,
  about,
  location,
  webSite,
  birthDate,
  setName,
  setAbout,
  setLocation,
  setWebSite,
  setBirthDate,
  userUid,
}) => {
  return (
    <MagicMove.Scene>
      <HeaderProfileComponent
        mode={'save'}
        onSaveUserProfile={onSaveUserProfile}
        takeAvatar={takeAvatar}
        userUid={userUid}
      />
      <ScrollView>
        <Animatable.View animation={'zoomIn'} useNativeDriver={true} duration={COMMON_DURATION}>
          <View style={commonStyles.inputContainer}>
            <InputComponent onChangeText={setName} label={'Name'}>
              {name}
            </InputComponent>
            <InputComponent onChangeText={setAbout} label={'About'} multiline={true} numberOfLines={3}>
              {about}
            </InputComponent>
            <InputComponent onChangeText={setLocation} label={'Location'}>
              {location}
            </InputComponent>
            <InputComponent onChangeText={setWebSite} label={'Web-site'}>
              {webSite}
            </InputComponent>
            <DatePickerComponent onChangeValue={setBirthDate} label={'Birth date'}>
              {birthDate}
            </DatePickerComponent>
          </View>
        </Animatable.View>
      </ScrollView>
    </MagicMove.Scene>
  );
};

export const UserProfileEditScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({editUserInfo, authData}) => {
    const {about, location, name, webSite, birthDate} = editUserInfo;
    const {userUid} = authData;
    return {
      name,
      location,
      about,
      webSite,
      birthDate,
      userUid,
    };
  },
  {
    takeAvatar: authActions.takeAvatar,
    setName: editUserInfoActions.setName,
    setAbout: editUserInfoActions.setAbout,
    setBirthDate: editUserInfoActions.setBirthDate,
    setWebSite: editUserInfoActions.setWebSite,
    setLocation: editUserInfoActions.setLocation,
    onSaveUserProfile: editUserInfoActions.saveUserProfile,
  },
)(UserProfileEditScreenComponent);
