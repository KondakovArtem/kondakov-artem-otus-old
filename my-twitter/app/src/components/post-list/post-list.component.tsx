import React, {FC, useState} from 'react';
import {FlatList, StyleProp, ViewStyle, View, RefreshControl} from 'react-native';
import {ListItem, Divider, Text, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {isEmpty} from 'lodash-es';

import {IPost} from '@app/models/post.model';
import {getDateAgo} from '@app/services/core/core.service';
import {LikePost} from '@app/containers/like/like.container';
import {AvatarContainer} from '@app/containers/avatar/avatar.container';
import {Post} from '@app/containers/post/post.container';

export interface IProps {
  list?: IPost[];
  style?: StyleProp<ViewStyle>;
  emptyText?: string;
}

export interface IHandlers {
  onSelectItem?(item: IPost): void;
}

const keyExtractor = ({id}: IPost) => id;
const renderItem = (item: IPost, {onSelectItem}: IHandlers) => {
  return (
    <Post>{item}</Post>

    // <ListItem
    //   containerStyle={{padding: 10, alignItems: 'flex-start'}}
    //   titleStyle={{padding: 0, margin: 0}}
    //   leftAvatar={<AvatarContainer>{author}</AvatarContainer>}
    //   title={
    //     <>
    //       <View style={{flexDirection: 'row'}}>
    //         <Text numberOfLines={1} style={{flexGrow: 1, flexShrink: 1}}>
    //           <Text style={{fontSize: 15, fontWeight: 'bold'}}>Artem Kondakov</Text>
    //           <Text style={{color: 'grey'}}> @kondakov.artem@yandex.ru wgferg werg wer gwerg wrg</Text>
    //         </Text>
    //         <Text numberOfLines={1}> {getDateAgo(createdAt)}</Text>
    //       </View>
    //       <View>
    //         {!isEmpty(text) && <Text>{text}</Text>}
    //         {!isEmpty(image) && (
    //           <Animatable.View animation={'fadeIn'} useNativeDriver={true} style={{borderRadius: 10, paddingTop: 6}}>
    //             <FastImage
    //               style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
    //               source={{
    //                 uri: image,
    //                 priority: FastImage.priority.normal,
    //               }}
    //             />
    //           </Animatable.View>
    //         )}
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           justifyContent: 'space-around',
    //           height: 40,
    //         }}>
    //         <View style={{flex: 1, top: -2}}>
    //           <Icon type="font-awesome" color="grey" size={18} name="comment-o"></Icon>
    //         </View>
    //         <View style={{flex: 1}}>
    //           <Icon type="material-community" color="grey" name="twitter-retweet"></Icon>
    //         </View>
    //         <LikePost>{item}</LikePost>
    //       </View>
    //     </>
    //   }
    //   bottomDivider
    // />
  );
};

const EmptyComponent: FC = ({children}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text style={{color: '#e0e0e0', fontSize: 40}}>{children}</Text>
  </View>
);

export const PostListComponent: FC<IProps & IHandlers> = ({list = [], onSelectItem, emptyText}) => {
  const [refreshing, setRefresh] = useState(false);

  const renderItemWithHandlers = ({item}: {item: IPost}) => renderItem(item, {onSelectItem});

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefresh(true)} />}
      data={list}
      keyExtractor={keyExtractor}
      contentContainerStyle={{minHeight: '100%'}}
      ListEmptyComponent={<EmptyComponent>{emptyText}</EmptyComponent>}
      renderItem={renderItemWithHandlers}
      initialNumToRender={10}
      ItemSeparatorComponent={Divider}
    />
  );
};
