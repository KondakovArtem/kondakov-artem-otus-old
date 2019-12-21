// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from '../../redux/store';
import {GuestListComponent} from './../../components/guest-list/guest-list.component';
import {IProps as IComponentProps} from './../../components/guest-list/guest-list.component';
import {filterGuest} from '../../redux/guests/guests.ducks';

export const GuestList = connect<IComponentProps, {}, {}, IConfiguredStore>(
  state => {
    const {guests} = state;
    const {list, filter} = guests;
    return {
      list: filterGuest(list, filter),
    };
  },
)(GuestListComponent);
