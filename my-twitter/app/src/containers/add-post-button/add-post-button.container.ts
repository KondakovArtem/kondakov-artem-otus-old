import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import {
  AddPostButtonComponent,
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
} from 'components/add-post-button/add-post-button.component';
import {navUtils} from 'services/navigation/navigation.service';
import {
  NEW_POST_SCREEN,
  USER_PROFILE_SCREEN,
  USER_PROFILE_EDIT_SCREEN,
  MAIN_SCREEN,
  EXPLORE_SCREEN,
  FOLLOW_SCREEN,
} from 'models/navigation.model';
import {isEmpty} from 'lodash-es';

export interface IOwnHandlers {
  onPress?(): void;
}

export const AddPostButton = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  ({common}) => {
    const {screen} = common;
    const visible =
      !isEmpty(screen) &&
      [USER_PROFILE_SCREEN, USER_PROFILE_EDIT_SCREEN, MAIN_SCREEN, EXPLORE_SCREEN, FOLLOW_SCREEN].includes(screen);
    return {
      visible,
    };
  },
  {
    onPress: () => () => navUtils.navigate(NEW_POST_SCREEN),
  },
)(AddPostButtonComponent);
