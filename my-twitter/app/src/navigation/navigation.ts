import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  APP_STACK,
  AUTH_STACK,
  LOGIN_SCREEN,
  MAIN_SCREEN,
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION,
  VERIFICATION_STACK,
} from '@app/models/navigation.model';
import {LoginScreen, MainScreen, SignUpScreen, EmailVerificationScreen} from '@app/screens';

// import {MainScreen, GuestDetailScreen, LoginScreen, UserProfileScreen} from '@app/screens';

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
      }),
      [VERIFICATION_STACK]: createStackNavigator({
        [EMAIL_VERIFICATION]: {
          screen: EmailVerificationScreen,
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
        [SIGN_UP_SCREEN]: {
          screen: SignUpScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
    },
    {},
  ),
);
