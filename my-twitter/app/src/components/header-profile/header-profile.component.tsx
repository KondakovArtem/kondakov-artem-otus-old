import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as MagicMove from 'react-native-magic-move';

import {headerBackground, COMMON_DURATION} from 'constants/theme';
import {AvatarContainer} from 'containers/avatar/avatar.container';
import {RoundButton} from 'components/round-button/round-button.component';

export interface IProps {
  mode?: string;
  canEdit?: boolean;
  userUid: string;
  avatarUid?: string;
}

export interface IHandlers {
  takeAvatar?(): void;
  onEditUserProfile?(): void;
  onSaveUserProfile?(): void;
}

const styles = StyleSheet.create({
  container: {height: 120, overflow: 'hidden'},
  background: {height: 60, backgroundColor: headerBackground},
  elementContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  avatarPositioner: {position: 'relative', top: -50, left: 20},
  avatarContainer: {borderWidth: 4, borderColor: 'white'},
  buttonContainer: {position: 'relative', top: -53, right: 20, zIndex: 1},
});

export const HeaderProfileComponent: FC<IHandlers & IProps> = ({
  takeAvatar,
  onEditUserProfile,
  mode = 'edit',
  onSaveUserProfile,
  userUid,
  avatarUid,
  canEdit,
}) => {
  // чтобы задать значение только при инициализации компонента
  const [avatarInitedUid] = useState(avatarUid || 'logo');

  return (
    <MagicMove.View
      id={'header'}
      transition={MagicMove.Transition.morph}
      duration={COMMON_DURATION}
      style={styles.container}>
      <View style={styles.background} />
      <View style={styles.elementContainer}>
        <View style={styles.avatarPositioner}>
          <AvatarContainer
            uid={avatarInitedUid}
            size={90}
            containerStyle={styles.avatarContainer}
            showEditButton={canEdit}
            onPress={takeAvatar}>
            {userUid}
          </AvatarContainer>
        </View>
        {canEdit && (
          <View style={styles.buttonContainer}>
            {mode === 'edit' && (
              <RoundButton onPress={onEditUserProfile} icon={'pencil-outline'}>
                Change Profile
              </RoundButton>
            )}
            {mode === 'save' && (
              <RoundButton onPress={onSaveUserProfile} icon={'pencil-outline'}>
                Save Profile
              </RoundButton>
            )}
          </View>
        )}
      </View>
    </MagicMove.View>
  );
};
