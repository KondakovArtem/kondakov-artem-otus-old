import {createMock} from 'ts-auto-mock';
import {Action} from 'typesafe-actions';

import reducer, {IStore, initialState, SET_SCREEN, SET_INITED} from './common.ducks';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

describe('common reducers', () => {
  it('should signOutClear', () => {
    const storeMock = createMock<IStore>();
    storeMock.inited = true;
    storeMock.screen = 'some screen';

    expect(reducer(storeMock, {type: SIGN_OUT_CLEAR} as Action)).toEqual({
      ...initialState,
      inited: true,
    } as IStore);
  });

  it('should setScreen', () => {
    const storeMock = createMock<IStore>();
    const payload = 'test_screen';
    expect(reducer(storeMock, {type: SET_SCREEN, payload} as Action)).toEqual({
      ...storeMock,
      screen: payload,
    } as IStore);
  });

  it('should setInited', () => {
    const storeMock = createMock<IStore>();
    const payload = true;
    expect(reducer(storeMock, {type: SET_INITED, payload} as Action)).toEqual({
      ...storeMock,
      inited: true,
    } as IStore);
  });
});
