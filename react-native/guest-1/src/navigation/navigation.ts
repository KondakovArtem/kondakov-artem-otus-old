import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {MainScreen, GuestDetailScreen, LoginScreen} from '@app/screens';
import {NavAliases} from '@app/model/navigation.model';
const {MAIN_SCREEN, APP_STACK, AUTH_STACK, LOGIN_SCREEN, GUEST_DETAILS_SCREEN} = NavAliases;

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      [APP_STACK]: createStackNavigator({
        [MAIN_SCREEN]: {
          screen: MainScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        [GUEST_DETAILS_SCREEN]: {
          screen: GuestDetailScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
      [AUTH_STACK]: createStackNavigator({
        [LOGIN_SCREEN]: {
          screen: LoginScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
    },
    {},
  ),
);
