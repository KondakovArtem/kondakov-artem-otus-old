import React from 'react';
import { Input, Header } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';

export interface IProps {
    inputValue: string;
    guestTotal: number;
}

export interface IHandlers {
    setInputValue: (value: string) => void;
    onAddGuest: (value: string) => void;
}

export const HeaderComponent: React.FunctionComponent<IProps & IHandlers> = (props: IProps & IHandlers) => {
    const { setInputValue, inputValue, onAddGuest, guestTotal = 0} = props;
    
    return (
        <>
            <Header
                placement="left"
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Список гостей', style: { color: '#fff' } }}
                rightComponent={{ text: `Всего ${guestTotal}`, style: { color: '#fff' } }}
            />
            <View>
                
                <Input
                    value={inputValue}
                    onChangeText={setInputValue}
                    onSubmitEditing={(e) => {onAddGuest(e.nativeEvent.text)}}
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
        </>
    );
}