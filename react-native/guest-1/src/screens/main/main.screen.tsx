import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';
import {NavigationStackOptions} from 'react-navigation-stack';
//@ts-ignore;
import {Scene as MagicScene} from 'react-native-magic-move';

import {HeaderContainer} from '../../container/header/header.container';
import {GuestList} from '../../container/guest-list/guest-list.container';

const GuestListContainer = styled.View`
  flex: 2;
  background: white;
`;

export const MainScreen: FunctionComponent = () => {
  return (
    <MagicScene>
      <HeaderContainer />
      <GuestListContainer>
        <GuestList />
      </GuestListContainer>
    </MagicScene>
  );
};

(MainScreen as any).navigationOptions = {
  header: () => null,
} as NavigationStackOptions;
