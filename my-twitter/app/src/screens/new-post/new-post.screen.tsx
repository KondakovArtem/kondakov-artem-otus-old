import React, {FC} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon, Image} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {isEmpty} from 'lodash-es';

import {IConfiguredStore} from '@app/redux/store';
import {InputComponent} from '@app/components/input/input.component';
import {HeaderComponent} from '@app/components/header/header.component';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';
import {statusBackground, COMMON_DURATION} from '@app/constants/theme';
import {Actions as postActions} from '@app/redux/post/post.ducks';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  imagePath: string;
  text: string;
}
interface IHandlers {
  onTakePhoto(): void;
  onRemovePhoto(): void;
  onPostMessage(): void;
  onChangePostText(value: string): void;
}

export const NewPostScreenComponent: FC<IProps & IHandlers> = ({
  imagePath,
  text,
  onTakePhoto,
  onRemovePhoto,
  onPostMessage,
  onChangePostText,
}) => {
  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftComponent={
          <MagicMove.View id="test" transition={MagicMove.Transition.morph}>
            <Icon
              type="material-community"
              color={statusBackground}
              selectionColor={'white'}
              containerStyle={{left: -8}}
              suppressHighlighting={true}
              name="close"
              size={16}
              iconStyle={{fontSize: 20}}
              reverse
              onPress={() => {}}
            />
          </MagicMove.View>
        }
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <Icon
              type="material-community"
              color={statusBackground}
              selectionColor={'white'}
              suppressHighlighting={true}
              name="image"
              size={16}
              iconStyle={{fontSize: 20}}
              reverse
              onPress={onTakePhoto}
            />
            <Icon
              type="material-community"
              color={statusBackground}
              selectionColor={'white'}
              suppressHighlighting={true}
              name="send"
              size={16}
              iconStyle={{fontSize: 20}}
              reverse
              onPress={onPostMessage}
            />
          </View>
        }
      />
      <ScrollView>
        <View style={{paddingTop: 10}}>
          <InputComponent
            leftComponent={<UserAvatar uid="logo" />}
            placeholder={'What happening?'}
            autoFocus={true}
            multiline={true}
            onChangeText={onChangePostText}>
            {text}
          </InputComponent>
          {!isEmpty(imagePath) && (
            <Animatable.View
              style={{paddingHorizontal: 10}}
              animation={'zoomIn'}
              useNativeDriver={true}
              duration={COMMON_DURATION}>
              <Image
                source={{uri: imagePath}}
                style={{width: '100%', aspectRatio: 1, borderRadius: 20}}
                borderRadius={20}
              />
              <Icon
                type="material-community"
                name="close"
                containerStyle={{position: 'absolute', right: 8}}
                reverse
                size={16}
                iconStyle={{fontSize: 20}}
                onPress={onRemovePhoto}
              />
            </Animatable.View>
          )}
        </View>
      </ScrollView>
    </MagicMove.Scene>
  );
};

export const NewPostScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({post}) => {
    const {newPost} = post;
    const {imagePath, text} = newPost;
    return {
      imagePath,
      text,
    };
  },
  {
    onTakePhoto: postActions.takePhoto,
    onRemovePhoto: postActions.removePhoto,
    onPostMessage: postActions.postMessage,
    onChangePostText: postActions.changePostText,
  },
)(NewPostScreenComponent);
