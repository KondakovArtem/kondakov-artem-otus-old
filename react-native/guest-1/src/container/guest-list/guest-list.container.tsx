import React from 'react';
import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { GuestListComponent } from './../../components/guest-list/guest-list.component';
import {IProps as IComponentProps, IHandlers as IComponentHandlers} from './../../components/guest-list/guest-list.component';
import { Actions as guestsActions } from '../../redux/guests/guests.ducks';

export const GuestList = connect<IComponentProps, IComponentHandlers>(
    (state): IComponentProps => {
        const { guests: { list} } = state as IConfiguredStore;
        return {
            list
        }
    }, {
        onDeleteGuest: guestsActions.removeGuest,
        onToggleCouple: guestsActions.toggleCouple,
    }
)(GuestListComponent);