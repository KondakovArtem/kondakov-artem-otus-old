import React, {FC} from 'react';
import {View, TouchableNativeFeedback} from 'react-native';
import {Button} from 'react-native-elements';
import * as MagicMove from 'react-native-magic-move';

import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';
import {headerBackground, COMMON_DURATION} from '@app/constants/theme';

export interface IProps {
  mode?: string;
}

export interface IHandlers {
  takeAvatar(): void;
  onEditUserProfile?(): void;
  onSaveUserProfile?(): void;
}

export const HeaderProfileComponent: FC<IHandlers & IProps> = ({
  takeAvatar,
  onEditUserProfile,
  mode = 'edit',
  onSaveUserProfile,
}) => {
  return (
    <MagicMove.View
      id={'header'}
      transition={MagicMove.Transition.morph}
      duration={COMMON_DURATION}
      style={{height: 120, overflow: 'hidden'}}>
      <View style={{height: 60, backgroundColor: headerBackground}}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{position: 'relative', top: -50, left: 20}}>
          <UserAvatar
            uid="logo"
            size={90}
            containerStyle={{borderWidth: 4, borderColor: 'white'}}
            showEditButton={true}
            onPress={takeAvatar}
          />
        </View>
        <View style={{position: 'relative', top: -53, right: 20, zIndex: 1}}>
          {mode === 'edit' && (
            <Button
              type="outline"
              icon={{type: 'material-community', name: 'pencil-outline', color: 'white'}}
              containerStyle={{zIndex: 1}}
              buttonStyle={{borderRadius: 40, borderColor: 'white', borderWidth: 2}}
              titleStyle={{color: 'white'}}
              title="Change Profile"
              background={TouchableNativeFeedback.Ripple('white', true)}
              onPress={onEditUserProfile}></Button>
          )}
          {mode === 'save' && (
            <Button
              type="outline"
              icon={{type: 'material-community', name: 'pencil-outline', color: 'white'}}
              containerStyle={{zIndex: 1}}
              buttonStyle={{borderRadius: 40, borderColor: 'white', borderWidth: 2}}
              titleStyle={{color: 'white'}}
              title="Save Profile"
              background={TouchableNativeFeedback.Ripple('white', true)}
              onPress={onSaveUserProfile}></Button>
          )}
        </View>
      </View>
    </MagicMove.View>
  );
};
