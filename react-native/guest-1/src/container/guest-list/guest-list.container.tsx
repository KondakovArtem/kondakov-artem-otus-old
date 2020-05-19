import {connect} from 'react-redux';

import {IConfiguredStore} from '@app/redux/store';
import {GuestListComponent} from '@app/components/guest-list/guest-list.component';
import {Actions as guestActions} from '@app/redux/guests/guests.ducks';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
} from '@app/components/guest-list/guest-list.component';
import {filterGuest} from '@app/redux/guests/guests.ducks';

export const GuestList = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  state => {
    const {guests} = state;
    const {list, filter} = guests;
    return {
      list: filterGuest(list, filter),
    };
  },
  {
    onInit: guestActions.initGuest,
  },
)(GuestListComponent);
