import React, {FC} from 'react';
import styled from 'styled-components/native';
//@ts-ignore;
import {Scene as MagicScene} from 'react-native-magic-move';

import {HeaderContainer} from '@app/container/header/header.container';
import {GuestList} from '@app/container/guest-list/guest-list.container';

const GuestListContainer = styled.View`
  flex: 2;
  background: white;
`;

export const MainScreen: FC = () => (
  <MagicScene>
    <HeaderContainer />
    <GuestListContainer>
      <GuestList />
    </GuestListContainer>
  </MagicScene>
);
