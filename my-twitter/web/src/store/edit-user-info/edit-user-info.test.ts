import {createMock} from 'ts-auto-mock';
import {Action} from 'typesafe-actions';

import reducer, {
  IStore,
  SET_NAME,
  SET_LOCATION,
  SET_ABOUT,
  SET_WEBSITE,
  FILL_EDIT_USER_INFO,
  SET_BIRTHDATE,
  initialState,
  SET_SHOW_AVATAR_EDITOR,
} from './edit-user-info.ducks';
import {IModifiableUserInfo} from 'models/user.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

describe('edit-user-info reducers', () => {
  it('should setName', () => {
    const storeMock = createMock<IStore>();
    const payload = 'name';
    expect(reducer(storeMock, {type: SET_NAME, payload} as Action)).toEqual({
      ...storeMock,
      name: payload,
    } as IStore);
  });

  it('should setLocation', () => {
    const storeMock = createMock<IStore>();
    const payload = 'location';
    expect(reducer(storeMock, {type: SET_LOCATION, payload} as Action)).toEqual({
      ...storeMock,
      location: payload,
    } as IStore);
  });

  it('should setAbout', () => {
    const storeMock = createMock<IStore>();
    const payload = 'about_value';
    expect(reducer(storeMock, {type: SET_ABOUT, payload} as Action)).toEqual({
      ...storeMock,
      about: payload,
    } as IStore);
  });

  it('should setWebSite', () => {
    const storeMock = createMock<IStore>();
    const payload = 'website_value';
    expect(reducer(storeMock, {type: SET_WEBSITE, payload} as Action)).toEqual({
      ...storeMock,
      webSite: payload,
    } as IStore);
  });

  it('should setBirthDate', () => {
    const storeMock = createMock<IStore>();
    const payload = new Date();
    expect(reducer(storeMock, {type: SET_BIRTHDATE, payload} as Action)).toEqual({
      ...storeMock,
      birthDate: payload,
    } as IStore);
  });

  it('should fillEditUserInfo', () => {
    const storeMock = createMock<IStore>();
    const payload = createMock<IModifiableUserInfo>();
    expect(reducer(storeMock, {type: FILL_EDIT_USER_INFO, payload} as Action)).toEqual({
      ...storeMock,
      ...payload,
    } as IStore);
  });

  it('should fillEditUserInfo', () => {
    const storeMock = createMock<IStore>();
    expect(reducer(storeMock, {type: SIGN_OUT_CLEAR} as Action)).toEqual({
      ...initialState,
    } as IStore);
  });
  it('should setShowAvatarEditor', () => {
    const storeMock = createMock<IStore>();
    const payload = true;
    expect(reducer(storeMock, {type: SET_SHOW_AVATAR_EDITOR, payload} as Action)).toEqual({
      ...storeMock,
      showAvatarEditor: payload,
    } as IStore);
  });
});
