import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {motion} from 'framer-motion';

import {IConfiguredStore} from 'store';
import {Actions as usersActions} from 'store/users/users.actions';
import {HeaderComponent} from 'components/header/header.component';
//import {InputSearchComponent} from 'components/input-search/input-search.component';
import {IUserInfo} from 'models/user.model';
//import {FollowListComponent} from 'components/follow-list/follow-list.component';
//import {HeaderActionComponent} from 'components/header-action/header-action.component';
import {thumbnailVariants} from 'constants/theme';
import {FollowListComponent} from 'components/follow-list/follow-list.component';

interface IProps {
  search: string;
  searchFollows: IUserInfo[];
}
interface IHandlers {
  setSearch(value: string): void;
  backPress(): void;
  filterSearchFollows(): void;
}

const styles = StyleSheet.create({
  defContainer: {
    flex: 0,
    flexGrow: 0,
  },
  expandContainer: {flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'row'},
});

export const FollowsPageComponent: FC<IProps & IHandlers> = ({
  search,
  setSearch,
  searchFollows,
  filterSearchFollows,
}) => {
  useEffect(() => {
    filterSearchFollows();
  }, []);

  return (
    <motion.div {...thumbnailVariants} style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
      <HeaderComponent
      //   rightComponent={<InputSearchComponent onChangeText={setSearch}>{search}</InputSearchComponent>}
      >
        Follows
      </HeaderComponent>
      <FollowListComponent list={searchFollows} />
    </motion.div>
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
