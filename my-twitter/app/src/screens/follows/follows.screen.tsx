import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as usersActions} from '@app/redux/users/users.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {statusBackground} from '@app/constants/theme';
import {InputSearchComponent} from '@app/components/input-search/input-search.component';
import {IUserInfo} from '@app/models/user.model';
import {FollowListComponent} from '@app/components/follow-list/follow-list.component';

interface IProps {
  search: string;
  searchFollows: IUserInfo[];
}
interface IHandlers {
  setSearch(value: string): void;
  backPress(): void;
}

const styles = StyleSheet.create({
  defContainer: {flex: 0},
  expandContainer: {flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'row'},

  headerIconContainer: {left: -8},
  headerIcon: {fontSize: 20},
});

export const FollowsScreenComponent: FC<IProps & IHandlers> = ({search, setSearch, searchFollows, backPress}) => {
  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftContainerStyle={styles.defContainer}
        centerContainerStyle={styles.defContainer}
        rightContainerStyle={styles.expandContainer}
        leftComponent={
          <MagicMove.View id="test" transition={MagicMove.Transition.morph}>
            <Icon
              type="material-community"
              color={statusBackground}
              selectionColor={'white'}
              containerStyle={styles.headerIconContainer}
              iconStyle={styles.headerIcon}
              suppressHighlighting={true}
              name="arrow-left"
              size={16}
              reverse
              onPress={backPress}
            />
          </MagicMove.View>
        }
        rightComponent={<InputSearchComponent onChangeText={setSearch}>{search}</InputSearchComponent>}
      />

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
  },
)(FollowsScreenComponent);
