import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {AUTH_STACK, LOGIN_SCREEN} from '@app/models/navigation.model';
import {LoginScreen} from '@app/screens';

// import {MainScreen, GuestDetailScreen, LoginScreen, UserProfileScreen} from '@app/screens';

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      //   [APP_STACK]: createStackNavigator({
      //     [MAIN_SCREEN]: {
      //       screen: MainScreen,
      //       navigationOptions: {
      //         headerShown: false,
      //       },
      //     },
      //     [GUEST_DETAILS_SCREEN]: {
      //       screen: GuestDetailScreen,
      //       navigationOptions: {
      //         headerShown: false,
      //       },
      //     },
      //     [USER_PROFILE_SCREEN]: {
      //       screen: UserProfileScreen,
      //       navigationOptions: {
      //         headerShown: false,
      //       },
      //     },
      //   }),
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
