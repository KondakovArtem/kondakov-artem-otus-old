import React, {FC, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {IUserInfo} from 'models/user.model';
import {Text, Button} from 'react-native-elements';
import {isEmpty} from 'lodash-es';
import {format} from 'date-fns';
import * as MagicMove from 'react-native-magic-move';

import {HeaderProfileComponent} from 'components/header-profile/header-profile.component';
import {Icon} from 'react-native-elements';

export interface IProps extends IUserInfo {
  userUid: string;
  avatarUid?: string;
  followsCount?: number;
  followersCount?: number;
  canEdit: boolean;
}
export interface IHandlers {
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
  signOutButton: {marginTop: 10},
});

const InfoRow: FC<IInfoRowProps> = ({children, icon}) => {
  return (
    <View style={styles.infoContainer}>
      <Icon type="material-community" {...icon} size={16} iconStyle={styles.infoIcon} />
      <Text>{children}</Text>
    </View>
  );
};

export const UserProfileComponent: FC<IProps & IHandlers> = ({
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
  avatarUid,
  init,
  canEdit,
}) => {
  useEffect(() => {
    init && init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MagicMove.Scene>
      <HeaderProfileComponent
        avatarUid={avatarUid}
        takeAvatar={canEdit ? takeAvatar : undefined}
        onEditUserProfile={canEdit ? onEditUserProfile : undefined}
        userUid={userUid}
        canEdit={canEdit}
      />
      <View style={styles.container}>
        <ScrollView>
          {!isEmpty(name) && <Text h4>{name}</Text>}
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

          {(!!followsCount || !!followersCount) && (
            <Text>
              <Text>{!!followsCount && `${followsCount} Follow`}</Text>{' '}
              <Text>{!!followersCount && `${followersCount} Followers`}</Text>
            </Text>
          )}
          {canEdit && <Button buttonStyle={styles.signOutButton} onPress={signOut} title={'Sign out'} />}
        </ScrollView>
      </View>
    </MagicMove.Scene>
  );
};
