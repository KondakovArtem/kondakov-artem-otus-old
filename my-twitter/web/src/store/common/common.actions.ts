import {ThunkAction} from 'store';

import authActions from 'store/auth/auth.actions';
import {setInited} from 'store/common/common.ducks';

export const inited = false;

export const Actions = {
  init: (): ThunkAction => async (...redux) => {
    await authActions.initAuth()(...redux);
  },
  setInited: (value: boolean): ThunkAction => async dispatch => {
    dispatch(setInited(value));
  },
};
