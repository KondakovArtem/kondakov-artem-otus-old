import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {StyleSheet} from 'react-native';

import {IConfiguredStore} from 'store';
import {Actions as usersActions} from 'store/users/users.ducks';
import {HeaderComponent} from 'components/header/header.component';
import {InputSearchComponent} from 'components/input-search/input-search.component';
import {IUserInfo} from 'models/user.model';
import {FollowListComponent} from 'components/follow-list/follow-list.component';
import {HeaderActionComponent} from 'components/header-action/header-action.component';

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

export const FollowsScreenComponent: FC<IProps & IHandlers> = ({
  search,
  setSearch,
  searchFollows,
  backPress,
  filterSearchFollows,
}) => {
  useEffect(() => {
    filterSearchFollows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftContainerStyle={styles.defContainer}
        centerContainerStyle={styles.defContainer}
        rightContainerStyle={styles.expandContainer}
        leftComponent={
          <MagicMove.View id="logo" transition={MagicMove.Transition.morph}>
            <HeaderActionComponent type="material-community" name="arrow-left" onPress={backPress} />
          </MagicMove.View>
        }
        rightComponent={<InputSearchComponent onChangeText={setSearch}>{search}</InputSearchComponent>}>
        Follows
      </HeaderComponent>
      <FollowListComponent list={searchFollows} />
    </MagicMove.Scene>
  );
};

export const FollowsScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
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
)(FollowsScreenComponent);
