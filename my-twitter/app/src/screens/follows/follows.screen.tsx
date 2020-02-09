import React, {FC, useState} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import * as Animatable from 'react-native-animatable';
import {Icon, Input} from 'react-native-elements';
import {View, ScrollView, Text} from 'react-native';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {statusBackground, COMMON_DURATION, inputStyleProps, headerBackground} from '@app/constants/theme';

interface IProps {}
interface IHandlers {
  signOut: () => void;
}

export const FollowsScreenComponent: FC<IProps & IHandlers> = props => {
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftContainerStyle={{flex: 0}}
        centerContainerStyle={{flex: 0}}
        rightContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'row'}}
        leftComponent={
          <MagicMove.View id="test" transition={MagicMove.Transition.morph}>
            <Icon
              type="material-community"
              color={statusBackground}
              selectionColor={'white'}
              containerStyle={{left: -8}}
              suppressHighlighting={true}
              name="arrow-left"
              size={16}
              iconStyle={{fontSize: 20}}
              reverse
              onPress={() => {}}
            />
          </MagicMove.View>
        }
        rightComponent={
          <>
            {searchExpanded && (
              <Animatable.View style={{width: '100%', flexGrow: 1}} animation={'fadeInRight'}>
                <Input
                autoFocus={true}
                  containerStyle={{backgroundColor: statusBackground, borderRadius: 20, height: 34}}
                  inputContainerStyle={{height: 34, borderBottomWidth: 0}}
                  leftIconContainerStyle={inputStyleProps.leftIconContainerStyle}
                  onBlur={() => setSearchExpanded(false)}
                  leftIcon={{type: 'material-community', name: 'magnify', color: 'white'}}></Input>
              </Animatable.View>
            )}
            {!searchExpanded && (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="material-community"
                  color={statusBackground}
                  selectionColor={'white'}
                  containerStyle={{right: -8}}
                  suppressHighlighting={true}
                  name="magnify"
                  size={16}
                  iconStyle={{fontSize: 20}}
                  reverse
                  onPress={() => setSearchExpanded(true)}
                />
              </View>
            )}
          </>
        }
      />

      <ScrollView />
    </MagicMove.Scene>
  );
};

export const FollowsScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  () => {
    return {};
  },
  {
    signOut: authActions.signOut,
  },
)(FollowsScreenComponent);
