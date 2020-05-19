import {createMock} from 'ts-auto-mock';
import {Action} from 'typesafe-actions';

import reducer, {
  IStore,
  APPEND_USER_POSTS,
  APPEND_FOLLOW_POSTS,
  SET_FOLLOW_POSTS,
  SET_NEW_POST_PHOTO,
  SET_IS_FETCHING,
  CLEAR_NEW_POST,
  initialState,
  SET_POST_TEXT,
  MUTATE_USER_POSTS,
  MUTATE_FOLLOW_POSTS,
  APPEND_TO_DELETING_POST,
  REMOVE_FROM_DELETING_POST,
  DELETE,
} from './post.ducks';
import {IPost, IPostMutation} from 'models/post.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

describe('post reducers', () => {
  it('should appendUserPosts', () => {
    const posts = [
      createMock<IPost>({
        id: '1',
        createdAt: new Date(2012, 1, 1),
      }),
      createMock<IPost>({
        id: '2',
        createdAt: new Date(2011, 1, 1),
      }),
      createMock<IPost>({
        id: '3',
        createdAt: new Date(2010, 1, 1),
      }),
    ];

    const storeMock = createMock<IStore>({
      userPosts: [posts[1], posts[0]],
    });
    const payload = [posts[2], posts[1]];

    expect(reducer(storeMock, {type: APPEND_USER_POSTS, payload} as Action)).toEqual({
      ...storeMock,
      userPosts: [...posts],
    } as IStore);
  });

  it('should appendFollowPosts', () => {
    const posts = [
      createMock<IPost>({
        id: '1',
        createdAt: new Date(2012, 1, 1),
      }),
      createMock<IPost>({
        id: '2',
        createdAt: new Date(2011, 1, 1),
      }),
      createMock<IPost>({
        id: '3',
        createdAt: new Date(2010, 1, 1),
      }),
    ];

    const storeMock = createMock<IStore>({
      followPosts: [posts[1], posts[0]],
    });
    const payload = [posts[2], posts[1]];

    expect(reducer(storeMock, {type: APPEND_FOLLOW_POSTS, payload} as Action)).toEqual({
      ...storeMock,
      followPosts: [...posts],
    } as IStore);
  });

  it('should setFollowPosts', () => {
    const posts = [
      createMock<IPost>({
        id: '1',
        createdAt: new Date(2012, 1, 1),
      }),
      createMock<IPost>({
        id: '2',
        createdAt: new Date(2011, 1, 1),
      }),
      createMock<IPost>({
        id: '3',
        createdAt: new Date(2010, 1, 1),
      }),
    ];

    const storeMock = createMock<IStore>({
      followPosts: [posts[1], posts[0]],
      followPostCount: 100,
    });
    const payload = [posts[2]];

    expect(reducer(storeMock, {type: SET_FOLLOW_POSTS, payload} as Action)).toEqual({
      ...storeMock,
      followPosts: [posts[2]],
      followPostCount: 50,
    } as IStore);
  });

  it('should setNewPostPhoto', () => {
    const storeMock = createMock<IStore>();
    const payload = 'photo_data';
    expect(reducer(storeMock, {type: SET_NEW_POST_PHOTO, payload} as Action)).toEqual({
      ...storeMock,
      newPost: {
        ...storeMock.newPost,
        image: payload,
      },
    } as IStore);
  });

  it('should setIsFetching', () => {
    const storeMock = createMock<IStore>();
    const payload = true;
    expect(reducer(storeMock, {type: SET_IS_FETCHING, payload} as Action)).toEqual({
      ...storeMock,
      newPost: {
        ...storeMock.newPost,
        isFetching: payload,
      },
    } as IStore);
  });

  it('should clearNewPost', () => {
    const storeMock = createMock<IStore>();

    expect(reducer(storeMock, {type: CLEAR_NEW_POST} as Action)).toEqual({
      ...storeMock,
      newPost: {...initialState.newPost},
    } as IStore);
  });

  it('should setPostText', () => {
    const storeMock = createMock<IStore>();
    const payload = 'text';
    expect(reducer(storeMock, {type: SET_POST_TEXT, payload} as Action)).toEqual({
      ...storeMock,
      newPost: {
        ...storeMock.newPost,
        text: payload,
      },
    } as IStore);
  });

  it('should signOutClear', () => {
    const storeMock = createMock<IStore>();
    expect(reducer(storeMock, {type: SIGN_OUT_CLEAR} as Action)).toEqual({
      ...initialState,
    } as IStore);
  });

  it('should mutateUserPosts', () => {
    const storeMock = createMock<IStore>({
      userPosts: [
        {
          id: '1',
          image: '',
          likes: [],
          author: '',
          createdAt: new Date(2010, 1, 1),
          text: 'test1',
        },
        {
          id: '2',
          createdAt: new Date(2011, 1, 1),
          text: 'test2',
        },
      ],
    });

    const payload = [
      createMock<IPostMutation>({
        type: 'added',
        doc: {
          id: '3',
          createdAt: new Date(2012, 1, 1),
        },
      }),
      createMock<IPostMutation>({
        type: 'modified',
        doc: {
          id: '2',
          createdAt: new Date(2013, 1, 1),
          text: 'mutate_text2',
        },
      }),
    ];

    expect(reducer(storeMock, {type: MUTATE_USER_POSTS, payload} as Action)).toEqual({
      ...storeMock,
      userPosts: [
        createMock<IPost>({
          id: '2',
          createdAt: new Date(2013, 1, 1),
          text: 'mutate_text2',
        }),
        createMock<IPost>({
          id: '3',
          createdAt: new Date(2012, 1, 1),
        }),
        createMock<IPost>({
          id: '1',
          createdAt: new Date(2010, 1, 1),
          text: 'test1',
        }),
      ],
    } as IStore);
  });

  it('should mutateFollowPosts', () => {
    const storeMock = createMock<IStore>({
      followPosts: [
        {
          id: '1',
          image: '',
          likes: [],
          author: '',
          createdAt: new Date(2010, 1, 1),
          text: 'test1',
        },
        {
          id: '2',
          createdAt: new Date(2011, 1, 1),
          text: 'test2',
        },
      ],
    });

    const payload = [
      createMock<IPostMutation>({
        type: 'added',
        doc: {
          id: '3',
          author: '',
          createdAt: new Date(2012, 1, 1),
        },
      }),
      createMock<IPostMutation>({
        type: 'modified',
        doc: {
          id: '2',
          createdAt: new Date(2013, 1, 1),
          text: 'mutate_text2',
        },
      }),
    ];

    expect(reducer(storeMock, {type: MUTATE_FOLLOW_POSTS, payload} as Action)).toEqual({
      ...storeMock,
      followPosts: [
        createMock<IPost>({
          id: '2',
          createdAt: new Date(2013, 1, 1),
          text: 'mutate_text2',
        }),
        createMock<IPost>({
          id: '3',
          createdAt: new Date(2012, 1, 1),
        }),
        createMock<IPost>({
          id: '1',
          createdAt: new Date(2010, 1, 1),
          text: 'test1',
        }),
      ],
    } as IStore);
  });

  it('should appendToDeletingPost', () => {
    const storeMock = createMock<IStore>({
      postToDelete: ['234'],
    });
    const payload = '123';

    expect(reducer(storeMock, {type: APPEND_TO_DELETING_POST, payload} as Action)).toEqual({
      ...storeMock,
      postToDelete: ['234', '123'],
    } as IStore);
  });

  it('should removeFromDeletingPost', () => {
    const storeMock = createMock<IStore>({
      postToDelete: ['234'],
    });
    const payload = '234';

    expect(reducer(storeMock, {type: REMOVE_FROM_DELETING_POST, payload} as Action)).toEqual({
      ...storeMock,
      postToDelete: [],
    } as IStore);
  });

  it('should deletePost', () => {
    const storeMock = createMock<IStore>({
      userPosts: [
        createMock<IPost>({
          id: '1',
        }),
      ],
      followPosts: [
        createMock<IPost>({
          id: '1',
        }),
      ],
    } as IStore);

    const payload = createMock<IPost>({
      id: '1',
    });

    expect(reducer(storeMock, {type: DELETE, payload} as Action)).toEqual({
      ...storeMock,
      userPosts: [],
      followPosts: [],
    } as IStore);
  });
});
