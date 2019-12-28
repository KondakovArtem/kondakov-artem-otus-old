import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';
import {NavigationStackOptions} from 'react-navigation-stack';

import {HeaderContainer} from '../../container/header/header.container';
import {GuestList} from '../../container/guest-list/guest-list.container';

const GuestListContainer = styled.View`
  flex: 2;
  background: white;
`;

export const MainScreen: FunctionComponent = () => {
  return (
    <GuestListContainer>
      <GuestList />
    </GuestListContainer>
  );
};

(MainScreen as any).navigationOptions = {
  header: () => <HeaderContainer />,
} as NavigationStackOptions;
