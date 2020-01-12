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
import {IGuest} from '../../model/guest.model';

interface IOwnProps {
  children: IGuest;
}

export const GuestItemContainer = connect<IComponentProps, IComponentHandlers, IOwnProps, IConfiguredStore>(
  (state, props) => {
    const {guests} = state;
    const {editGuest, removedUids} = guests;
    return {
      editGuest,
      children: props.children,
      removedUids,
    };
  },
  {
    onDeleteGuest: guestsActions.removeGuest,
    onTogglePartner: guestsActions.togglePartner,
    setEditableGuest: guestsActions.setEditableGuest,
    updateGuestName: guestsActions.updateGuestName,
    onMarkDeleteGuest: guestsActions.markToDeleteGuest,
    onSelect: guestsActions.selectGuest,
  },
)(GuestItem);
