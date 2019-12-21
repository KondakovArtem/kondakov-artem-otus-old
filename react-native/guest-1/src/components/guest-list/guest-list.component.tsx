import React, {FunctionComponent} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {IGuest} from '../../model/guest';
import {GuestItemContainer} from '../../container/guest-list/guest-list-item.container';

export interface IProps {
  list: IGuest[];
}

const NorRecordWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoRecordText = styled.Text`
  color: #f2f2f2;
  font-size: 30px;
`;

const keyExtractor = (item: IGuest) => item.uid;
const renderItem = ({item}: {item: IGuest}) => (
  <GuestItemContainer>{item}</GuestItemContainer>
);

export const GuestListComponent: FunctionComponent<IProps> = props => {
  const {list} = props;
  return list.length ? (
    <FlatList data={list} keyExtractor={keyExtractor} renderItem={renderItem} />
  ) : (
    <NorRecordWrapper>
      <NoRecordText>Нет записей</NoRecordText>
    </NorRecordWrapper>
  );
};
