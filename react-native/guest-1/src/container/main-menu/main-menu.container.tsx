import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {Menu} from 'react-native-paper';

import {IConfiguredStore} from '../../redux/store';
import {IUserInfo} from '../../model/login.model';
import {Actions as loginActions} from '../../redux/login/login.ducks';

interface IComponentHandlers {
  signOut: () => void;
}

interface IComponentProps {
  initial: string;
}

export const MainMenuContainer = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  state => {
    const {common} = state;
    const {info = {} as IUserInfo} = common;
    const {initial} = info;
    return {
      initial,
    };
  },
  {
    signOut: loginActions.signOut,
  },
)(props => {
  const {initial, signOut} = props;

  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Avatar onPress={() => setVisible(true)} title={initial} rounded />}>
      <Menu.Item onPress={signOut} title="Sign out" />
    </Menu>
  );
});
