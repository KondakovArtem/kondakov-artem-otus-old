import React from 'react';
import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { Actions as headerActions } from '../../redux/header/header.ducks';
import { HeaderComponent } from '../../components/header/header.component';
import {IProps as IComponentProps, IHandlers as IComponentHandlers} from '../../components/header/header.component';


export const HeaderContainer = connect<IComponentProps, IComponentHandlers>(
    (state): IComponentProps => {
        const { header: { inputValue}, guests: {list: guestList} } = state as IConfiguredStore;
        let guestTotal = guestList.length;
        guestList.forEach((guest) => {
            guestTotal +=  guest.withCouple ? 1 : 0;
        });
        return {
            inputValue,
            guestTotal
        }
    }, {
        setInputValue: headerActions.setInputValue,
        onAddGuest: headerActions.addNewGuest
    }
)(HeaderComponent);