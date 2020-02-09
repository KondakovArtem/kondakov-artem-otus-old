import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {StyleSheet} from 'react-native';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {Icon} from 'react-native-elements';
import {statusBackground} from '@app/constants/theme';
import {navUtils} from '@app/services/navigation/navigation.service';
import {FOLLOW_SCREEN} from '@app/models/navigation.model';

interface IProps {}
interface IHandlers {
  signOut: () => void;
}

const styles = StyleSheet.create({
  defContainer: {flex: 0},
  expandContainer: {flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'row'},

  headerIconContainer: {left: -8},
  headerIcon: {fontSize: 20},
});

export const ExploreScreenComponent: FC<IProps & IHandlers> = props => {
  // const {signOut} = props;
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
              name="arrow-left"
              color={statusBackground}
              selectionColor={'white'}
              containerStyle={styles.headerIconContainer}
              iconStyle={styles.headerIcon}
              suppressHighlighting={true}
              size={16}
              reverse
            />
          </MagicMove.View>
        }
        rightComponent={
          <Icon
            type="material-community"
            name="account"
            color={statusBackground}
            selectionColor={'white'}
            containerStyle={styles.headerIconContainer}
            iconStyle={styles.headerIcon}
            suppressHighlighting={true}
            size={16}
            reverse
            onPress={() => navUtils.navigate(FOLLOW_SCREEN)}
          />
        }
      />
    </MagicMove.Scene>
  );
};

export const ExploreScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  () => {
    return {};
  },
  {
    signOut: authActions.signOut,
  },
)(ExploreScreenComponent);
