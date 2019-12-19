import React from 'react';
import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { Actions as headerActions } from '../../redux/header/header.ducks';
import { Actions as guestActions } from '../../redux/guests/guests.ducks';
import { HeaderComponent } from '../../components/header/header.component';
import {IProps as IComponentProps, IHandlers as IComponentHandlers} from '../../components/header/header.component';


export const HeaderContainer = connect<IComponentProps, IComponentHandlers>(
    (state): IComponentProps => {
        const { header: { inputValue}, guests: {list: guestList, filter} } = state as IConfiguredStore;
        let guestTotal = guestList.length;
        guestList.forEach((guest) => {
            guestTotal +=  guest.withPartner ? 1 : 0;
        });
        return {
            inputValue,
            guestFilter: filter,
            guestTotal
        }
    }, {
        setInputValue: headerActions.setInputValue,
        onAddGuest: headerActions.addNewGuest,
        updateGuestFilter: guestActions.updateGuestFilter
    }
)(HeaderComponent);