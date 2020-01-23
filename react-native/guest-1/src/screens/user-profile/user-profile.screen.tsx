import React, {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
//@ts-ignore;
import {Scene as MagicScene, View as MagicView, Transition} from 'react-native-magic-move';

import {IConfiguredStore} from '@app/redux/store';
import {AvatarComponent} from '@app/components/avatar/avatar.component';
import {IUserInfo} from '@app/model/login.model';
import {Actions as commonActions} from '@app/redux/common/common.ducks';

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  wrapper: {
    width: 200,
  }
});

export interface IProps {
  avatar: string;
  initial: string;
}

export interface IHandlers {
  onTakeAvatar: () => void;
}

export const UserProfileScreenComponent: FC<IProps & IHandlers> = ({avatar, initial, onTakeAvatar}) => {
  return (
    <MagicScene>
      <ScrollView>
        <View style={styles.avatarContainer}>
          <MagicView style={styles.wrapper} id={'user_avatar'} transition={Transition.morph}>
            <AvatarComponent imageUri={avatar} label={initial} onPress={onTakeAvatar} size={200} />
          </MagicView>
        </View>
      </ScrollView>
    </MagicScene>
  );
};

export const UserProfileScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({common}) => {
    const {info} = common;
    const {avatar, initial} = info as IUserInfo;
    return {avatar, initial};
  },
  {
    onTakeAvatar: commonActions.onTakeAvatar,
  },
)(UserProfileScreenComponent);
