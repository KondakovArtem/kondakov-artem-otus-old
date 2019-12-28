import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {MainScreen} from '../screens/main/main.screen';
import {LoadingScreen} from '../screens/loading/loading.screen';
import {LoginScreen} from '../screens/login/login.screen';
import {NavAliases} from '../model/navigation.model';
const {APP_LOADING_SCREEN, MAIN_SCREEN, APP_STACK, AUTH_STACK, LOGIN_SCREEN} = NavAliases;

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      [APP_LOADING_SCREEN]: LoadingScreen,
      [APP_STACK]: createStackNavigator({
        [MAIN_SCREEN]: {
          screen: MainScreen,
        },
      }),
      [AUTH_STACK]: createStackNavigator({
        [LOGIN_SCREEN]: {
          screen: LoginScreen,
        },
      }),
    },
    {
      initialRouteName: APP_LOADING_SCREEN,
    },
  ),
);
