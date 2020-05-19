import {createMock} from 'ts-auto-mock';
import {Action} from 'typesafe-actions';

import {IUserInfo} from 'models/user.model';
import reducer, {
  IStore,
  SIGN_OUT_CLEAR,
  initialState,
  FILL_USER_INFO,
  SET_AVATAR,
  SET_PASSWORD,
  SET_REPEAT_PASSWORD,
  SET_USERNAME,
  TOGGLE_SHOW_PASSWORD,
  SET_FETCHING,
  CLEAR_ERROR_MESSAGE,
  APPEND_ERROR_MESSAGE,
} from './auth.ducks';

describe('auth reducers', () => {
  it('should fillUserInfo', () => {
    const storeMock = createMock<IStore>();
    const data = {userUid: '1234', info: createMock<IUserInfo>()};
    expect(reducer(storeMock, {type: FILL_USER_INFO, payload: data} as Action)).toEqual({
      ...data,
      login: storeMock.login,
    });
  });

  it('should clearData', () => {
    const storeMock = createMock<IStore>();
    storeMock.userUid = '1234';
    expect(reducer(storeMock, {type: SIGN_OUT_CLEAR} as Action)).toEqual(initialState);
  });

  it('should setAvatar', () => {
    const storeMock = createMock<IStore>();
    const avatar = 'avatar-url';
    expect(reducer(storeMock, {type: SET_AVATAR, payload: avatar} as Action)).toEqual({
      ...storeMock,
      info: {
        avatar: avatar,
      },
    } as IStore);
  });

  it('should setPassword', () => {
    const storeMock = createMock<IStore>();
    const password = 'password';
    expect(reducer(storeMock, {type: SET_PASSWORD, payload: password} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        password,
      },
    } as IStore);
  });

  it('should setRepeatPassword', () => {
    const storeMock = createMock<IStore>();
    const repeatPassword = 'repeatPassword';
    expect(reducer(storeMock, {type: SET_REPEAT_PASSWORD, payload: repeatPassword} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        repeatPassword: repeatPassword,
      },
    } as IStore);
  });

  it('should setUsername', () => {
    const storeMock = createMock<IStore>();
    const payload = 'username';
    expect(reducer(storeMock, {type: SET_USERNAME, payload: payload} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        username: payload,
      },
    } as IStore);
  });

  it('should toggleShowPassword', () => {
    const storeMock = createMock<IStore>();
    const payload = true;
    expect(reducer(storeMock, {type: TOGGLE_SHOW_PASSWORD, payload: payload} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        showPassword: payload,
      },
    } as IStore);
  });

  it('should setFetching', () => {
    const storeMock = createMock<IStore>();
    const payload = true;
    expect(reducer(storeMock, {type: SET_FETCHING, payload: payload} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        isFetching: payload,
      },
    } as IStore);
  });

  it('should appendInputError', () => {
    const storeMock = createMock<IStore>();
    const payload = {
      testError: 'errorMessage',
    };
    expect(reducer(storeMock, {type: APPEND_ERROR_MESSAGE, payload: payload} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        errors: payload,
      },
    } as IStore);
  });

  it('should clearInputError', () => {
    const storeMock = createMock<IStore>();
    storeMock.login.errors = {
      testError: 'errorMessage',
    };
    expect(reducer(storeMock, {type: CLEAR_ERROR_MESSAGE} as Action)).toEqual({
      ...storeMock,
      login: {
        ...storeMock.login,
        errors: {},
      },
    } as IStore);
  });
});
