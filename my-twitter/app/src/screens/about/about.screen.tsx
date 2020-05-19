import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text, Card} from 'react-native-elements';
import * as MagicMove from 'react-native-magic-move';
import * as Animatable from 'react-native-animatable';
import {StyleSheet} from 'react-native';

import {IConfiguredStore} from 'store';
import Actions from 'store/auth/auth.actions';
import {HeaderComponent} from 'components/header/header.component';
import {COMMON_DURATION} from 'constants/theme';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  isFetching: boolean;
}
interface IHandlers {
  onCancel(): void;
  onSendVerification(): void;
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  card: {
    elevation: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export const AboutScreenComponent: FC<IProps & IHandlers> = () => {
  return (
    <MagicMove.Scene>
      <HeaderComponent>About</HeaderComponent>
      <Animatable.View style={styles.cardContainer} animation={'fadeInDown'} useNativeDriver duration={COMMON_DURATION}>
        <ScrollView>
          <Card title="About" containerStyle={styles.card}>
            <Text style={styles.bold}>react-native + reactjs mytwitter</Text>
            <Text style={styles.bold}># Description</Text>
            <Text style={styles.bold}>Цель: </Text>
            <Text>
              Разработка веб-приложения, похожего на twitter на ReactJS и Redux. Затем перенос на мобильные устройства с
              использованием React Native и Redux.
            </Text>
            <Text />
            <Text style={styles.bold}>Общие требования</Text>
            <Text>Хранение всей информации на firebase, вместе с авторизацией. </Text>
            <Text />
            <Text style={styles.bold}>Авторизация</Text>
            <Text>
              Необходимо имитировать многопользовательскую сущность твиттера. Пользователь приложения должен иметь
              возможность:
            </Text>
            <Text>- Регистрироваться, с указанием email, пароль</Text>
            <Text>- Входить в приложение под любой из пар: email/пароль.</Text>
            <Text>
              - После осуществления входа, сессия текущего пользователя должна сохраняться между запусками приложения.
              Т.е. Если пользователь вошёл под логином “otus”, на следующий день ему не нужно заного вводить пароль.
            </Text>
            <Text>- Текущая сессия сохраняется пока пользователь не воспользуется функцией “Выйти”</Text>
            <Text>
              - “Выйти” - должна быть добавлена на экран информации о текущем пользователе. Тем самым завершая сессию
              текущего пользователя.{' '}
            </Text>
            <Text />
            <Text style={styles.bold}>Главный экран</Text>
            <Text>После входа, должен появиться экран с TabBar навигационным паттерном</Text>
            <Text />
            <Text style={styles.bold}>Home</Text>
            <Text> - экран с постами текущего пользователя. Каждый пост имеет следующие элементы:</Text>
            <Text>- Логин - сколько времени прошло от публикации поста</Text>
            <Text>- Текст (при наличии)</Text>
            <Text>- Картинка (при наличии)</Text>
            <Text>- Количество лайков (реализовано как кнопка - при нажатии можно добавлять/убирать лайк)</Text>
            <Text>- Аватар пользователя (при нажатии открывается профиль пользователя)</Text>
            <Text />
            <Text style={styles.bold}>Explore</Text>
            <Text>
              - экран с постами всех пользователей, кого фолловит текущий. Если список пуст, выводить список
              существующих пользователей (аватар + логин)
            </Text>
            <Text />
            <Text style={styles.bold}>Profile</Text>
            <Text>
              - экран где пользователь может изменить информацию о себе (аватар, логин, пароль, email, описание). Кнопка
              “Выйти” - для возврата на экран авторизации.{' '}
            </Text>
            <Text />
            <Text />
            <Text style={styles.bold}>Функциональные требования:</Text>
            <Text>
              - При долгом нажатии на свой пост - появляется Alert предалагающий его удалить. (Плюсом - анимация
              удаления поста)
            </Text>
            <Text>
              - При нажатии на логин или аватар - переход на экран Профиля. Если пользователь открыл свой профиль - с
              возможностью его редактирования.{' '}
            </Text>
            <Text>
              - В мобильной версии на всех экранах должна быть кнопка добавления поста (“Летающая кнопка” в нижней
              правой части экрана).
            </Text>
            <Text>
              - Экран/блок ввода нового поста должен включать всеба окно ввода текста и возможность добавления
              фотографии из галлереи или камеры телефона{' '}
            </Text>
          </Card>
        </ScrollView>
      </Animatable.View>
    </MagicMove.Scene>
  );
};

export const AboutScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {login} = authData;
    const {isFetching} = login;
    return {
      isFetching,
    };
  },
  {
    onCancel: Actions.signOut,
    onSendVerification: Actions.sendUserVerificationEmail,
  },
)(AboutScreenComponent);
