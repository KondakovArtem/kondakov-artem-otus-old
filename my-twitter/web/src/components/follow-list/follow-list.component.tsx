import React, {FC} from 'react';
import {StyleProp, ViewStyle, View, StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {isEmpty} from 'lodash-es';
import {List, Icon} from 'antd';

import {IUserInfo} from 'models/user.model';
// import {FollowButton} from 'containers/follow-button/follow-button.container';
import {AvatarContainer} from 'containers/avatar/avatar.container';
import {FollowButton} from 'containers/follow-button/follow-button.container';

export interface IProps {
  list?: IUserInfo[];
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  itemContainer: {padding: 10, alignItems: 'flex-start', flexDirection: 'row'},
  title: {padding: 0, margin: 0},
  name: {fontSize: 18, fontWeight: 'bold'},
  email: {color: 'grey'},
  dataContainer: {paddingLeft: 10},
});

const keyExtractor = ({id}: IUserInfo) => id;
const renderItem = (item: IUserInfo) => {
  const {name, email, about, id} = item;
  return (
    <List.Item key={id}>
      <View style={styles.itemContainer}>
        <View>
          <AvatarContainer size={50}>{id}</AvatarContainer>
        </View>
        <View style={styles.dataContainer}>
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
      </View>
      <View>
        <FollowButton>{id}</FollowButton>
      </View>
    </List.Item>
  );
};

export const FollowListComponent: FC<IProps> = props => {
  const {list = []} = props;

  const renderItemWithHandlers = ({item}: {item: IUserInfo}) => renderItem(item);

  return <>{list.map(item => renderItemWithHandlers({item}))}</>;
};
