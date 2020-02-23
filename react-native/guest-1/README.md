# About

react-native-guests-5

# Description

Цель:  
- Создать UI тесты, покрывающие (=воспроизводящие) всю функциональность приложения. (т.е. добавление гостя, добавление/убирание партнёра. открытие своего профиля, профиля гостя с вводом заметки и т.д.) 
- Публикация: - создание подписанного release приложения для андройда (.apk), в качестве проверки - запустить этот файл на реальном устройстве, с выключенным режимом разработчика. 
- если есть аккаунт iOS разработчика - создание AdHoc подписанного приложения (.ipa), запускающегося на вашем устройстве

# How to

Created by command

    npx react-native init MyApp --template react-native-template-typescript

Firebase authorization info
    login/password

    akondakov@diasoft.ru/12qwaszx
    kondakov.artem@gmail.com/123456

# Notes

Теcтировалось на Android

На IOS - нет

npm run test_e2e

Сделаны тесты на добавление, удаление, редактирование гостя, авторизацию в приложении через Appium
