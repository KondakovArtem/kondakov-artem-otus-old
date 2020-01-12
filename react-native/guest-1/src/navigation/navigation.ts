import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {MainScreen} from '../screens/main/main.screen';
// import {LoadingScreen} from '../screens/loading/loading.screen';
import {LoginScreen} from '../screens/login/login.screen';
import {GuestDetailScreen} from '../screens/guest-details/guest-details.screen';
import {NavAliases} from '../model/navigation.model';
const {MAIN_SCREEN, APP_STACK, AUTH_STACK, LOGIN_SCREEN, GUEST_DETAILS_SCREEN} = NavAliases;

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      [APP_STACK]: createStackNavigator({
        [MAIN_SCREEN]: {
          screen: MainScreen,
        },
        [GUEST_DETAILS_SCREEN]: {
          screen: GuestDetailScreen,
        },
      }),
      [AUTH_STACK]: createStackNavigator({
        [LOGIN_SCREEN]: {
          screen: LoginScreen,
        },
      }),
    },
    {},
  ),
);
