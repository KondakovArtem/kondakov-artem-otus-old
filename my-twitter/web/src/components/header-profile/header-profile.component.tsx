import React, {FC} from 'react';
import {View} from 'react-native';
import {motion} from 'framer-motion';
import {Button} from 'antd';

import {headerBackground, thumbnailVariants} from 'constants/theme';
import {AvatarContainer} from 'containers/avatar/avatar.container';

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
    <motion.div {...thumbnailVariants} style={{height: 120, overflow: 'hidden'}}>
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
              type="ghost"
              icon={'edit'}
              shape="round"
              style={{color: 'white'}}
              // buttonStyle={{borderRadius: 40, borderColor: 'white', borderWidth: 2}}
              // titleStyle={{color: 'white'}}
              // background={TouchableNativeFeedback.Ripple('white', true)}
              onClick={onEditUserProfile}>
              {'Change Profile'}
            </Button>
          )}
          {mode === 'save' && (
            <Button
              type="ghost"
              icon={'edit'}
              shape="round"
              style={{color: 'white'}}
              // buttonStyle={{borderRadius: 40, borderColor: 'white', borderWidth: 2}}
              // titleStyle={{color: 'white'}}

              // background={TouchableNativeFeedback.Ripple('white', true)}
              onClick={onSaveUserProfile}>
              {'Save Profile'}
            </Button>
          )}
        </View>
      </View>
    </motion.div>
  );
};
