import React, {FC} from 'react';
import * as Animatable from 'react-native-animatable';
import {ListItem, Icon} from 'react-native-elements';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {isEmpty} from 'lodash-es';

import {IPost} from '@app/models/post.model';
import {AvatarContainer} from '@app/containers/avatar/avatar.container';
import {getDateAgo} from '@app/services/core/core.service';
import {LikePost} from '@app/containers/like/like.container';
import {IUserInfo} from '@app/models/user.model';

export interface IProps {
  children: IPost;
  authorData: IUserInfo;
}

export interface IHandlers {}

export const PostComponent: FC<IProps & IHandlers> = ({children, authorData}) => {
  const {text, createdAt, image, author} = children as IPost;
  const {email, name} = authorData;
  return (
    <ListItem
      containerStyle={{padding: 10, alignItems: 'flex-start'}}
      titleStyle={{padding: 0, margin: 0}}
      leftAvatar={<AvatarContainer>{author}</AvatarContainer>}
      title={
        <>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={{flexGrow: 1, flexShrink: 1}}>
              {!isEmpty(name) && <Text style={{fontSize: 15, fontWeight: 'bold'}}>{name} </Text>}
              {!isEmpty(email) && <Text style={{color: 'grey'}}>{email}</Text>}
            </Text>
            <Text numberOfLines={1}> {getDateAgo(createdAt)}</Text>
          </View>
          <View>
            {!isEmpty(text) && <Text>{text}</Text>}
            {!isEmpty(image) && (
              <Animatable.View animation={'fadeIn'} useNativeDriver={true} style={{borderRadius: 10, paddingTop: 6}}>
                <FastImage
                  style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
                  source={{
                    uri: image,
                    priority: FastImage.priority.normal,
                  }}
                />
              </Animatable.View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: 40,
            }}>
            <View style={{flex: 1, top: -2}}>
              <Icon type="font-awesome" color="grey" size={18} name="comment-o"></Icon>
            </View>
            <View style={{flex: 1}}>
              <Icon type="material-community" color="grey" name="twitter-retweet"></Icon>
            </View>
            <LikePost>{children}</LikePost>
          </View>
        </>
      }
      bottomDivider
    />
  );
};
