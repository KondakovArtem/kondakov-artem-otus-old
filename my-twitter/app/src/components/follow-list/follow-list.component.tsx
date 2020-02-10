import React, {FC} from 'react';
import {FlatList, StyleProp, ViewStyle, View, StyleSheet} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {Text} from 'react-native';
import {isEmpty} from 'lodash-es';

import {IUserInfo} from '@app/models/user.model';
import {FollowButton} from '@app/containers/follow-button/follow-button.container';
import {AvatarContainer} from '@app/containers/avatar/avatar.container';

export interface IProps {
  list?: IUserInfo[];
  style?: StyleProp<ViewStyle>;
}

export interface IHandlers {}

const styles = StyleSheet.create({
  itemContainer: {padding: 10, alignItems: 'flex-start'},
  title: {padding: 0, margin: 0},
  name: {fontSize: 18, fontWeight: 'bold'},
  email: {color: 'grey'},
});

const keyExtractor = ({id}: IUserInfo) => id;
const renderItem = (item: IUserInfo) => {
  const {name, email, about, id} = item;
  return (
    <ListItem
      containerStyle={styles.itemContainer}
      titleStyle={styles.title}
      leftAvatar={<AvatarContainer>{id}</AvatarContainer>}
      title={
        <>
          <View>
            {!isEmpty(name) && (
              <Text style={styles.name} numberOfLines={1}>
                {name}
              </Text>
            )}
            {!isEmpty(email) && (
              <Text style={styles.email} numberOfLines={1}>
                {email}
              </Text>
            )}
            {!isEmpty(about) && <Text numberOfLines={2}>{about}</Text>}
          </View>
        </>
      }
      rightElement={<FollowButton>{id}</FollowButton>}
      bottomDivider
    />
  );
};

export const FollowListComponent: FC<IProps & IHandlers> = props => {
  const {list = []} = props;

  const renderItemWithHandlers = ({item}: {item: IUserInfo}) => renderItem(item);

  return (
    <FlatList
      data={list}
      keyExtractor={keyExtractor}
      renderItem={renderItemWithHandlers}
      initialNumToRender={10}
      ItemSeparatorComponent={Divider}
    />
  );
};
