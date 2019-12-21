// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from '../../redux/store';
import {
  GuestItem,
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
} from '../../components/guest-list/guest-list-item.component';
import {Actions as guestsActions} from '../../redux/guests/guests.ducks';
import {IGuest} from '../../model/guest';

interface IOwnProps {
  children: IGuest;
}

export const GuestItemContainer = connect<
  IComponentProps,
  IComponentHandlers,
  IOwnProps,
  IConfiguredStore
>(
  (state, props) => {
    const {guests} = state;
    const {editGuest} = guests;
    return {
      editGuest,
      children: props.children,
    };
  },
  {
    onDeleteGuest: guestsActions.removeGuest,
    onToggleCouple: guestsActions.toggleCouple,
    setEditableGuest: guestsActions.setEditableGuest,
    updateGuestName: guestsActions.updateGuestName,
  },
)(GuestItem);
