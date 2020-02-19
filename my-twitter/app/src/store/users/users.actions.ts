import Fuse, {FuseOptions} from 'fuse.js';
import {map, isEmpty} from 'lodash-es';

import {ThunkAction} from 'store';
import {IUserInfo, IUserInfoMutation, IDBFollows, IDBFollowersMutation} from 'models/user.model';
import {navUtils} from 'services/navigation/navigation.service';
import {onDbUsersChanged} from 'services/database/userinfo.database';
import {FOLLOW_SCREEN, USER_INFO_SCREEN} from 'models/navigation.model';
import {toggleFollowDb, onDbFollowsChanged, onDbFollowersChanged} from 'services/database/follows.database';
import {Actions as postActions} from 'store/post/post.actions';
import {
  mutateUsers,
  mutateFollowers,
  setFollows,
  setSearchFollows,
  setSearch,
  selectUser,
} from 'store/users/users.ducks';
import {IPost} from 'models/post.model';

export const Actions = {
  init: (): ThunkAction => async (dispatch, getStore) => {
    onDbUsersChanged((userInfoMutations: IUserInfoMutation[]) => {
      dispatch(mutateUsers(userInfoMutations));
      if (navUtils.getCurrentScreen() === FOLLOW_SCREEN) {
        Actions.filterSearchFollows()(dispatch, getStore);
      }
    });
    onDbFollowsChanged((data: IDBFollows = {} as IDBFollows) => {
      const {ids = []} = data;
      Actions.updateFollows(ids)(dispatch, getStore);
    });
    onDbFollowersChanged((data: IDBFollowersMutation[]) => {
      dispatch(mutateFollowers(data));
    });
  },
  updateFollows: (ids: string[]): ThunkAction => (dispatch, getStore) => {
    dispatch(setFollows(ids));
    postActions.updateFollowPost()(dispatch, getStore);
  },
  filterSearchFollows: (): ThunkAction => async (dispatch, getStore) => {
    const {users: usersStore, authData} = getStore();
    const {userInfoMap = {}, search} = usersStore;
    const {userUid} = authData;

    const infoList = map(userInfoMap, item => item).filter(({id}) => id !== userUid);

    if (isEmpty(search)) {
      dispatch(setSearchFollows(infoList));
      return;
    }
    const fuse = new Fuse(infoList, {
      keys: ['name', 'email', 'about'],
    } as FuseOptions<IUserInfo>);
    dispatch(setSearchFollows(fuse.search(search) as IUserInfo[]));
  },
  setSearch: (value: string): ThunkAction => async (dispatch, getStore) => {
    dispatch(setSearch(value));
    Actions.filterSearchFollows()(dispatch, getStore);
  },
  backPress: () => async () => {
    navUtils.back();
  },
  toggleFollow: (userUid: string) => async () => {
    await toggleFollowDb(userUid);
  },
  showUserInfo: ({id, author}: IPost): ThunkAction => dispatch => {
    dispatch(
      selectUser({
        userUid: author,
        postUid: `${id}_${author}`,
      }),
    );
    navUtils.navigate(USER_INFO_SCREEN);
  },
};
