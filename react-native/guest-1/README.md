# About

react-native-guests-3

# Description

Цель: 

Анимированное удаление приглашённых, добавление экрана “Подробнее” с использованием stackNavigation

Цель: 

1. Анимация удаления - любая. Но важно чтобы после удаление не оставалось пустого места на месте удалённого гостя 
2. Экран подробнее содержит поле, где можно ввести (и сохранить) заметку о госте. (В NavigationBar - указывается имя гостя) 
3. Сохранять текущее состояние в AsyncStorage. Так что после закрыть-открыть приложения - информация введённая ранее так же отображается и без соединения с интернетом. 

Опционально: 
1. Если авторизация была сделана в прошлом задании - то вынести её на отдельный экран. 
Если нет Очень сложно, но выглядит очень красиво и такое любят делать в реальной практике: 
2. При выборе гостя, во время анимации перехода с главного экрана на экран подробнее - имя гостя анимируется и "переходит" в заголовок нового экрана подсказка: можно использовать либо https://github.com/IjzerenHein/react-native-magic-move#react-navigation, или https://wix.github.io/react-native-navigation/#/docs/animations?id=shared-element


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
