import React from 'react';
import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { GuestListComponent } from './../../components/guest-list/guest-list.component';
import {IProps as IComponentProps} from './../../components/guest-list/guest-list.component';
import { filterGuest } from '../../redux/guests/guests.ducks';

export const GuestList = connect<IComponentProps, {}>(
    (state): IComponentProps => {
        const { guests: { list, filter } } = state as IConfiguredStore;
        return {
            list: filterGuest(list, filter)
        }
    }
)(GuestListComponent);