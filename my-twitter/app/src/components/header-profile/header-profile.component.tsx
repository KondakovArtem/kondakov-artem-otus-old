import React, {FC} from 'react';
import {View, TouchableNativeFeedback} from 'react-native';
import {Button} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {headerBackground, COMMON_DURATION} from '@app/constants/theme';
import {AvatarContainer} from '@app/containers/avatar/avatar.container';

export interface IProps {
  mode?: string;
  userUid: string;
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
  userUid,
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
          <AvatarContainer
            uid="logo"
            size={90}
            containerStyle={{borderWidth: 4, borderColor: 'white'}}
            showEditButton={true}
            onPress={takeAvatar}>
            {userUid}
          </AvatarContainer>
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
