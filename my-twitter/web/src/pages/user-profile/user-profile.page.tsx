import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {format} from 'date-fns';
import {isEmpty} from 'lodash-es';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Button} from 'antd';
import {motion} from 'framer-motion';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {Actions as editUserInfoActions} from 'store/edit-user-info/edit-user-info.actions';
import {HeaderProfileComponent} from 'components/header-profile/header-profile.component';
import {IUserInfo} from 'models/user.model';
import {thumbnailVariants} from 'constants/theme';
import {AvatarDialogContainer} from 'containers/avatar-dialog/avatar-dialog.container';

interface IProps extends IUserInfo {
  userUid: string;
  followsCount: number;
  followersCount: number;
}
interface IHandlers {
  signOut(): void;
  takeAvatar(): void;
  onEditUserProfile(): void;
  init(): void;
}

interface IInfoRowProps {
  children: string;
  icon: {
    name: string;
    type?: string;
  };
}

const styles = StyleSheet.create({
  infoContainer: {flexDirection: 'row', alignItems: 'center', paddingBottom: 6},
  infoIcon: {paddingRight: 4},
  container: {paddingHorizontal: 20},
  email: {paddingLeft: 2, color: 'grey', paddingBottom: 6},
  about: {paddingLeft: 2, paddingVertical: 8},
});

const InfoRow: FC<IInfoRowProps> = ({children, icon}) => {
  return (
    <View style={styles.infoContainer}>
      <Icon type="material-community" {...icon} />
      {/* // iconStyle={styles.infoIcon} /> */}
      <Text>{children}</Text>
    </View>
  );
};

export const UserProfilePageComponent: FC<IProps & IHandlers> = ({
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
  followsCount,
  followersCount,
  init,
}) => {
  useEffect(() => {
    init && init();
  }, []);

  return (
    <motion.div {...thumbnailVariants} style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
      <HeaderProfileComponent takeAvatar={takeAvatar} onEditUserProfile={onEditUserProfile} userUid={userUid} />
      <View style={styles.container}>
        {!isEmpty(name) && <Text>{name}</Text>}
        {!isEmpty(email) && <Text style={styles.email}>{email}</Text>}
        {!isEmpty(about) && <Text style={styles.about}>{about}</Text>}
        {!isEmpty(location) && <InfoRow icon={{name: 'map-marker'}}>{location}</InfoRow>}
        {!isEmpty(webSite) && <InfoRow icon={{name: 'web'}}>{webSite}</InfoRow>}
        {birthDate && (
          <InfoRow icon={{name: 'calendar-heart'}}>{`Birth day ${format(birthDate, 'dd.MM.yyyy')}`}</InfoRow>
        )}
        {createdAt && (
          <InfoRow icon={{name: 'calendar-range'}}>{`Registration: ${format(createdAt, 'MMMM yyyy')}`}</InfoRow>
        )}
        <Text>
          {followsCount} Follow {followersCount} Followers
        </Text>
        <Button onClick={signOut} title={'Sign out'}>
          Sign out
        </Button>
      </View>
      <AvatarDialogContainer />
    </motion.div>
  );
};

export const UserProfilePage = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData, users}) => {
    const {info = {}, userUid} = authData;
    const {follows = [], followers = []} = users;

    return {
      ...(info as IUserInfo),
      userUid,
      followsCount: follows.length,
      followersCount: followers.length,
    };
  },
  {
    signOut: authActions.signOut,
    takeAvatar: editUserInfoActions.showAvatarEditor,
    onEditUserProfile: editUserInfoActions.editUserProfile,
    init: editUserInfoActions.getFollowers,
  },
)(UserProfilePageComponent);
