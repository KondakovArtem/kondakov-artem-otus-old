import React, {FC, useState} from 'react';
import {FlatList, StyleProp, ViewStyle, View, RefreshControl, StyleSheet} from 'react-native';
import {Divider, Text} from 'react-native-elements';

import {IPost} from 'models/post.model';
import {Post} from 'containers/post/post.container';

export interface IProps {
  list?: IPost[];
  style?: StyleProp<ViewStyle>;
  emptyText?: string;
  id: string;
}

const styles = StyleSheet.create({
  emptyContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  emptyText: {color: '#e0e0e0', fontSize: 40},
  contentContainer: {minHeight: '100%'},
});

export interface IHandlers {
  onSelectItem?(item: IPost): void;
}

const keyExtractor = ({id}: IPost) => id;
const renderItem = (item: IPost, listId: string) => {
  return (
    <Post key={item.id} listId={listId}>
      {item}
    </Post>
  );
};

const EmptyComponent: FC = ({children}) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{children}</Text>
  </View>
);

export const PostListComponent: FC<IProps & IHandlers> = ({list = [], id, emptyText}) => {
  const [refreshing, setRefresh] = useState(false);

  const renderItemWithHandlers = ({item}: {item: IPost}) => renderItem(item, id);

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefresh(true)} />}
      data={list}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={<EmptyComponent>{emptyText}</EmptyComponent>}
      renderItem={renderItemWithHandlers}
      initialNumToRender={10}
      ItemSeparatorComponent={Divider}
    />
  );
};
