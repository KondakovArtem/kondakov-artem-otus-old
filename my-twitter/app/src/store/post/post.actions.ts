import {isEmpty} from 'lodash-es';

import {ThunkAction} from 'store';
import {IPost, IPostMutation} from 'models/post.model';
import {
  createNewPost,
  onDbUserPostChanged,
  toggleLikeDbPost,
  onDbFollowsPostChanged,
  deleteDBPost,
  getDBUserPosts,
  getDBFollowPosts,
} from 'services/database/post.database';
import {takePhoto} from 'services/photo/photo.service';
import {uploadImage} from 'services/database/database.service';
import {navUtils} from 'services/navigation/navigation.service';
import {unregisterDbSubscriber} from 'services/database/subscription.service';
import {Actions as dialogActions} from 'store/dialog/dialog.actions';
import {DialogAction, IDialogButtonAction} from 'models/dialog.model';
import {DELETE_POST_DURATION} from 'constants/theme';
import {
  mutateUserPosts,
  mutateFollowPosts,
  setFollowPosts,
  setPostText,
  clearNewPost,
  appendToDeletingPost,
  deletePost,
  removeFromDeletingPost,
  setNewPostPhoto,
  setRefreshingUserPost,
} from 'store/post/post.ducks';
import {uuidv4} from 'services/core/core.service';

/////////////////////////////////////////
// Thunks
/////////////////////////////////////////
export const Actions = {
  init: (): ThunkAction => async dispatch => {
    onDbUserPostChanged(10, (mutationList: IPostMutation[]) => {
      dispatch(mutateUserPosts(mutationList));
    });
  },
  updateFollowPost: (): ThunkAction => async (dispatch, getStore) => {
    const {users, post, authData} = getStore();
    const {userUid} = authData;
    const {follows} = users;
    const {followPostCount} = post;
    dispatch(setFollowPosts([]));
    unregisterDbSubscriber('followPosts');
    if (follows.length) {
      onDbFollowsPostChanged(followPostCount, [...follows, userUid], (mutationList: IPostMutation[]) => {
        dispatch(mutateFollowPosts(mutationList));
      });
    }
  },
  fetchUserPost: (): ThunkAction => async (dispatch, getStore) => {
    dispatch(setRefreshingUserPost(true));
    const {post} = getStore();
    const {userPostCount} = post;
    try {
      const postList = await getDBUserPosts(userPostCount);
      dispatch(mutateUserPosts(postList.map(doc => ({type: 'modified', doc} as IPostMutation))));
    } catch (e) {}
    dispatch(setRefreshingUserPost(false));
  },

  fetchFollowPost: (): ThunkAction => async (dispatch, getStore) => {
    dispatch(setRefreshingUserPost(true));
    const {post, users} = getStore();
    const {follows} = users;
    const {followPostCount} = post;
    try {
      const postList = await getDBFollowPosts(followPostCount, follows);
      dispatch(mutateFollowPosts(postList.map(doc => ({type: 'modified', doc} as IPostMutation))));
    } catch (e) {}
    dispatch(setRefreshingUserPost(false));
  },

  createNewPost: (data: Partial<IPost>) => async () => {
    await createNewPost(data);
  },
  changePostText: (value: string): ThunkAction => async dispatch => {
    dispatch(setPostText(value));
  },
  postMessage: (): ThunkAction => async (dispatch, getStore) => {
    const {post} = getStore();
    const {newPost} = post;
    const {imagePath, text} = newPost;
    let image;
    try {
      if (!isEmpty(imagePath)) {
        image = await uploadImage(imagePath, `stock/${uuidv4()}`);
      }
      await createNewPost({image, text});
    } catch (e) {}
    dispatch(clearNewPost());
    navUtils.back();
  },
  deletePostAction: (buttonAction: IDialogButtonAction): ThunkAction => async dispatch => {
    const {dialog, key} = buttonAction;
    const {data: post} = dialog;
    const {id} = post;
    if (key === 'delete') {
      dispatch(appendToDeletingPost(id));
      setTimeout(async () => {
        dispatch(deletePost(post));
        await deleteDBPost(post);
        dispatch(removeFromDeletingPost(id));
      }, DELETE_POST_DURATION);
    }
  },
  deletePostConfirm: (post: IPost): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {userUid} = authData;
    if (userUid === post.author) {
      dialogActions.addDialog({
        title: 'Do you really want to delete this post?',
        buttons: [
          {title: 'Cancel', type: 'outline', key: 'cancel'},
          {title: 'Delete', key: 'delete'},
        ],
        action: DialogAction.DELETE_POST,
        data: post,
      })(dispatch, getStore);
    }
  },
  takePhoto: (): ThunkAction => async dispatch => {
    const photoRef = await takePhoto();
    if (photoRef) {
      dispatch(setNewPostPhoto(photoRef.uri));
    }
  },
  removePhoto: (): ThunkAction => async dispatch => {
    dispatch(setNewPostPhoto(''));
  },
  togglePostLike: ({id}: IPost) => async () => {
    await toggleLikeDbPost(id);
  },
};

export default Actions;
