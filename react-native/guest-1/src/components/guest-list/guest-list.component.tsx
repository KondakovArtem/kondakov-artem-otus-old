import React, {FunctionComponent, useEffect} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';

import {IGuest} from '../../model/guest.model';
import {GuestItemContainer} from '../../container/guest-list/guest-list-item.container';

export interface IProps {
  list: IGuest[];
}

export interface IHandlers {
  onInit: () => Function;
}

const styles = StyleSheet.create({
  noRecordWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    color: '#f2f2f2',
    fontSize: 30,
  },
});

const keyExtractor = (item: IGuest) => item.uid;
const renderItem = ({item}: {item: IGuest}) => <GuestItemContainer>{item}</GuestItemContainer>;

export const GuestListComponent: FunctionComponent<IProps & IHandlers> = props => {
  const {list, onInit} = props;

  useEffect(() => {
    const unsubscribe = onInit && onInit();
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      data={list}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      ListEmptyComponent={
        <View style={styles.noRecordWrapper}>
          <Text style={styles.noRecordText}>No records</Text>
        </View>
      }
    />
  );
};
