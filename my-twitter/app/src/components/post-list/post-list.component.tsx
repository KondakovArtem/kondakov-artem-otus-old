import React, {FC, useState} from 'react';
import {FlatList, StyleProp, ViewStyle, View, RefreshControl} from 'react-native';
import {ListItem, Divider, Text, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {isEmpty} from 'lodash-es';

import {IPost} from '@app/models/post.model';
import {AvatarComponent} from '@app/components/avatar/avatar.component';
import {getDateAgo} from '@app/services/core/core.service';
import {LikePost} from '@app/containers/like/like.container';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';

export interface IProps {
  list?: IPost[];
  style?: StyleProp<ViewStyle>;
}

export interface IHandlers {
  onSelectItem?(item: IPost): void;
}

const keyExtractor = ({id}: IPost) => id;
const renderItem = (item: IPost, {onSelectItem}: IHandlers) => {
  const {text, createdAt, image, author} = item as IPost;
  return (
    <ListItem
      containerStyle={{padding: 10, alignItems: 'flex-start'}}
      titleStyle={{padding: 0, margin: 0}}
      leftAvatar={<UserAvatar>{author}</UserAvatar>}
      title={
        <>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={{flexGrow: 1, flexShrink: 1}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Artem Kondakov</Text>
              <Text style={{color: 'grey'}}> @kondakov.artem@yandex.ru wgferg werg wer gwerg wrg</Text>
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
            <LikePost>{item}</LikePost>
          </View>
        </>
      }
      bottomDivider
    />
  );
};

export const PostListComponent: FC<IProps & IHandlers> = props => {
  const {list = [], onSelectItem} = props;
  const [refreshing, setRefresh] = useState(false);

  const renderItemWithHandlers = ({item}: {item: IPost}) => renderItem(item, {onSelectItem});

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefresh(true)} />}
      data={list}
      keyExtractor={keyExtractor}
      renderItem={renderItemWithHandlers}
      initialNumToRender={10}
      ItemSeparatorComponent={Divider}
    />
  );
};
