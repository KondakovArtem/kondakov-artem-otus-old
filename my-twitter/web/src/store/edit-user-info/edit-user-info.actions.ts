import {storage} from 'services/firebase';

import {ThunkAction} from 'store';
import {IModifiableUserInfo} from 'models/user.model';
import {navUtils} from 'services/navigation';
import {USER_PROFILE_SCREEN, USER_PROFILE_EDIT_SCREEN} from 'models/navigation.model';
import {getUserInfo, updateUserInfo} from 'services/database/userinfo.database';
import {
  fillEditUserInfo,
  setName,
  setLocation,
  setAbout,
  setWebSite,
  setBirthDate,
  setShowAvatarEditor,
} from './edit-user-info.ducks';
import {uploadImage} from 'services/database/database.service';

export const Actions = {
  editUserProfile: (): ThunkAction => async (...redux) => {
    const userInfo = await getUserInfo();
    const {about, birthDate, location, name, webSite} = userInfo;
    Actions.fillEditUserInfo({
      about,
      birthDate,
      location,
      name,
      webSite,
    })(...redux);
    navUtils.navigate(USER_PROFILE_EDIT_SCREEN);
  },
  getFollowers: (): ThunkAction => async () => {},
  saveUserProfile: (): ThunkAction => async (dispatch, getStore) => {
    const {editUserInfo} = getStore();
    const {about, webSite, name, location, birthDate} = editUserInfo;
    await updateUserInfo({
      about,
      webSite,
      name,
      location,
      birthDate,
    });
    navUtils.navigate(USER_PROFILE_SCREEN);
  },
  showAvatarEditor: (): ThunkAction => async dispatch => {
    dispatch(setShowAvatarEditor(true));
  },
  hideAvatarEditor: (): ThunkAction => async dispatch => {
    dispatch(setShowAvatarEditor(false));
  },
  fillEditUserInfo: (userInfo: IModifiableUserInfo): ThunkAction => async dispatch => {
    dispatch(fillEditUserInfo(userInfo));
  },
  setName: (name: string): ThunkAction => dispath => {
    dispath(setName(name));
  },
  setLocation: (location: string): ThunkAction => dispath => {
    dispath(setLocation(location));
  },
  setAbout: (about: string): ThunkAction => dispath => {
    dispath(setAbout(about));
  },
  setWebSite: (webSite: string): ThunkAction => dispath => {
    dispath(setWebSite(webSite));
  },
  setBirthDate: (birthDate: Date): ThunkAction => dispath => {
    dispath(setBirthDate(birthDate));
  },
  saveAvatar: (image: string): ThunkAction => async dispatch => {
    const newAvatar = await uploadImage(image, 'avatar');
    if (newAvatar) {
      await updateUserInfo({avatar: newAvatar});
      dispatch(setShowAvatarEditor(false));
    }
  },
};
