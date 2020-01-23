import React, {useState, FC} from 'react';
import {connect} from 'react-redux';
import {Menu} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {AvatarComponent} from '@app/components/avatar/avatar.component';


import {IConfiguredStore} from '@app/redux/store';
import {IUserInfo} from '@app/model/login.model';
import {Actions as loginActions} from '@app/redux/login/login.ducks';
import {Actions as commonActions} from '@app/redux/common/common.ducks';
//@ts-ignore;
import {Transition, View as MagicView} from 'react-native-magic-move';

interface IHandlers {
  signOut: () => void;
  showProfile: () => void;
}

interface IProps {
  initial: string;
  avatar: string;
}

const styles = StyleSheet.create({
  avatarInitial: {
    backgroundColor: 'white',
  },
});

export const MainMenuComponent: FC<IProps & IHandlers> = ({initial, avatar, signOut, showProfile}) => {
  const [visible, setVisible] = useState(false);

  const onShowMenu = () => setVisible(true);
  const onHideMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={onHideMenu}
      anchor={
        <MagicView id={'user_avatar'} transition={Transition.morph}>
          <AvatarComponent
            label={initial}
            size={36}
            imageUri={avatar}
            style={styles.avatarInitial}
            onPress={onShowMenu}
          />
        </MagicView>
      }>
      <Menu.Item onPress={showProfile} title="Profile" />
      <Menu.Item onPress={signOut} title="Sign out" />
    </Menu>
  );
};

export const MainMenuContainer = connect<IProps, IHandlers, {}, IConfiguredStore>(
  state => {
    const {common} = state;
    const {info = {} as IUserInfo} = common;
    const {initial, avatar} = info;
    return {
      initial,
      avatar,
    };
  },
  {
    signOut: loginActions.signOut,
    showProfile: commonActions.showProfile,
  },
)(MainMenuComponent);
