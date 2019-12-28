// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from '../../redux/store';
import {Actions as headerActions} from '../../redux/header/header.ducks';
import {Actions as guestActions} from '../../redux/guests/guests.ducks';
import {Actions as loginActions} from '../../redux/login/login.ducks';
import {HeaderComponent} from '../../components/header/header.component';
import {IProps as IComponentProps, IHandlers as IComponentHandlers} from '../../components/header/header.component';
import {IUserInfo} from '../../model/login.model';

export const HeaderContainer = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  state => {
    const {header, guests, login} = state;
    const {inputValue} = header;
    const {list: guestList, filter} = guests;
    const {info = {} as IUserInfo} = login;
    const {initial} = info;

    let guestTotal = guestList.length;
    guestList.forEach(guest => {
      guestTotal += guest.withPartner ? 1 : 0;
    });
    return {
      inputValue,
      guestFilter: filter,
      guestTotal,
      initial,
    };
  },
  {
    setInputValue: headerActions.setInputValue,
    onAddGuest: headerActions.addNewGuest,
    updateGuestFilter: guestActions.updateGuestFilter,
    signOut: loginActions.signOut,
  },
)(HeaderComponent);
