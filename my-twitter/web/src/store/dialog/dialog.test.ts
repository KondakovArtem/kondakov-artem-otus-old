import {createMock} from 'ts-auto-mock';
import {Action} from 'typesafe-actions';

import reducer, {IStore, initialState, ADD_DIALOG, REMOVE_DIALOG} from './dialog.ducks';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';
import {DialogAction} from 'models/dialog.model';

describe('dialog reducers', () => {
  it('should fillUserInfo', () => {
    const storeMock = createMock<IStore>();
    storeMock.dialogs = [
      {data: 'data', action: DialogAction.DELETE_POST, buttons: [], title: 'title', uid: 'qwerqwer'},
    ];
    expect(reducer(storeMock, {type: SIGN_OUT_CLEAR} as Action)).toEqual({
      ...initialState,
    } as IStore);
  });

  it('should addDialog', () => {
    const storeMock = createMock<IStore>();
    const payload = {data: 'data', action: DialogAction.DELETE_POST, buttons: [], title: 'title', uid: 'qwerqwer'};
    expect(reducer(storeMock, {type: ADD_DIALOG, payload} as Action)).toEqual({
      ...initialState,
      dialogs: [payload],
    } as IStore);
  });

  it('should removeDialog', () => {
    const storeMock = createMock<IStore>();
    const payload = {data: 'data', action: DialogAction.DELETE_POST, buttons: [], title: 'title', uid: 'qwerqwer'};
    storeMock.dialogs = [payload];

    expect(reducer(storeMock, {type: REMOVE_DIALOG, payload} as Action)).toEqual({
      ...initialState,
      dialogs: [],
    } as IStore);
  });
});
