import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  LoginScreen,
  MainScreen,
  SignUpScreen,
  EmailVerificationScreen,
  UserProfileScreen,
  ExploreScreen,
  NewPostScreen,
  FollowsScreen,
} from '@app/screens';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {
  APP_STACK,
  AUTH_STACK,
  LOGIN_SCREEN,
  MAIN_SCREEN,
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION,
  USER_PROFILE_SCREEN,
  EXPLORE_SCREEN,
  TAB_STACK,
  USER_PROFILE_EDIT_SCREEN,
  NEW_POST_SCREEN,
  FOLLOW_SCREEN,
} from '@app/models/navigation.model';
import {statusBackground} from '@app/constants/theme';
import {TabbarIconComponent} from '@app/components/tabbar-icon/tabbar-icon.component';
import {UserProfileEditScreen} from '@app/screens/user-profile-edit/user-profile-edit.screen';

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      [APP_STACK]: createStackNavigator({
        [TAB_STACK]: createMaterialBottomTabNavigator(
          {
            [MAIN_SCREEN]: {
              screen: MainScreen,
              navigationOptions: {
                tabBarIcon: props =>
                  TabbarIconComponent({...props, name: 'home-variant-outline', type: 'material-community'}),
                title: 'Home',
              },
            },
            [EXPLORE_SCREEN]: {
              screen: ExploreScreen,
              navigationOptions: {
                tabBarIcon: props => TabbarIconComponent({...props, name: 'magnify', type: 'material-community'}),
                title: 'Explore',
              },
            },
            [USER_PROFILE_SCREEN]: {
              screen: UserProfileScreen,
              navigationOptions: {
                tabBarIcon: props =>
                  TabbarIconComponent({...props, name: 'account-card-details-outline', type: 'material-community'}),
                title: 'Profile',
              },
            },
          },
          {
            initialRouteName: MAIN_SCREEN,
            activeColor: '#f0edf6',
            inactiveColor: '#f0edf650',
            shifting: true,
            barStyle: {backgroundColor: statusBackground},
            backBehavior: 'initialRoute',
            navigationOptions: {
              headerShown: false,
            },
          },
        ),
        [USER_PROFILE_EDIT_SCREEN]: {
          screen: UserProfileEditScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        [NEW_POST_SCREEN]: {
          screen: NewPostScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        [FOLLOW_SCREEN]: {
          screen: FollowsScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),

      [EMAIL_VERIFICATION]: {
        screen: EmailVerificationScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
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
