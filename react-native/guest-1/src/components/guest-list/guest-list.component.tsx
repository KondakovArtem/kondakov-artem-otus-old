import React from "react";
import { FlatList, View, Text } from 'react-native';
import styled from "styled-components/native";

import { IGuest } from "../../model/guest";
import { GuestItemContainer } from "../../container/guest-list/guest-list-item.container";

export interface IProps {
  list: IGuest[];
}

const NorRecordWrapper = styled.View`
  flex: 1;
  justify-content:center;
  align-items:center;
`;

const NoRecordText = styled.Text`
  color: #f2f2f2;
  font-size: 30px;
`

export const GuestListComponent: React.FunctionComponent<IProps> = (props: IProps) => {
  const { list } = props;

  return (

    list.length ?
      (<FlatList
        data={list}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => <GuestItemContainer>{item}</GuestItemContainer>}
      />) : 
      (<NorRecordWrapper>
        <NoRecordText>Нет записей</NoRecordText>
      </NorRecordWrapper>)
  );
}