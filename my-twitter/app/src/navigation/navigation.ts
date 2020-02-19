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
  LoadingScreen,
  UserInfoScreen,
} from 'screens';
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
  LOADING_SCREEN,
  USER_INFO_SCREEN,
} from 'models/navigation.model';
import {statusBackground} from 'constants/theme';
import {TabbarIconComponent} from 'components/tabbar-icon/tabbar-icon.component';
import {UserProfileEditScreen} from 'screens/user-profile-edit/user-profile-edit.screen';

const noHeader = {
  navigationOptions: {
    headerShown: false,
  },
};

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      [LOADING_SCREEN]: {
        screen: LoadingScreen,
      },
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
            ...noHeader,
          },
        ),
        [USER_PROFILE_EDIT_SCREEN]: {
          screen: UserProfileEditScreen,
          ...noHeader,
        },
        [USER_INFO_SCREEN]: {
          screen: UserInfoScreen,
          ...noHeader,
        },
        [NEW_POST_SCREEN]: {
          screen: NewPostScreen,
          ...noHeader,
        },
        [FOLLOW_SCREEN]: {
          screen: FollowsScreen,
          ...noHeader,
        },
      }),

      [EMAIL_VERIFICATION]: {
        screen: EmailVerificationScreen,
        ...noHeader,
      },
      [AUTH_STACK]: createStackNavigator({
        [LOGIN_SCREEN]: {
          screen: LoginScreen,
          ...noHeader,
        },
        [SIGN_UP_SCREEN]: {
          screen: SignUpScreen,
          ...noHeader,
        },
      }),
    },
    {
      initialRouteName: LOADING_SCREEN,
    },
  ),
);
