import React, {FC} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon, Image} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {isEmpty} from 'lodash-es';

import {IConfiguredStore} from 'store';
import {InputComponent} from 'components/input/input.component';
import {HeaderComponent} from 'components/header/header.component';
import {COMMON_DURATION, commonStyles} from 'constants/theme';
import {Actions as postActions} from 'store/post/post.actions';
import {UserAvatar} from 'containers/user-avatar/user-avatar.container';
import {HeaderActionComponent} from 'components/header-action/header-action.component';
import {navUtils} from 'services/navigation/navigation.service';

const styles = StyleSheet.create({
  buttonActionWrapper: {flexDirection: 'row'},
  scrollContent: {paddingTop: 10},
  image: {width: '100%', aspectRatio: 1, borderRadius: 20},
  removeImage: {position: 'absolute', right: 8},
  removeImageIcon: {fontSize: 20},
});

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
  const onClose = () => navUtils.back();

  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftComponent={<HeaderActionComponent name="close" onPress={onClose} />}
        rightComponent={
          <Animatable.View animation="fadeInDown" duration={COMMON_DURATION} style={styles.buttonActionWrapper}>
            <HeaderActionComponent name="image" onPress={onTakePhoto} />
            <HeaderActionComponent name="send" onPress={onPostMessage} />
          </Animatable.View>
        }
      />
      <ScrollView>
        <View style={styles.scrollContent}>
          <InputComponent
            leftComponent={<UserAvatar uid="logo" />}
            placeholder="What's going on?"
            autoFocus={true}
            multiline={true}
            onChangeText={onChangePostText}>
            {text}
          </InputComponent>
          {!isEmpty(imagePath) && (
            <Animatable.View
              style={commonStyles.screenContent}
              animation={'zoomIn'}
              useNativeDriver={true}
              duration={COMMON_DURATION}>
              <Image source={{uri: imagePath}} style={styles.image} borderRadius={20} />
              <Icon
                type="material-community"
                name="close"
                containerStyle={styles.removeImage}
                iconStyle={styles.removeImageIcon}
                reverse
                size={16}
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
