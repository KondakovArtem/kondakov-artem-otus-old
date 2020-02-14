import React, {FC, useState} from 'react';
import {FlatList, StyleProp, ViewStyle, View, RefreshControl} from 'react-native';
import {Divider, Text} from 'react-native-elements';

import {IPost} from 'models/post.model';
import {Post} from 'containers/post/post.container';

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
  return <Post key={item.id}>{item}</Post>;
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
