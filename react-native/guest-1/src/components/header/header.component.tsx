import React from 'react';
import { Input, Header, ButtonGroup } from 'react-native-elements';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';


export interface IProps {
    inputValue: string;
    guestTotal: number;
    guestFilter: number;
}

export interface IHandlers {
    setInputValue: (value: string) => void;
    onAddGuest: (value: string) => void;
    updateGuestFilter: (idx: number) => void
}


export const HeaderComponent: React.FunctionComponent<IProps & IHandlers> = (props: IProps & IHandlers) => {
    const {
        setInputValue,
        inputValue,
        onAddGuest,
        updateGuestFilter,
        guestFilter = 0,
        guestTotal = 0
    } = props;

    const buttons = [`Все`,`С парой`,`Без пары`]

    return (
        <>
            <Header
                placement="left"
                containerStyle={{
                    paddingTop: 0,
                    height: 40
                }}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Список гостей', style: { color: '#fff' } }}
                rightComponent={{ text: `Всего ${guestTotal}`, style: { color: '#fff' } }}
            />
            <View>
                <Input
                    value={inputValue}
                    onChangeText={setInputValue}
                    onSubmitEditing={(e) => { onAddGuest(e.nativeEvent.text) }}
                    placeholder="Новый гость"
                    containerStyle={{ marginBottom: 5 }}
                    rightIcon={{
                        Component: TouchableOpacity,
                        onPress: () => { onAddGuest(inputValue) },
                        name: 'person-add',
                        type: 'Ionicons',
                        color: '#517fa4'
                    }} />
            </View>
            <View>
                <ButtonGroup
                    selectedIndex={guestFilter}
                    selectedTextStyle = {{
                        color: 'white'
                    }}
                    onPress={(idx: number) => updateGuestFilter(idx)}
                    buttons={buttons}
                />
            </View>
            
        </>
    );
}