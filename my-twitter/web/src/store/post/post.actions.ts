import {isEmpty} from 'lodash-es';
import {message} from 'antd';

import {ThunkAction} from 'store';
import {IPost, IPostMutation} from 'models/post.model';
import {
  createNewPost,
  onDbUserPostChanged,
  toggleLikeDbPost,
  onDbFollowsPostChanged,
  deleteDBPost,
} from 'services/database/post.database';
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
  setIsFetching,
} from 'store/post/post.ducks';
import {uploadImage} from 'services/database/database.service';
import {uuidv4} from 'services/core/core.service';
import {Dispatch} from 'redux';

/////////////////////////////////////////
// Thunks
/////////////////////////////////////////
export const Actions = {
  init: (): ThunkAction => async (dispatch, getStore) => {
    const {post} = getStore();
    const {userPostCount} = post;
    onDbUserPostChanged(userPostCount, (mutationList: IPostMutation[]) => {
      dispatch(mutateUserPosts(mutationList));
    });
  },
  updateFollowPost: (): ThunkAction => async (dispatch, getStore) => {
    const {users, post, authData} = getStore();
    const {userUid} = authData;
    const {follows} = users;
    const {followPostCount} = post;
    unregisterDbSubscriber('followPosts');
    dispatch(setFollowPosts([]));
    if (follows.length) {
      onDbFollowsPostChanged(followPostCount, [...follows, userUid], (mutationList: IPostMutation[]) => {
        dispatch(mutateFollowPosts(mutationList));
      });
    }
  },
  fetchMoreUserPosts: () => async () => {
    // dispatch(appendUserPosts(await getUserPosts()));
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
    const {image: imageData, text} = newPost;
    let image = null;
    dispatch(setIsFetching(true));
    try {
      if (!isEmpty(imageData)) {
        image = await uploadImage(imageData, `stock/${uuidv4()}`);
      }
      await createNewPost({image, text});
    } catch (e) {
      message.error(e.message);
    }
    dispatch(setIsFetching(false));
    dispatch(clearNewPost());
  },
  deletePostAction: (buttonAction: IDialogButtonAction) => async (dispatch: Dispatch) => {
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
  takePhoto: (image: string): ThunkAction => async dispatch => {
    dispatch(setNewPostPhoto(image));
  },
  removePhoto: (): ThunkAction => async dispatch => {
    dispatch(setNewPostPhoto(''));
  },
  togglePostLike: ({id}: IPost) => async () => {
    await toggleLikeDbPost(id);
  },
};
