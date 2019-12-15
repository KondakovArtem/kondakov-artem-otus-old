import React from "react";
import styled from 'styled-components/native';

import { FlatList, View, Text, TouchableOpacity, Switch } from 'react-native';
import { ListItem, CheckBox } from "react-native-elements";
import { IGuest } from "src/model/guest";


interface IItemProps {
  children: IGuest
}

const Item: React.FunctionComponent<IItemProps & IHandlers> = (props) => {
  const { children: {name, withCouple}, onDeleteGuest, onToggleCouple} = props;
  return (
    <ListItem
      title={name}
      containerStyle = {{
        margin: 0,
        paddingTop: 3,
        paddingBottom: 0
      }}
      // leftAvatar={{ source: { uri: 'https://picsum.photos/200' } }}
      subtitle={
        <CheckBox
          title='С парой'
          checked={withCouple}
          onPress={() => onToggleCouple(props.children)}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingLeft: 5,
            paddingTop: 3,
            paddingBottom: 3,
            marginLeft: -5,
            marginBottom: 0,
          }}
        />
      }
      rightIcon={{
        Component: TouchableOpacity,
        onPress: () => { onDeleteGuest(props.children) },
        name: 'close',
        type: 'Ionicons',
        color: '#000'
      }}
      topDivider={true}
      bottomDivider={true}
    ></ListItem>
  )
}


export interface IHandlers {
  onDeleteGuest: (guest: IGuest) => void;
  onToggleCouple: (guest: IGuest) => void;
}

export interface IProps {
  list: IGuest[];
}

export const GuestListComponent: React.FunctionComponent<IProps & IHandlers> = (props: IProps & IHandlers) => {
  const { list, onDeleteGuest, onToggleCouple } = props;
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <Item onDeleteGuest={onDeleteGuest} onToggleCouple={onToggleCouple}>{item}</Item>}
      keyExtractor={item => item.uid}
    />
  );
}