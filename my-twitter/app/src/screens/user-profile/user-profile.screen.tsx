import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {View} from 'react-native';
import {Text, Icon, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {format} from 'date-fns';
import {isEmpty} from 'lodash-es';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {Actions as editUserInfoActions} from '@app/redux/edit-user-info/edit-user-info.ducks';
import {HeaderProfileComponent} from '@app/components/header-profile/header-profile.component';
import {IUserInfo} from '@app/models/user.model';

interface IProps extends IUserInfo {
  userUid: string;
}
interface IHandlers {
  signOut(): void;
  takeAvatar(): void;
  onEditUserProfile(): void;
}

const InfoRow = ({children, icon}: {children: string; icon: {name: string; type: string}}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 6}}>
      <Icon {...icon} size={16} iconStyle={{paddingRight: 4}} />
      <Text>{children}</Text>
    </View>
  );
};

export const UserProfileScreenComponent: FC<IProps & IHandlers> = ({
  onEditUserProfile,
  signOut,
  takeAvatar,
  name,
  about,
  email,
  birthDate,
  createdAt,
  location,
  webSite,
  userUid,
}) => {
  return (
    <MagicMove.Scene>
      <HeaderProfileComponent takeAvatar={takeAvatar} onEditUserProfile={onEditUserProfile} userUid={userUid} />
      <View style={{paddingTop: 0}}>
        <ScrollView style={{paddingHorizontal: 20}}>
          {!isEmpty(name) && (
            <Text h4 style={{paddingLeft: 2}}>
              {name}
            </Text>
          )}
          {!isEmpty(email) && <Text style={{paddingLeft: 2, color: 'grey', paddingBottom: 6}}>{email}</Text>}
          {!isEmpty(about) && <Text style={{paddingLeft: 2, paddingVertical: 8}}>{about}</Text>}
          {!isEmpty(location) && <InfoRow icon={{name: 'map-marker', type: 'material-community'}}>{location}</InfoRow>}
          {!isEmpty(webSite) && <InfoRow icon={{name: 'web', type: 'material-community'}}>{webSite}</InfoRow>}
          {birthDate && (
            <InfoRow icon={{name: 'calendar-heart', type: 'material-community'}}>{`Birth day ${format(
              birthDate,
              'dd.MM.yyyy',
            )}`}</InfoRow>
          )}
          {createdAt && (
            <InfoRow icon={{name: 'calendar-range', type: 'material-community'}}>
              {`Registration: ${format(createdAt, 'MMMM yyyy')}`}
            </InfoRow>
          )}
          <Text>
            {20} Follow {3} Followers
          </Text>
          <Button onPress={signOut} title={'Sign out'}>
            Sign out
          </Button>
        </ScrollView>
      </View>
    </MagicMove.Scene>
  );
};

export const UserProfileScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {info = {}, userUid} = authData;
    return {
      ...(info as IUserInfo),
      userUid,
    };
  },
  {
    signOut: authActions.signOut,
    takeAvatar: authActions.takeAvatar,
    onEditUserProfile: editUserInfoActions.editUserProfile,
  },
)(UserProfileScreenComponent);
