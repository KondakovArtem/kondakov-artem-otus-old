import React, {FC, useState} from 'react';
import {List, Button, Upload, message, Icon} from 'antd';
import {StyleSheet, View} from 'react-native';

import {UserAvatar} from 'containers/user-avatar/user-avatar.container';
import {InputComponent} from 'components/input/input.component';
import {isEmpty} from 'lodash-es';

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'flex-start'},
  title: {padding: 0, margin: 0},
  titleView: {flexDirection: 'row', display: 'flex'},
  titleText: {flexGrow: 1, flexShrink: 1},
  name: {fontSize: 15, fontWeight: 'bold'},
  email: {color: 'grey'},
  imageView: {borderRadius: 10, marginTop: 6, display: 'flex', overflow: 'hidden'},
  image: {width: '100%', borderRadius: 10},
  avatarContainer: {marginHorizontal: 6},
  contentContainer: {marginHorizontal: 6, flex: 1},
  listContainer: {width: '100%', flexDirection: 'row'},
  actionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
  },
  comment: {flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'},
  retweet: {flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'},
  buttonContainer: {paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-end'},
});

export interface IProps {
  image: string;
  text: string;
  isFetching: boolean;
}
export interface IHandlers {
  onTakePhoto(image: string): void;
  onRemovePhoto(): void;
  onPostMessage(): void;
  onChangePostText(value: string): void;
}

async function getBase64(img: Blob): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
}

export const NewPostComponent: FC<IProps & IHandlers> = ({
  text,
  image,
  isFetching,
  onTakePhoto,
  onRemovePhoto,
  onPostMessage,
  onChangePostText,
}) => {
  // const [image, setImage] = useState();

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }

    getBase64(file).then((base64: string) => {
      onTakePhoto(base64);
    });
    return false;
  };

  return (
    <List.Item>
      <View style={styles.listContainer}>
        <View style={styles.avatarContainer}>
          <UserAvatar size={50} />
        </View>
        <View style={styles.contentContainer}>
          <InputComponent
            disabled={isFetching}
            multiline={true}
            placeholder={'What happening?'}
            numberOfLines={3}
            onChangeText={onChangePostText}>
            {text}
          </InputComponent>
          {!isEmpty(image) && (
            <View style={styles.imageView}>
              <img
                src={image}
                style={{
                  width: '100%',
                  maxHeight: '270px',
                  objectFit: 'cover',
                }}
              />
              {!isFetching && (
                <Icon
                  type="close"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px',
                    padding: '7px',
                    background: 'black',
                    borderRadius: '50%',
                    color: 'white',
                  }}
                  onClick={onRemovePhoto}
                />
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <Upload disabled={isFetching} showUploadList={false} beforeUpload={beforeUpload}>
              <Button disabled={isFetching} shape="circle" icon="picture" />
            </Upload>
            <Button
              disabled={isEmpty(text) && isEmpty(image)}
              loading={isFetching}
              style={{marginLeft: 10}}
              type="primary"
              icon="message"
              shape="round"
              onClick={onPostMessage}>
              Post
            </Button>
          </View>
        </View>
      </View>
    </List.Item>
  );
};
