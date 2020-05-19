import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import {Actions as usersActions} from 'store/users/users.actions';
import {HeaderComponent} from 'components/header/header.component';
import {IUserInfo} from 'models/user.model';
import {thumbnailVariants} from 'constants/theme';
import {FollowListComponent} from 'components/follow-list/follow-list.component';
import {MotionWrapperComponent} from 'components/motion-wrapper/motion-wrapper.component';

interface IProps {
  search: string;
  searchFollows: IUserInfo[];
}
interface IHandlers {
  setSearch(value: string): void;
  backPress(): void;
  filterSearchFollows(): void;
}

export const FollowsPageComponent: FC<IProps & IHandlers> = ({searchFollows, filterSearchFollows}) => {
  useEffect(() => {
    filterSearchFollows();
  }, [filterSearchFollows]);

  return (
    <MotionWrapperComponent {...thumbnailVariants}>
      <HeaderComponent>Follows</HeaderComponent>
      <FollowListComponent list={searchFollows} />
    </MotionWrapperComponent>
  );
};

export const FollowsPage = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({users}) => {
    const {search, searchFollows} = users;
    return {
      search,
      searchFollows,
    };
  },
  {
    setSearch: usersActions.setSearch,
    backPress: usersActions.backPress,
    filterSearchFollows: usersActions.filterSearchFollows,
  },
)(FollowsPageComponent);
