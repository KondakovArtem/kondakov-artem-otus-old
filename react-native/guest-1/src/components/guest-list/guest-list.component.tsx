import React, {FunctionComponent, useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {IGuest} from '../../model/guest.model';
import {GuestItemContainer} from '../../container/guest-list/guest-list-item.container';

export interface IProps {
  list: IGuest[];
}

export interface IHandlers {
  onInit: () => Function;
}

const NoRecordWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoRecordText = styled.Text`
  color: #f2f2f2;
  font-size: 30px;
`;

const keyExtractor = (item: IGuest) => item.uid;
const renderItem = ({item}: {item: IGuest}) => <GuestItemContainer>{item}</GuestItemContainer>;

export const GuestListComponent: FunctionComponent<IProps & IHandlers> = props => {
  const {list, onInit} = props;

  useEffect(() => {
    const unsubscribe = onInit && onInit();
    return () => unsubscribe();
  }, [onInit]);

  return (
    <FlatList
      data={list}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      ListEmptyComponent={
        <NoRecordWrapper>
          <NoRecordText>No records</NoRecordText>
        </NoRecordWrapper>
      }
    />
  );
};
