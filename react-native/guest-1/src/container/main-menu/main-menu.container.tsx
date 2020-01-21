import React, {useState, FC} from 'react';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {Menu} from 'react-native-paper';

import {IConfiguredStore} from '@app/redux/store';
import {IUserInfo} from '@app/model/login.model';
import {Actions as loginActions} from '@app/redux/login/login.ducks';

interface IHandlers {
  signOut: () => void;
}

interface IProps {
  initial: string;
}

export const MaainMenuComponent: FC<IProps & IHandlers> = ({initial, signOut}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Avatar onPress={() => setVisible(true)} title={initial} rounded />}>
      <Menu.Item onPress={signOut} title="Sign out" />
    </Menu>
  );
};

export const MainMenuContainer = connect<IProps, IHandlers, {}, IConfiguredStore>(
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
)(MaainMenuComponent);
