import {createMock, createMockList} from 'ts-auto-mock';
import {Action} from 'typesafe-actions';

import reducer, {
  IStore,
  initialState,
  SET_SEARCH,
  SET_SEARCH_FOLLOWS,
  MUTATE_USERS,
  SET_FOLLOWS,
  MUTATE_FOLLOWERS,
} from './users.ducks';
import {CLEAR_NEW_POST} from 'store/post/post.ducks';
import {IUserInfo, IUserInfoMutation, IDBFollowersMutation} from 'models/user.model';

describe('users reducers', () => {
  it('should clearNewPost', () => {
    const storeMock = createMock<IStore>();

    expect(reducer(storeMock, {type: CLEAR_NEW_POST} as Action)).toEqual({
      ...initialState,
    } as IStore);
  });

  it('should setSearch', () => {
    const storeMock = createMock<IStore>();

    const payload = 'search';
    expect(reducer(storeMock, {type: SET_SEARCH, payload} as Action)).toEqual({
      ...storeMock,
      search: payload,
    } as IStore);
  });

  it('should setSearchFollows', () => {
    const storeMock = createMock<IStore>();

    const payload = createMockList<IUserInfo>(2, idx => ({
      id: idx + '',
    }));
    expect(reducer(storeMock, {type: SET_SEARCH_FOLLOWS, payload} as Action)).toEqual({
      ...storeMock,
      searchFollows: payload,
    } as IStore);
  });

  it('should mutateUsers', () => {
    const storeMock = createMock<IStore>({
      userInfoMap: {
        '0': {
          avatar: 'test_avatar0',
          id: '0',
        },
        '1': {
          avatar: 'test_avatar1',
          id: '1',
        },
        '2': {
          avatar: 'test_avatar2',
          id: '2',
        },
      },
    });

    const payload = createMockList<IUserInfoMutation>(3, idx => ({
      type: idx % 2 ? 'modified' : 'removed',
      doc: {
        avatar: 'avatar',
        id: idx + '',
      },
    }));
    expect(reducer(storeMock, {type: MUTATE_USERS, payload} as Action)).toEqual({
      ...storeMock,
      userInfoMap: {
        '1': createMock<IUserInfo>({
          id: '1',
          avatar: 'avatar',
        }),
      },
    } as IStore);
  });

  it('should setFollows', () => {
    const storeMock = createMock<IStore>({
      follows: ['234', '345'],
    });

    const payload = ['123', '234'];
    expect(reducer(storeMock, {type: SET_FOLLOWS, payload} as Action)).toEqual({
      ...storeMock,
      follows: payload,
    } as IStore);
  });

  it('should mutateFollowers', () => {
    const storeMock = createMock<IStore>({
      follows: ['234', '345'],
    });

    const payload = createMockList<IDBFollowersMutation>(2, idx => ({
      type: idx % 2 ? 'added' : 'removed',
      doc: {
        id: idx + '',
        ids: ['123', '11'],
      },
    }));
    expect(reducer(storeMock, {type: MUTATE_FOLLOWERS, payload} as Action)).toEqual({
      ...storeMock,
      followers: ['1'],
    } as IStore);
  });
});
