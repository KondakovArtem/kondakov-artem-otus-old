# About

react-native-guests-2

# Description

Цель: 

Подключить Redux к Списку приглашённых, хранить список на сервере
Цель: 

1. Подключить Redux к списку гостей (хранить в сторе сам список гостей, а так же ключи фильтрации) 
2. Синхронизировать список гостей с облачным хранилищем, используя ключи данного проекта, и путь /intites c двумя полями: - name (string) - withPartner (bool) Для сдачи достаточно отображать и добавлять гостей в список на сервере. На максимальный бал - добавить функционал изменения имени и значения withPartner 

Опционально: 
1. Настроить собственные проект firebase и настроить в нём хранилище 
2. Добавить Authorisation - два поля сверху экрана email/password. И отображать списки отдельно для каждого пользователя.


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
