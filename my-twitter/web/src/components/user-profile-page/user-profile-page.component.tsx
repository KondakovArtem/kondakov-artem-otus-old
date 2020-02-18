import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {motion} from 'framer-motion';
import {isEmpty} from 'lodash-es';
import {format} from 'date-fns';
import {Button, Icon} from 'antd';

import {thumbnailVariants} from 'constants/theme';
import {HeaderProfileComponent} from 'components/header-profile/header-profile.component';
import {AvatarDialogContainer} from 'containers/avatar-dialog/avatar-dialog.container';
import {IUserInfo} from 'models/user.model';
import geo from 'components/icons/geo';
import web from 'components/icons/web';

const styles = StyleSheet.create({
  infoContainer: {flexDirection: 'row', alignItems: 'center', paddingBottom: 6},
  infoIcon: {paddingRight: 4},
  container: {paddingHorizontal: 20},
  email: {paddingLeft: 2, color: 'grey', paddingBottom: 6},
  about: {paddingLeft: 2, paddingVertical: 8},
});

interface IInfoRowProps {
  children: string;
  icon: {
    name?: string;
    type?: string;
    component?: () => JSX.Element;
  };
}

const InfoRow: FC<IInfoRowProps> = ({children, icon}) => {
  return (
    <View style={styles.infoContainer}>
      <Icon component={icon.component} {...icon} style={{width: '20px', height: '20px'}} />
      <Text>{children}</Text>
    </View>
  );
};

export interface IProps extends IUserInfo {
  userUid: string;
  followsCount?: number;
  followersCount?: number;
  canEdit?: boolean;
}
export interface IHandlers {
  signOut(): void;
  takeAvatar?(): void;
  onEditUserProfile?(): void;
  init(): void;
}

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
  canEdit,
}) => {
  useEffect(() => {
    init && init();
  }, []);
  return (
    <motion.div {...thumbnailVariants} style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
      <HeaderProfileComponent
        canEdit={canEdit}
        takeAvatar={canEdit ? takeAvatar : undefined}
        onEditUserProfile={onEditUserProfile}
        userUid={userUid}
      />
      <View style={styles.container}>
        {!isEmpty(name) && <Text>{name}</Text>}
        {!isEmpty(email) && <Text style={styles.email}>{email}</Text>}
        {!isEmpty(about) && <Text style={styles.about}>{about}</Text>}
        {!isEmpty(location) && <InfoRow icon={{component: geo}}>{location}</InfoRow>}
        {!isEmpty(webSite) && <InfoRow icon={{component: web}}>{webSite}</InfoRow>}
        {birthDate && <InfoRow icon={{type: 'calendar'}}>{`Birth day ${format(birthDate, 'dd.MM.yyyy')}`}</InfoRow>}
        {createdAt && (
          <InfoRow icon={{name: 'calendar-range'}}>{`Registration: ${format(createdAt, 'MMMM yyyy')}`}</InfoRow>
        )}
        <Text>
          {followsCount} Follow {followersCount} Followers
        </Text>

        {canEdit && (
          <div>
            <br />
            <Button type="primary" onClick={signOut} title={'Sign out'}>
              Sign out
            </Button>
          </div>
        )}
      </View>
      <AvatarDialogContainer />
    </motion.div>
  );
};
