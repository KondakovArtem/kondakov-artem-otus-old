import React, { useState } from "react";
import { ListItem, CheckBox } from "react-native-elements";
import { Text, TouchableOpacity, TextInput } from 'react-native';
import styled from "styled-components/native";

import { IGuest } from "../../model/guest";



export interface IProps {
    children: IGuest;
    editGuest?: IGuest;
}

export interface IHandlers {
    onDeleteGuest: (guest: IGuest) => void;
    onToggleCouple: (guest: IGuest) => void;
    setEditableGuest: (guest?: IGuest) => void;
    updateGuestName: (uid: string, text: string) => void;
}


const EditNameTextInput = styled.TextInput`
    padding: 0;
    margin: 0;
    font-size: 18px;
    height: 24px;
`
const NameText = styled.Text`
    font-size: 18px;
    height: 24px;
`


export const GuestItem: React.FunctionComponent<IProps & IHandlers> = (props) => {
    const {children: guest, editGuest, onDeleteGuest, onToggleCouple, setEditableGuest, updateGuestName } =  props;
    const {uid, name, withPartner} = guest;
    return (
        <ListItem
            title={
                <>
                    {editGuest && (editGuest.uid === uid) ?
                        (<EditNameTextInput
                            placeholder="Введите новое имя"
                            defaultValue={name}
                            onEndEditing={(e) => updateGuestName(guest.uid, e.nativeEvent.text)}
                            onSubmitEditing={(e) => updateGuestName(guest.uid, e.nativeEvent.text)}
                            ref={(ref) => {
                                ref?.focus(); 
                            }}
                        />) :
                        (<NameText
                            onLongPress={() => setEditableGuest(guest)}
                        >{name}</NameText>)
                    }
                </>
                    
            }
            containerStyle={{
                margin: 0,
                paddingTop: 3,
                paddingBottom: 0
            }}
            subtitle={
                <CheckBox
                    title='С парой'
                    checked={withPartner}
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